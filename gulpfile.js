//Load Gulp
const { src, dest, watch, series, parallel } = require('gulp');

// CSS Related Plugins
const sass = require('gulp-sass')(require('sass'));

//Utility Plugins
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');

//Browser Related Plugins
const browserSync = require('browser-sync').create();

//Project Related Variables
const stylesSrc = './client/scss/**/*.scss';
const stylesBuild = './client/css/';

function styles() {
  return src(stylesSrc)
    .pipe(sourcemaps.init())

    .pipe(sass().on('error', sass.logError))

    .pipe(sourcemaps.write('.'))
    .pipe(dest(stylesBuild));
}

function cleaner() {
  return src(stylesBuild, { read: false, allowEmpty: true }).pipe(clean({ force: true }));
}

function watcher() {
  browserSync.init({
    server: { baseDir: './client' },
    notify: true,
  });
  watch(stylesSrc, styles).on('change', browserSync.reload);
}

exports.cleaner = cleaner;
exports.styles = styles;
exports.watcher = watcher;

exports.default = series(cleaner, styles, watcher);
