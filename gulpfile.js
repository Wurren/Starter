var gulp = require("gulp"),
    sass = require("gulp-sass"),
    cssmin = require("gulp-clean-css"),
    notify = require("gulp-notify"),
    path = require("path"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    plumber = require("gulp-plumber"),
    webserver = require("gulp-webserver"),
    webpack = require("webpack-stream"),
    named = require("vinyl-named"),
    webpackconfig = require("./webpack.config.js"),
    imagemin = require("gulp-imagemin");

/*
|--------------------------------------------------------------------------
| Error Catching
|--------------------------------------------------------------------------
*/

var onError = err => {
    console.log(err);
    this.emit("end");
};

/*
|--------------------------------------------------------------------------
| Compile SCSS
|--------------------------------------------------------------------------
*/

gulp.task("scss", () => {
    gulp
        .src("src/scss/main.scss")
        .pipe(
            plumber({
                errorHandler: onError
            })
        )
        .pipe(sass())
        .pipe(
            cssmin({ debug: true }, details => {
                console.log(
                    `${details.name} Before: ${details.stats.originalSize}`
                );
                console.log(
                    `${details.name} After: ${details.stats.minifiedSize}`
                );
            })
        )
        .pipe(gulp.dest("dist/css"))
        .pipe(notify({ message: "SCSS - Done!" }));
});

/*
|--------------------------------------------------------------------------
| Compile Javascript
|--------------------------------------------------------------------------
*/

gulp.task("webpack", () => {
    gulp
        .src(["src/js/main.js"])
        .pipe(named())
        .pipe(webpack(webpackconfig))
        .pipe(gulp.dest("dist/js"))
        .pipe(notify({ message: "JS - Done!" }));
});

/*
|--------------------------------------------------------------------------
| Images
|--------------------------------------------------------------------------
*/

gulp.task("images", () =>
    gulp
        .src("src/img/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"))
);

/*
|--------------------------------------------------------------------------
| Watch Task
|--------------------------------------------------------------------------
*/

gulp.task("watch", () => {
    gulp.watch("src/scss/**/*.scss", ["scss"]);
    gulp.watch("src/js/*.js", ["webpack"]);
    gulp.watch("src/img/**/*", ["images"]);
});

/*
|--------------------------------------------------------------------------
| Server
|--------------------------------------------------------------------------
*/

gulp.task("webserver", () => {
    return gulp.src(".").pipe(
        webserver({
            livereload: true,
            directoryListing: false,
            open: true
        })
    );
});

/*
|--------------------------------------------------------------------------
| Register Tasks
|--------------------------------------------------------------------------
*/

gulp.task("run", ["webserver", "watch"]);
gulp.task("build", ["scss", "webpack", "images"]);
