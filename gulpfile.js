'use strict';

// Node Modules
var gulp = require('gulp');
var marked = require('gulp-marked');
var handlebars = require('gulp-compile-handlebars');
var less = require('gulp-less');
var path = require('path');
var request = require('request');
var jsdom = require('jsdom');
var fs = require('fs');
var async = require('async');
var _ = require('lodash');
var exec = require('child_process').exec;
var semver = require('semver');
var naturalSort = require('javascript-natural-sort');
var dateFormat = require('dateformat');
var Q = require('q');

// Constants
var TEMP_PARTIAL_LOCATION = './.tmp/partials/';
var BUILD_LOCATION = './content';

// Converts files in src/md into html files in .tmp/partials
gulp.task('md2html', function() {
  return gulp.src('./src/md/*.md')
    .pipe(marked({
      breaks: false,
      highlight: function (code, lang) {
        // Only highlight if language was specified and is not bash
        // (bash highlighting is pretty bad right now in highlightjs)
        var ignore = ['bash', 'sh', 'zsh'];
        if (lang && ignore.indexOf(lang) === -1) {
          return require('highlight.js').highlightAuto(code, [lang]).value;
        }
        else {
          return code;
        }
      }
    }))
    .pipe(gulp.dest(TEMP_PARTIAL_LOCATION))
    .on('error', function(err) {
      console.warn(err);
    });
});

// HACK: gulp-compile-handlebars does not allow you to provide compile options.
// Once https://github.com/kaanon/gulp-compile-handlebars/pull/11 is merged
// and published to npm, this won't be necessary.
var originalCompile = handlebars.Handlebars.compile;
handlebars.Handlebars.compile = function (fileContents, options) {
  // The preventIndent option is necessary to prevent format issues
  // that occur with <pre> blocks
  var newOptions = _.extend({}, options, { preventIndent: true });
  return originalCompile(fileContents, newOptions);
};


// Builds html files from src/pages
gulp.task('html', ['md2html'], function() {

  // Get partials from src and temp partials locations.
  // Temp partials are rendered md files
  var options = {
    batch: ['./src/partials', TEMP_PARTIAL_LOCATION],
    helpers: {
      releaseDate: function(timestamp) {
        var d = new Date(timestamp);
        return dateFormat(d, "yyyy-mm-dd");
      }
    }
  };

  // Render the files in pages
  gulp.src('./src/pages/*.html')
    .pipe(handlebars({
        nav: require('./navigation.json'),
        releases: require('./releases.json'),
        roadmap: require('./roadmap.json')
      }, options))
    .pipe(gulp.dest(BUILD_LOCATION))
    .on('error', function(err) {
      console.warn(err);
    });

});

// Creates the built css files
gulp.task('less', function () {
  return gulp.src('./src/less/main.less')
    .pipe(less({
      paths: [
        path.join(__dirname, 'src', 'less'),
        path.join(__dirname, 'bower_components', 'bootstrap', 'less')
      ]
    }))
    .pipe(gulp.dest(path.join(BUILD_LOCATION, 'css')));
});

// Copies necessary dependencies to dist
gulp.task('copy:js', function() {
  return gulp.src([
    './bower_components/bootstrap/dist/js/bootstrap.min.js',
    './src/js/*.js'
  ])
    .pipe(gulp.dest(path.join(BUILD_LOCATION, 'js')));
});

// Copies images to dist
gulp.task('copy:images', function() {
  return gulp.src(['./src/images/*'])
    .pipe(gulp.dest(path.join(BUILD_LOCATION, 'images')));
});

// Copies fonts to dist
gulp.task('copy:fonts', function() {
  return gulp.src([
    './bower_components/bootstrap/dist/fonts/*'
  ])
    .pipe(gulp.dest(path.join(BUILD_LOCATION, 'fonts')));
});


// Default task is to build the site
gulp.task('default', ['less', 'html', 'copy:js', 'copy:images', 'copy:fonts']);


