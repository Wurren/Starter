var  gulp           = require('gulp'),
     less           = require('gulp-less'),
     cssmin         = require('gulp-minify-css'),
     notify         = require('gulp-notify'),
     path           = require('path'),
     uglify         = require('gulp-uglify'),
     concat         = require('gulp-concat'),
     rename         = require('gulp-rename'),
     livereload     = require('gulp-livereload');

gulp.task('less', function() {
     return gulp.src('less/style.less')
          .pipe(less())
          .pipe(cssmin())
          .pipe(gulp.dest('css'))
          .pipe(notify({ message: 'Less - Done!'}));
});

gulp.task('uglify', function() {
     return gulp.src('js/src/*.js')
          .pipe(concat('main.js'))
          .pipe(rename('main.min.js'))
          .pipe(uglify())
          .pipe(gulp.dest('js'))
          .pipe(notify({ message: 'JS - Done!' }))
});

gulp.task('watch', function() {
     gulp.watch('less/*.less', ['less']);
     gulp.watch('js/src/*.js', ['uglify']);
     var server = livereload();
     gulp.watch(['less/*.less', 'js/src/*', '*.html']).on('change', function(file) {
          server.changed('*.html');
     });
});

