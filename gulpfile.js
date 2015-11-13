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

// Constants
var TEMP_PARTIAL_LOCATION = './.tmp/partials/';
var BUILD_LOCATION = './content';

// Converts files in src/md into html files in .tmp/partials
gulp.task('md2html', function() {
  return gulp.src('./src/md/*.md')
    .pipe(marked({
      breaks: true,
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
        return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-');
      }
    }
  };

  // Render the files in pages
  gulp.src('./src/pages/*.html')
    .pipe(handlebars({ nav: require('./navigation.json'), releases: require('./releases.json') }, options))
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
    './bower_components/bootstrap/dist/js/bootstrap.min.js'
  ])
    .pipe(gulp.dest(path.join(BUILD_LOCATION, 'js')));
});

// Copies images to dist
gulp.task('copy:images', function() {
  return gulp.src(['./src/images/*'])
    .pipe(gulp.dest(path.join(BUILD_LOCATION, 'images')));
});

// Default task is to build the site
gulp.task('default', ['less', 'html', 'copy:js', 'copy:images']);

// Creates releases.json file.
// 
// 1. Requests page that lists release versions (https://dist.apache.org/repos/dist/release/incubator/apex[/malhar])
// 2. Queries Github for release tags to find the date they were published to github
// 3. Writes to releases.json with release information.
// 
gulp.task('fetch-versions', function(taskCb) {

  // The base location for release listings
  var distUrl = 'https://dist.apache.org/repos/dist/';

  // The release "targets", in this case meaning apex-core and apex-malhar
  var targets = [
    // NOTE: Once apex leaves incubation, this object should be changed to exclude "incubator"
    { key: 'core.src',   path: 'release/incubator/apex',        repo: 'incubator-apex-core' },
    { key: 'malhar.src', path: 'release/incubator/apex/malhar', repo: 'incubator-apex-malhar' }
  ];

  // For each target, get the releases
  async.map(targets, function(target, cb) {

    // Request the page that lists the release versions,
    // e.g. https://dist.apache.org/repos/dist/release/incubator/apex
    request(distUrl + target.path, function(err, response) {
    
      // Abort for error
      if (err) {
        return cb(err);
      }

      // Parse out the link names which are the
      // available versions
      jsdom.env(
        response.body,
        function (err, window) {

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
            return {
              // Trim the href attribute of leading "v" and trailing slash
              version: el.href.trim().replace(/^v/, '').replace(/\/$/, ''),
              // Add repo for use in async.each call below
              repo: target.repo
            };
          });

          // Get the date for each release via the github API
          async.each(releases, function(release, eachCb) {

            // Get the tags for the repo
            request({
              url: 'https://api.github.com/repos/apache/' + release.repo + '/tags',
              json: true,
              headers: { 'User-Agent': 'apache' } // Github asks that the user agent is the GH org or username
            }, function(err, response) {

              // Abort if tags not found or something happened with github API
              if (err) {
                return eachCb(err);
              }
              
              // Find the tag object corresponding to this release
              var ghTag = _.find(response.body, function(t) {
                return t.name.replace(/^v/, '') === release.version;
              });

              // Get info about the commit that the tag points to
              request({
                url: ghTag.commit.url, // Github API address
                json: true,
                headers: { 'User-Agent': 'apache' }
              }, function(err, response) {

                // Abort if the commit could not be found
                if (err) {
                  return eachCb(err);
                }

                // Set the date from the this information
                release.date = Date.parse(response.body.commit.author.date);

                // We're all done
                eachCb();

              });
              
            });

          }, function(err) { // callback for async.each(releases, ...)

            // Abort if error occurred somewhere
            if (err) {
              return cb(err);
            }

            // Sort the releases by the date
            releases.sort(function(a, b) {
              return b.date - a.date;
            });

            // Return with a new target object with releases.
            // Note that this is the cb from the async.map call above
            cb(null, _.extend({}, target, { releases: releases }) );

          });

        } // end jsdom.env callback
      ); // end jsdom.env

    }); // end request to the listing of this target


  }, function(err, targetsWithVersions) { // this is the async.map(targets) callback

    // This will be written to releases.json
    var fileContents = {};

    // Use the "key" to set core.src and malhar.src, etc.
    targetsWithVersions.forEach(function(trg) {
      _.set(fileContents, trg.key, trg.releases);
    });

    // Write the file to releases.json
    fs.writeFile('./releases.json', JSON.stringify(fileContents, 0, 2), taskCb);

  });

});

// Watch for changes
gulp.task('watch', function() {
  gulp.watch('./src/less/*.less', ['less']);
  gulp.watch(['./src/pages/*.html', './src/partials/*.handlebars', './src/md/*.md'], ['html']);
});