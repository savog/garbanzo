var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    del = require('del'),
    runSequence = require('run-sequence'),
    htmlreplace = require('gulp-html-replace'),
    rename = require('gulp-rename'),
    jspm = require('gulp-jspm'),
    cachebust = new $.cachebust;

gulp.task('dev-server', function() {
  connect.server({
    livereload: true,
    port: 8080,
    root: 'app',
  });
});

gulp.task('sass', function() {
  return gulp.src('./app/assets/sass/**/*.scss')
    .pipe(connect.reload())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/assets/css/'));
});

// HTML task
gulp.task('html', function () {
  return gulp.src('./app/**/*.html')
    .pipe(connect.reload());
});

//Js task
gulp.task('js', function() {
  return gulp.src('./app/**/*.js')
    .pipe(connect.reload());
});

//Watch task
gulp.task('watch',function() {
  gulp.watch('./app/assets/sass/**/*.scss',['sass']);
  gulp.watch(['./app/**/*.html'], ['html']);
  gulp.watch(['./app/**/*.js'], ['js']);
});

gulp.task('default', ['sass', 'dev-server', 'watch']);


// Distribution tasks - START
gulp.task('distribution-build', function () {
  runSequence('clean-build',
              'sass',
              'build-app',
              ['copy-assets', 'copy-lib']);
});

gulp.task('clean-build', function() {
  return del.sync(['./dist'], {force: true});
});

// Build and copy index.html to ./dist
// Add versioning for single entry point file (app.min.js)
gulp.task('build-app', ['jspm-build'], function() {
  return gulp.src('./app/index.html')
    .pipe(htmlreplace({
        'js': 'app.min.js'
    }))
    .pipe(cachebust.references())
    .pipe($.htmlmin({
      collapseWhitespace: true,
      conservativeCollapse: true,
      minifyJS: true,
      minifyCSS: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeComments: true
    }))
    .pipe(gulp.dest('./dist'));
});

// JSPM Bundle use versioning resources
// (build all app in one file) and copy to ./dist folder
gulp.task('jspm-build', function() {
  return gulp.src('./app/app.js')
    .pipe(jspm({
      selfExecutingBundle: true,
      minify: true
    }))
    .pipe(rename('app.min.js'))
    .pipe(cachebust.resources())
    .pipe(gulp.dest('./dist'));
});

// Copy all assets resources (images, fonts, etc.) from ./app to ./dist
// Except already built css and js files and other unnecessary files for production
gulp.task('copy-assets', function () {
  return gulp.src([
    './app/assets/**/*',
    '!./app/assets/**/*(*.sass|*.scss|*.css|*.js|*.map|*.gzip|*.json|*.md|LICENSE)'])
    .pipe(gulp.dest('./dist/assets'));
});

// Copy all vendor resources - lib (images, fonts, etc.) from ./app/lib to ./dist/lib
// Except already built css and js files and other unnecessary files for production
gulp.task('copy-lib', function () {
  return gulp.src([
    './app/lib/**/*',
    '!./app/lib/**/*(*.sass|*.scss|*.css|*.js|*.map|*.gzip|*.json|*.md|LICENSE)'
    ])
    .pipe(gulp.dest('./dist/lib'));
});

gulp.task('prod-server', function() {
  connect.server({
    port: 8282,
    root: 'dist',
  });
});
// Build distribution package from ./app to ./dist - END
