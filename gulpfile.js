var gulp,
css_autoprefixer,
css_cssnano,
css_uncss,
css_stylus,
file_clean,
file_concat,
file_if,
file_inject,
file_useref,
html_htmlmin,
html_wiredep,
javascript_typescrypt,
javascript_uglify,
server_connect;

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
css_stylus = require('gulp-stylus');
javascript_typescrypt = require('gulp-typescript-compiler');
javascript_uglify = require('gulp-uglify');

gulp.task('default', ['watch', 'server', 'html', 'css2styl', 'ts2js', 'bower']);

gulp.task('watch', function() {
    gulp.watch('app/*.html', ['html']);
    gulp.watch('app/modules/**/*.styl', ['css2styl']);
    gulp.watch('app/modules/**/*.ts', ['ts2js']);
    gulp.watch('bower.json', ['bower']);
});

gulp.task('server', function() {
    server_connect.server({
      root: ['app'],
      livereload: true
    });
});
gulp.task('html', function() {
    gulp.src('app/**/*.html')
        .pipe(server_connect.reload());
});

gulp.task('css2styl', function() {
    gulp.src(['app/modules/**/*.styl'])
        .pipe(css_stylus())
        .pipe(gulp.dest('app/css/'))
        .pipe(server_connect.reload());
        
});
gulp.task('ts2js',function() {
    gulp.src('app/modules/**/*.ts')
        .pipe(javascript_typescrypt({
            module: '',
            target: 'ES5',
            sourcemap: true,
            logErrors: true
        }))
        .pipe(gulp.dest('app/js/'))
        .pipe(server_connect.reload());
});
gulp.task('inject', function() {
    gulp.src('app/index.html')
        .pipe(file_inject(gulp.src(['css/**/*.css', 'js/**/*.js'], {
            cwd: 'app/',
            read: false,
            addRootSlash: false
        })))
        .pipe(gulp.dest('app'));
});

gulp.task('bower', function() {
    gulp.src('app/index.html')
        .pipe(html_wiredep({
          "directory": "app/bower_components"
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('build', ['dist_clean'], function() {
    gulp.src('app/*.html')
        .pipe(file_useref())
        .pipe(file_if('*.html', html_htmlmin({
            collapseWhitespace: true
        })))
        .pipe(file_if('*.js', javascript_uglify())).pipe(file_if('*.css', css_autoprefixer({
            browsers: ['last 2 versions']
        })))
        .pipe(file_if('*.css', css_uncss({
            html: ['app/index.html']
        })))
        .pipe(file_if('*.css', css_cssnano())).pipe(gulp.dest('dist'));
});

gulp.task('dist_clean', function() {
    gulp.src('dist', {read: false})
        .pipe(file_clean());
});
