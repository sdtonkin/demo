/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
  rimraf = require("rimraf"),
  concat = require("gulp-concat"),
  cssmin = require("gulp-cssmin"),
  uglify = require("gulp-uglify"),
  sass = require("gulp-sass");

var paths = {
    webroot: "./Resources/"
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/*.css";
paths.minCss = paths.webroot + "css/*.min.css";
paths.concatJsDest = paths.webroot + "js/main.min.js";
paths.concatCssDest = paths.webroot + "css/main.min.css";
paths.scss = paths.webroot + "css/sass/*.scss";

gulp.task("1-compile", ["sass", "clean", "min" ]);

gulp.task('sass', false, function () {
    gulp.src(paths.scss)
      .pipe(sass())
      .pipe(gulp.dest(paths.webroot + "css"));
});
gulp.task('watch-sass', function () {
    gulp.watch(paths.scss, ['sass']);
})

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});
gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
      .pipe(concat(paths.concatJsDest))
      .pipe(uglify())
      .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
      .pipe(concat(paths.concatCssDest))
      .pipe(cssmin())
      .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);
