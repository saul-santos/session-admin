const gulp = require('gulp');
const useref = require('gulp-useref');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');

gulp.task('default', function() {
    
});

gulp.task('build-dist', function () {
    return gulp.src(['public/**/*.html', '!public/bower_components/**/*.html'])
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-images', function() {
    return gulp.src('public/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});
