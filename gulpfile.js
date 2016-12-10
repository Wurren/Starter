var  gulp           = require('gulp'),
     sass           = require('gulp-sass'),
     cssmin         = require('gulp-clean-css'),
     notify         = require('gulp-notify'),
     path           = require('path'),
     uglify         = require('gulp-uglify'),
     concat         = require('gulp-concat'),
     rename         = require('gulp-rename'),
     plumber        = require('gulp-plumber'),
     webserver      = require('gulp-webserver');


/*
|--------------------------------------------------------------------------
| Error Catching
|--------------------------------------------------------------------------
*/

var onError = function (err) {  
     console.log(err);
     this.emit('end');
};



/*
|--------------------------------------------------------------------------
| Compile Less
|--------------------------------------------------------------------------
*/

gulp.task('scss', function() {
     return gulp.src('scss/style.scss')
          .pipe(plumber({
               errorHandler: onError
          }))
          .pipe(sass())
          .pipe(cssmin())
          .pipe(gulp.dest('css'))
          .pipe(notify({ message: 'SCSS - Done!'}));
});



/*
|--------------------------------------------------------------------------
| Compile Javascript
|--------------------------------------------------------------------------
*/

gulp.task('uglify', function() {
     return gulp.src('js/src/*.js')
          .pipe(plumber({
               errorHandler: onError
          }))
          .pipe(concat('main.js'))
          .pipe(rename('main.min.js'))
          .pipe(uglify())
          .pipe(gulp.dest('js'))
          .pipe(notify({ message: 'JS - Done!' }))
});



/*
|--------------------------------------------------------------------------
| Watch Task
|--------------------------------------------------------------------------
*/

gulp.task('watch', function() {
     gulp.watch('scss/**/*.scss', ['scss']);
     gulp.watch('js/src/*.js', ['uglify']);
});



/*
|--------------------------------------------------------------------------
| Server
|--------------------------------------------------------------------------
*/

gulp.task('webserver', function() {
     return gulp.src('.')
          .pipe(webserver({
               livereload: true,
               directoryListing: false,
               open: true
          }));
});



/*
|--------------------------------------------------------------------------
| Register Tasks
|--------------------------------------------------------------------------
*/

gulp.task('run', ['webserver','watch']);