// Fetch all JIRAs assodicated with the projects to create a roadmap file
gulp.task('fetch-roadmap', function(taskCb) {

  var projects = [
    { key: 'core', name: 'APEXCORE', apiUrl: 'https://issues.apache.org/jira/rest/api/2/', url: 'https://issues.apache.org/jira/' },
    { key: 'malhar', name: 'APEXMALHAR', apiUrl: 'https://issues.apache.org/jira/rest/api/2/', url: 'https://issues.apache.org/jira/' }
  ];

  // JQL terms are separated with AND/OR and parameters outside JQL are separated with &
  //
  // Query to look up all APEXCORE and APEXMALHAR issues with label of roadmap
  //    https://issues.apache.org/jira/rest/api/2/search?jql=project+in+(APEXCORE,APEXMALHAR)+AND+labels+in+(roadmap)+and+fixVersion+in+(EMPTY,unreleasedVersions())+ORDER+BY+key
  //
  // Query which returns only specified fields
  //    https://issues.apache.org/jira/rest/api/2/search?jql=project=APEXCORE+AND+labels+in+(roadmap)&startAt=0&maxResults=100&fields=summary,priority,status
  //
  // Query to get list of all APEXCORE versions
  //    https://issues.apache.org/jira/rest/api/2/project/APEXCORE/versions
  //
  // Browse JIRA, version, roadmap
  //    https://issues.apache.org/jira/browse/APEXCORE-292
  //    https://issues.apache.org/jira/browse/APEXCORE/fixforversion/12333948
  //    https://issues.apache.org/jira/issues/?jql=project+in+(APEXCORE,APEXMALHAR)+AND+labels+in+(roadmap)+and+fixVersion+in+(EMPTY,unreleasedVersions())+ORDER+BY+key


  // For each project, get the jiras
  async.map(projects, function(project, cb) {

    console.log('Loading', project.name, 'JIRAs from', project.apiUrl);

    // Request the page that lists the release versions,
    // e.g. https://dist.apache.org/repos/dist/release/incubator/apex
    var requestUrl = project.apiUrl + 'project/' + project.name + '/versions';
    request({
        url: requestUrl,
        json: true
      },
      function(err, httpResponse, versions) {

        // Abort on error
        if (err) {
          console.log('Error when trying to request URL: ', requestUrl);
          console.log(err);
          return cb(err);
        }

        var unreleasedVersions = versions.filter(function(n) {
          return !n.released;
        }).sort(function(a,b) {
          return semver.compare(a.name, b.name);
        });

        var apiRequest = {
          jql: 'project = ' + project.name + ' AND labels in (roadmap) AND resolution = Unresolved AND fixVersion in (EMPTY, unreleasedVersions())',
          startAt: 0,
          maxResults: 1000,
          fields: ['summary','priority','status','fixVersions','description']
        };

        request.post({
          url: project.apiUrl + 'search',
          json: apiRequest
        },
        function(err, httpResponse, jiras) {

          // Abort on error
          if (err) {
            return cb(err);
          }

          var pageCount = (jiras.total && jiras.maxResults) ? Math.ceil(jiras.total / jiras.maxResults) : 1;
          var pageSize = jiras.maxResults;

          console.log(project.name, 'matching jiras:', jiras.total, 'pageSize:', pageSize, 'pages:', pageCount);

          // Iterate over multiple pages if more than one page is available
          if (pageCount > 1) {

            var apiRequests = [];
            for (var i = 1; i < pageCount; i++) {
              apiRequests[i-1] = _.extend({},
                apiRequest,
                {
                  startAt: i * pageSize,
                  maxResults: pageSize
                }
              );
            }

            // Execute async page loads for jiras spanning multiple pages
            async.concat(apiRequests, function(apiPageRequest, pageCb){

              request.post({
                url: project.apiUrl + 'search',
                json: apiPageRequest
              },
              function(err, httpResponse, pageJiras) {

                // Abort on error
                if (err) {
                  return pageCb(err);
                }
                pageCb(null, pageJiras.issues);
              });

            }, function(err, remainingJiras){

              // Abort if error occurred somewhere
              if (err) {
                return cb(err);
              }

              cb(null, _.extend({}, project, {
                jiras: jiras.issues.concat(remainingJiras).sort(function(a,b) {return naturalSort(a.key, b.key); }),
                versions: unreleasedVersions
              }));

            });

          } else {
            // Return with a new project object with jiras.  cb is from async.map call above
            cb(null, _.extend({}, project, {
              jiras: jiras.issues.sort(function(a,b) {return naturalSort(a.key, b.key); }),
              versions: unreleasedVersions
            }));
          }

        });

    });



  }, function(err, projectResults) { // this is the async.map(projects) callback

    if (err) {
      console.log('Unable to create roadmap file due to errors');
      return;
    }

    var fileContents = {};

    // Use the project key and provide associated arrays of matching jiras and versions
    projectResults.forEach(function(project) {
      _.set(fileContents, project.key,
        {
          name: project.name,
          url: project.url,
          jiras: project.jiras,
          versions: project.versions
        });
    });

    // Write the file to roadmap.json
    fs.writeFile('./roadmap.json', JSON.stringify(fileContents, 0, 2), taskCb);

  });


});

