'use strict';

var gulp = require('gulp'),
  gulpConcat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  renameFile = require('gulp-rename'),
  sass = require('gulp-sass'),
  sourceMaps = require('gulp-sourcemaps'),
  autoPrefixer = require('gulp-autoprefixer');


gulp.task("concatJS", function(){
  return gulp.src([
    './javascript/dev/**/*.js'
  ])
  .pipe(sourceMaps.init())
  .pipe(gulpConcat('script.js'))
  .pipe(sourceMaps.write('./'))
  .pipe(gulp.dest('./javascript/production'));
});

gulp.task("minifyScripts", ['concatJS'], function(){
  return gulp.src('./javascript/script.js')
  .pipe(renameFile('script.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./javascript/production'));
});

gulp.task("compileSass", function(){
  return gulp.src('_sass/vocalsandverses.scss')
  .pipe(sourceMaps.init())
  .pipe(sass())
  .pipe(autoPrefixer('last 2 versions'))
  .pipe(sourceMaps.write('./'))
  .pipe(gulp.dest('./'));
});

//fix browser reload

gulp.task("watchFiles", function(){

  gulp.watch('_sass/**/*.scss', ['compileSass']);
  gulp.watch('javascript/dev/*.js', ['concatJS']);
});

gulp.task("serve", ['watchFiles']);
gulp.task("build", ['minifyScripts', 'compileSass']);
gulp.task("default", ['build']);
