var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer')

gulp.task('build-js', function () {
    browserify({
        entries: './js/app.js',
        extensions: ['.js'],
        debug: true
    })
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(rename('essai.js'))
        .pipe(gulp.dest('./load'));

});

gulp.task('watch-js', function() {
    gulp.watch(['./js/**/*.js', './js/*.js'], ['build-js']);
});

gulp.task('build', ['build-js']);

gulp.task('default', ['watch-js']);