// Creates releases.json file.
//
// 1. Requests page that lists release versions (https://dist.apache.org/repos/dist/release/apex)
// 2. Queries Github for release tags to find the date they were published to github
// 3. Writes to releases.json with release information.
//
gulp.task('fetch-releases', function(taskCb) {

  // The release "targets", in this case meaning apex-core and apex-malhar
  var targets = [
    { key: 'core.src', repo: 'apex-core' },
    { key: 'malhar.src', repo: 'apex-malhar' }
  ];

  // Get contents for the page that lists the release versions
  function getReleasePageLinks() {
    var dfd = Q.defer();

    // The base location for release listings
    var distUrl = 'https://dist.apache.org/repos/dist/release/apex/';

    request(distUrl, function(err, response) {
      // Abort if tags not found or something bad happened with the git ls-remote command
      if (err) {
        dfd.reject(err);
      }
      dfd.resolve(response.body);
    });
    return dfd.promise;
  }

  // Get tags and hashes for a repo's releases
  function getRepoTags(repoName) {
    var dfd = Q.defer();
    // Get the tags for the repo
    var gitCommand = 'git ls-remote --tags "https://gitbox.apache.org/repos/asf/' + repoName + '.git"';
    exec(gitCommand, function(err, stdout, stderr) {
      // Abort if tags not found or something bad happened with the git ls-remote command
      if (err || stderr) {
        def.reject(err || stderr);
      }
      // Lines from ls-remote command look like [COMMIT_HASH]\trefs/tags/[TAG_NAME]
      var lines = stdout.split('\n');
      for (var i = 0; i < lines.length; i++) {
        if (lines[i] && lines[i].trim().length > 0) {
          // console.log("Processing line[", i, "] : ", lines[i]);
          lines[i] = lines[i].split('\t');
          if (lines[i][1]) {
            lines[i][1] = lines[i][1].replace('refs/tags/v', '');
          }
        }
      }
      dfd.resolve(lines);
    });
    return dfd.promise;
  }


  // Get tags and hashes for all repos (apex-core and apex-malhar)
  function getAllTargetReposTagsHashes() {

    return Q.all(targets.map(function(target) {
      var dfd = Q.defer();
      getRepoTags(target.repo).then(
        function(response) {
          target.releases = response;
          dfd.resolve();
        }
      );
      return dfd.promise;
    }));
  }


  // Get data for a single tag
  function getTagDate(repoName, tagHash) {
    var dfd = Q.defer();
    // Get info about the tag via its hash (found with the ls-remote command)
    request({
        url: 'https://api.github.com/repos/apache/' + repoName + '/git/tags/' + tagHash, // Github API address
        json: true,
        headers: { 'User-Agent': 'apache' }
      },
      function(err, response) {
        // Abort if the commit could not be found
        if (err) {
          dfd.reject(err);
        }
        // Set the date from this information and resolve
        dfd.resolve(Date.parse(response.body.tagger.date));
      }
    );
    return dfd.promise;
  }


  // Start by getting links from the releases page
  getReleasePageLinks().then(
    function(response, err) {
      jsdom.env(
        response,
        function(err, window) {

          // Query the DOM for all links in the list
          var releaseLinks = window.document.querySelectorAll('ul li a');

          // Convert this NodeList to an array
          releaseLinks = Array.prototype.slice.call(releaseLinks)

          // Filter out non-version-looking links
          .filter(function(el) {
            var text = el.innerHTML.trim();
            return ['..', 'KEYS', 'malhar', 'malhar/'].indexOf(text) === -1;
          });

          // Create array of releases from this filtered NodeList
          var releases = releaseLinks.map(function(el) {
            var releaseStr = el.innerHTML.trim();
            var repoName;

            // Set correct repo name
            targets.forEach(function(tar) {
              if (releaseStr.indexOf(tar.repo) !== -1) {
                repoName = tar.repo;
              }
            });

            // Extract release version and docs version
            var releaseVersionText = el.innerHTML.trim();

            // full release version
            if (/([0-9]+\.[0-9]+\.[0-9]+((.*)([^\/]))*)/.test(releaseVersionText) === true) {
              var releaseVersion = /([0-9]+\.[0-9]+\.[0-9]+((.*)([^\/]))*)/.exec(releaseVersionText)[1];
            }

            // strictly numbers for semantic version checking
            if (/([0-9]+\.[0-9]+\.[0-9]+)/.test(releaseVersionText) === true) {
              var releaseSemVer = /([0-9]+\.[0-9]+\.[0-9]+)/.exec(releaseVersionText)[1];
            }
            var docsVersion = semver.major(releaseSemVer) + '.' + semver.minor(releaseSemVer);

            return {
              version: releaseVersion,
              docs: docsVersion,
              repo: repoName
            };
          });

          // Get tags and hashes for all target repos
          getAllTargetReposTagsHashes().then(function(resp, err) {

            if (err) {
              console.log('ERROR', err);
            }

            // Go through all releases
            Q.all(releases.map(function(release) {
              var def = Q.defer();

              // go through target releases
              // first, find the correct target
              for (var i=0; i<targets.length; i++) {
                if(targets[i].repo === release.repo) {
                  for(var j=0; j<targets[i].releases.length; j++) {

                    // if target version matches release
                    if (targets[i].releases[j][1] === release.version) {

                      // get tag date from remote repo
                      // arguments: repoName, tagHash
                      getTagDate(release.repo, targets[i].releases[j][0]).then(function(response) {
                        release.date=response;
                        def.resolve();
                      });
                      break;
                    }
                  }
                  break;
                }
              }
              return def.promise;
            }))

            // After all tag dates are loaded
            .then(function() {
              // sort releases by date
              releases.sort(function(a, b) {
                return b.date - a.date;
              });

              var fileContents = {};

              // Use the "key" to set core.src and malhar.src, etc.
              targets.forEach(function(trg) {
                // filter releases by repo
                _.set(fileContents, trg.key, releases.filter(function(el) {
                  return el.repo === trg.repo;
                }));
              });

              // Write the file to releases.json
              fs.writeFile('./releases.json', JSON.stringify(fileContents, 0, 2));

            });
          });
        }
      );
    }
  );
});

// Watch for changes
gulp.task('watch', function() {
  gulp.watch('./src/less/*.less', ['less']);
  gulp.watch(['./src/pages/*.html', './src/partials/*.handlebars', './src/md/*.md'], ['html']);
});
