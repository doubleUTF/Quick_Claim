var gulp= require('gulp'),
    usemin=require('gulp-usemin'),
    uglify= require('gulp-uglify'),
    minifyHtml=require('gulp-minify-html'),
    minifyCss=require('gulp-minify-css'),
    rev=require('gulp-rev'),
    concat=require('gulp-concat'),
    del=require('del')


gulp.task('usemin', function(){
  return gulp.src('app/popup/*.html')
    .pipe(usemin({
      css:[rev()],
      html:[minifyHtml({empty:true})],
      js:[uglify(),rev()]
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('concatLib',function(){
  return gulp.src('./app/vendor/*.js')
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('dist/js/'))
})

gulp.task('default',['clean'],function(){
  gulp.start('usemin','concatLib')
})

gulp.task('clean',function(){
  return del('dist')
})
