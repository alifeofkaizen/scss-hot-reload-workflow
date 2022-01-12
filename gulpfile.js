'use strict';
 
const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const autoprefixer = require('autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const cleancss = require('gulp-clean-css')
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

gulp.task('compile-sass', function () {
  return gulp.src(['./**/*.scss', '!**/node_modules/**', '!**/wwwroot/_lib/**', '!**/bin/**', '!**/obj/**'])
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(gulp.dest('./'));
});

gulp.task('minify-css', function () {
  return gulp.src(['wwwroot/css/**/*.css', '!wwwroot/css/**/*.min.css'])
    .pipe(cleancss())
    .pipe(rename( { extname: '.min.css' }))
    .pipe(gulp.dest('./wwwroot/css'));
});

gulp.task('minify-js', function () {
  return gulp.src(['./wwwroot/js/**/*.js', '!./wwwroot/js/**/*.min.js'])
    .pipe(uglify())
    .pipe(rename( { extname: '.min.js' }))
    .pipe(gulp.dest('./wwwroot/js/'));
});

gulp.task('bundle-minify-js', function () {
  return gulp.src([
    'wwwroot/_lib/jquery/jquery.js',
    'wwwroot/js/**/*.js',
    '!wwwroot/js/**/*.min.js',
    'wwwroot/_lib/mark.js/mark.js',
    'wwwroot/_lib/bootstrap/js/bootstrap.bundle.js'
  ])
    .pipe(uglify())
    .pipe(rename('site.bundle.min.js'))
    .pipe(gulp.dest('wwwroot/'))
});

gulp.task('bundle-minify-css', function () {
    return gulp.src(['wwwroot/css/**/*.css', '!wwwroot/css/**/*.min.css'])
      .pipe(cleancss())
      .pipe(concat('site.bundle.min.css'))
      .pipe(gulp.dest('./wwwroot/'));
  });

gulp.task('compile-bundle-minify-css', 
            gulp.series('compile-sass', 'bundle-minify-css')
);

gulp.task('compile-bundle-minify-js', 
            gulp.series('minify-js', 'bundle-minify-js')
);

gulp.task('compile-bundle-minify', 
            gulp.parallel('compile-bundle-minify-css', 'compile-bundle-minify-js')
);

gulp.task('compile-sass:watch', function () {
  gulp.watch('./**/*.scss', gulp.series('compile-sass'));
});