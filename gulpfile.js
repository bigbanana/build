var gulp = require('gulp');
var gutil = require("gulp-util");
var uglify = require("gulp-uglify");
var less = require("gulp-less");
var autoprefixer = require("gulp-autoprefixer");
var header = require("gulp-header");
var csso = require("gulp-csso");
var spritesmith = require('gulp.spritesmith');
var include = require('gulp-html-tag-include');
var merge = require('merge-stream');

var moment = require("moment");

var package = require('./package.json');

var banner = '/* build : <%= package.author %> '+moment().format('YYYY-MM-DDHH:mm:ss')+' */\n';
var autoprefixerConfig = {
  browsers: ['last 2 versions','ie 6','ie 7'],
  cascade: false
}

gulp.task('csso',['less'],function(){
  return gulp.src('css/**/*.css')
    .pipe(csso())
    .pipe(header(banner,{package:package}))
    .pipe(gulp.dest('css'));
});

gulp.task('less',function(){
  return gulp.src(['less/**/*.less','!less/includes/**/*'])
    .pipe(less())
    .pipe(autoprefixer(autoprefixerConfig))
    .pipe(gulp.dest('css'));
});
    
gulp.task('html', function() {
  return gulp.src(['tpl/**/*.html','!tpl/includes/**/*'])
    .pipe(include())
    .pipe(gulp.dest('html'));
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('images/sprites/*.png').pipe(spritesmith({
    imgName: 'sprites.png',
    cssName: 'sprites.less',
    cssTemplate: 'handlebars/sprite.handlebars',
    imgPath: '../images/sprites.png'
  }));
  var imgStream = spriteData.img.pipe(gulp.dest('images'));
  var cssStream = spriteData.css.pipe(gulp.dest('less/includes/'));
  return merge(imgStream, cssStream);
});

gulp.task('watch',function(){
  gulp.watch('less/**/*.less',['less']);
  gulp.watch('images/sprites/*.png',['sprite']);
  gulp.watch('tpl/**/*.html',['html']);
});

gulp.task('default',['csso']);
