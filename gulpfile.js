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
const stylesSrc = './src/scss/**/*.scss';
const stylesBuild = './dist/css';
const htmlSrc = './src/index.html';
const htmlBuild = './dist'


function styles() {
  return (
    src(stylesSrc)
      // .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      // .pipe(sourcemaps.write('.'))
      .pipe(dest(stylesBuild))
  );
}

function static() {
  return (
    src(htmlSrc)
    .pipe(dest(htmlBuild))
  )
}



function cleaner() {
  return (
    src(stylesBuild, { read: false, allowEmpty: true })
    .pipe(clean({ force: true }))
  )
}

function bsServer(cb) {
  browserSync.init({
    server: { baseDir: './client', directory: true },
    port: 3030,
    notify: true,
  });
  cb();
}

function watcher() {
  // watch('*.html', browserSync.reload);
  watch(stylesSrc, styles).on('change', styles);
}

exports.cleaner = cleaner;
exports.styles = styles;
exports.static = static;
exports.bsServer = bsServer;
exports.watcher = watcher;

exports.build = series(cleaner, styles, static);

exports.default = series(cleaner, styles, bsServer, watcher);
