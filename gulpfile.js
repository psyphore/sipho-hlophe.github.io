"use strict";

// Load plugins
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const gulp = require("gulp");
const header = require("gulp-header");
const merge = require("merge-stream");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");

// Load package.json for banner
const pkg = require('./package.json');
const dir = './dist/'

// Set the banner content
const banner = [''].join('');

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: dir
    },
    port: 3000
  });
  done();
}

// BrowserSync reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean vendor
function clean() {
  return del(["./vendor/", dir]);
}

// CSS task
function css() {
  const distPath = dir + 'css/';
  return gulp
    .src("./scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass({
      outputStyle: "expanded",
      includePaths: "./node_modules",
    }))
    .on("error", sass.logError)
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest(distPath))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest(distPath))
    .pipe(browsersync.stream());
}

// JS task
function js() {
  const distPath = dir + 'js/';
  return gulp
    .src([
      './js/*.js',
      '!./js/*.min.js'
    ])
    .pipe(uglify())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(distPath))
    .pipe(browsersync.stream());
}

// HTML task
function html() {
  const _html = ["./index.html", "!./node_modules/**/*.html"]
  return gulp
    .src(_html)
    .pipe(gulp.dest(dir))
    .pipe(browsersync.stream());
}

// CONFIG task
function config() {
  const conf = './config/content.json';
  const distPath = dir + 'config/';
  return gulp
    .src(conf)
    .pipe(gulp.dest(distPath))
    .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
  gulp.watch("./scss/**/*", css);
  gulp.watch(["./js/**/*.js", "!./js/**/*.min.js"], js);
  gulp.watch(["./**/*.html", "./config/**/*.json"], gulp.parallel(html, config))
  gulp.watch(["./dist/**/*"], browserSyncReload);
}

// Define complex tasks
const vendor = gulp.series(clean);
const build = gulp.series(vendor, gulp.parallel(css, js, html, config));
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Production Build
function production(done) {
  build(function(err){
    done();
  });
}

const prod = gulp.series(production);

// Export tasks
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.prod = prod;
exports.default = build;
