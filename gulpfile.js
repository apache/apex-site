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
    .pipe(marked({
      breaks: true,
      highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value;
      }
    }))
    .pipe(gulp.dest(TEMP_PARTIAL_LOCATION))
    .on('error', function(err) {
      console.warn(err);
    });
});

// Builds html files from src/pages
gulp.task('html', ['md2html'], function() {

  // Get partials from src and temp partials locations.
  // Temp partials are rendered md files
  var options = {
    batch: ['./src/partials', TEMP_PARTIAL_LOCATION]
  };

  // Render the files in pages
  gulp.src('./src/pages/*.html')
    .pipe(handlebars({ nav: require('./navigation') }, options))
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

// Watch for changes
gulp.task('watch', function() {
  gulp.watch('./src/less/*.less', ['less']);
  gulp.watch(['./src/pages/*.html', './src/partials/*.handlebars', './src/md/*.md'], ['html']);
});