const gulp = require('gulp'),
sass = require('gulp-sass'),
rename = require('gulp-rename'),
autoprefixer = require('gulp-autoprefixer'),
cssnano = require('gulp-cssnano'),
imagemin = require('gulp-imagemin'),
del = require('del'),
webpack = require('webpack');

function styles() {
    return gulp.src('./src/sass/styles.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/sass'))
}

function scripts (callback){
    webpack(require('./webpack.config.js'), function(err){
        if (err){
            console.log(err.toString());
        }
        callback()
    })
}

function imgs(){
    return gulp.src('./src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'))
}

function other(){
    const files = [
        './src/*',
        '!./src/images',
        '!./src/images/**/*',
        '!./src/js',
        '!./src/js/**/*',
        '!./src/sass',
        '!./src/sass/**/*'
    ];
    return gulp.src(files)
    .pipe(gulp.dest('./dist'))
}

function clean() {
    return del('./dist/**/*')
}

function watch() {
    gulp.watch('./src/sass/**/*.scss', styles)
    gulp.watch('./src/js/**/*.js', scripts);
}

gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts, imgs, other)))

exports.styles = styles;
exports.scripts = scripts;
exports.imgs = imgs;
exports.other = other;
exports.watch = watch;
exports.clean =clean;