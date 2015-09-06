'use strict';

// Node Modules
var gulp = require('gulp');
var marked = require('gulp-marked');
var handlebars = require('gulp-compile-handlebars');
var less = require('gulp-less');
var path = require('path');

// Constants
var TEMP_PARTIAL_LOCATION = './.tmp/partials/';
var BUILD_LOCATION = './content';

// Converts files in src/md into html files in .tmp/partials
gulp.task('md2html', function() {
  return gulp.src('./src/md/*.md')
    .pipe(marked())
    .pipe(gulp.dest(TEMP_PARTIAL_LOCATION));
});

// Builds html files from src/pages
gulp.task('html', ['md2html'], function() {

  // Get partials from src and temp partials locations.
  // Temp partials are rendered md files
  var options = {
    batch: ['./src/partials', TEMP_PARTIAL_LOCATION]
  };


  // Passed into every template for interpolation
  var templateData = {

    // Nav elements
    nav: [
      { id: 'index', label: 'Home', href: '/' },
      { id: 'community', label: 'Community', href: '/community.html' },
      { id: 'docs', label: 'Docs', href: '/docs.html' },
      { id: 'github', label: 'Github', items: [
        { label: 'Apex Core', href: 'https://github.com/apache/incubator-apex-core' },
        { label: 'Apex Malhar', href: 'https://github.com/apache/incubator-apex-malhar' }
      ] },
      { id: 'apache', label: 'Apache', items: [
        { label: 'Status Page', href: 'http://incubator.apache.org/projects/apex.html' },
        { label: 'Apache Foundation', href: 'http://www.apache.org/foundation/how-it-works.html' },
        { label: 'Apache License', href: 'http://www.apache.org/licenses/' },
        { label: 'Sponsorship', href: 'http://www.apache.org/foundation/sponsorship.html' },
        { label: 'Thanks', href: 'http://www.apache.org/foundation/thanks.html' }
      ]}
    ]

  };

  // Render the files in pages
  gulp.src('./src/pages/*.html')
    .pipe(handlebars(templateData, options))
    .pipe(gulp.dest(BUILD_LOCATION));

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

// Default task is to build the site
gulp.task('default', ['less', 'html', 'copy:js']);

// Watch for changes
gulp.task('watch', function() {
  gulp.watch('./src/less/*.less', ['less']);
  gulp.watch(['./src/pages/*.html', './src/partials/*.handlebars', './src/md/*.md'], ['html']);
});