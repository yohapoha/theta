(function() {
  var css_autoprefixer, css_cssnano, css_uncss, file_clean, file_concat, file_if, file_inject, file_useref, gulp, html_htmlmin, html_wiredep, javascript_coffee, javascript_uglify, server_connect;

  gulp = require('gulp');

  server_connect = require('gulp-connect');

  file_inject = require('gulp-inject');

  file_concat = require('gulp-concat');

  file_useref = require('gulp-useref');

  file_if = require('gulp-if');

  file_clean = require('gulp-clean');

  html_wiredep = require('wiredep').stream;

  html_htmlmin = require('gulp-htmlmin');

  css_autoprefixer = require('gulp-autoprefixer');

  css_cssnano = require('gulp-cssnano');

  css_uncss = require('gulp-uncss');

  javascript_coffee = require('gulp-coffee');

  javascript_uglify = require('gulp-uglify');

  gulp.task('default', ['watch', 'server', 'html', 'css', 'javascript', 'bower', 'html_inject']);

  gulp.task('watch', function() {
    gulp.watch('app/*.html', ['html']);
    gulp.watch('app/css/*.css', ['css', 'html_inject']);
    gulp.watch('app/js/*.js', ['javascript', 'html_inject']);
    gulp.watch('bower.json', ['bower']);
  });

  gulp.task('server', function() {
    server_connect.server({
      root: ['app'],
      livereload: true
    });
  });

  gulp.task('html', function() {
    return gulp.src('app/**/*.html').pipe(server_connect.reload());
  });

  gulp.task('html_inject', function() {
    return gulp.src('app/index.html').pipe(file_inject(gulp.src(['js/*.js', 'css/*.css'], {
      cwd: 'app/',
      read: false,
      addRootSlash: false
    }))).pipe(gulp.dest('app'));
  });

  gulp.task('css', function() {
    return gulp.src(['app/css/*.css']).pipe(server_connect.reload());
  });

  gulp.task('javascript', function() {
    return gulp.src(['app/**/*.coffee']).pipe(server_connect.reload());
  });

  gulp.task('bower', ['html', 'html_inject'], function() {
    return gulp.src('app/index.html').pipe(html_wiredep({
      "directory": "app/bower_components"
    })).pipe(gulp.dest('app'));
  });

  gulp.task('build', ['dist_clean'], function() {
    return gulp.src('app/*.html').pipe(file_useref()).pipe(file_if('*.html', html_htmlmin({
      collapseWhitespace: true
    }))).pipe(file_if('*.js', javascript_uglify())).pipe(file_if('*.css', css_autoprefixer({
      browsers: ['last 2 versions']
    }))).pipe(file_if('*.css', css_uncss({
      html: ['app/index.html']
    }))).pipe(file_if('*.css', css_cssnano())).pipe(gulp.dest('dist'));
  });

  gulp.task('dist_clean', function() {
    return gulp.src('dist', {
      read: false
    }).pipe(file_clean());
  });

}).call(this);
