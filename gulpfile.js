'use strict';
 
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');
const {src, task} = require('gulp');
const eslint = require('gulp-eslint');
 
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./css/*.scss', gulp.series(['sass']));
});

gulp.task('doc', function (cb) {
  const config = require('./jsdoc.json');
  gulp.src(['./js/*.js'], {read: false})
      .pipe(jsdoc(config, cb));
});

gulp.task('eslint', () => {
return src(['./js/*.js'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});

gulp.task('serve', gulp.series(['sass'], function() {

  browserSync.init({
      server: "./"
  });

  gulp.watch("./css/*.scss", gulp.series(['sass']));
  gulp.watch("./index.html").on('change', browserSync.reload);
  //gulp.watch("./js/*.js").on('change', gulp.series(['eslint']));
}));

gulp.task('default', gulp.series(['serve']));

