// =========================== Definition ==============================
const Gulp = require('gulp');
const { src, dest, series, watch } = require('gulp');


// =========================== HTML Minify =============================
const htmlMin = require('gulp-htmlmin');
function htmlMinify()
{
    return src('project/*.html')
    .pipe(htmlMin({collapseWhitespacs: true, removeComments:true}))
    .pipe(Gulp.dest('dist'))
}
exports.html = htmlMinify;


// ============================ JS Minify ==============================
const concat = require('gulp-concat');
const terser = require('gulp-terser');

function jsMinify()
{
    return src('project/js/**/*.js',{sourcemaps:true})
    .pipe(concat('all.min.js'))
    .pipe(terser())
    .pipe(dest('dist/js', {sourcemaps:'.'}))
    
}
exports.js = jsMinify;


// ============================ CSS Minify ==============================
const cssMin = require('gulp-clean-css');

function cssMinify()
{
    return src('project/css/**/*.css',{sourcemaps:true})
    .pipe(concat('style.min.js'))
    .pipe(cssMin())
    .pipe(dest('dist/css'))
    
}
exports.css = cssMinify;


// ============================ SASS Minify ==============================
const sassMin = require('gulp-sass')(require('sass'));

function sassMinify()
{
    return src(['project/css/**/*.css', 'project/sass/**/*.scss'],{sourcemaps:true})
    .pipe(sassMin())
    .pipe(concat('style.sass.min.js'))
    .pipe(cssMin())
    .pipe(dest('dist/css', {sourcemaps:'.'}))
}
// exports.css = sassMinify;


// ============================ image Minify ==============================
const imgMin = require('gulp-imagemin');

function imgMinify()
{
    return Gulp.src('project/pics/*')
    .pipe(imgMin())
    .pipe(Gulp.dest('dist/images'))
}
exports.img = imgMinify;


// =============================================================================
var browserSync = require('browser-sync');
function serve (cb){
  browserSync({
    server: {
      baseDir: 'dist/'
    }
  });
  cb()
}
function reloadTask(done) {
  browserSync.reload()
  done()
}
function watchTask() {
    watch('project/*.html',series(htmlMinify, reloadTask))
    watch('project/js/**/*.js',series(jsMinify, reloadTask))
    watch(["project/css/**/*.css","project/sass/**/*.scss"], series(sassMinify,reloadTask));
}

exports.default = series(series(htmlMinify, cssMinify, jsMinify, sassMinify, imgMinify), serve,watchTask)






    // "test": "echo \"Error: no test specified\" && exit 1",