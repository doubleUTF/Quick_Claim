var gulp= require('gulp'),
    usemin=require('gulp-usemin'),
    uglify= require('gulp-uglify'),
    minifyHtml=require('gulp-minify-html'),
    minifyCss=require('gulp-minify-css'),
    rev=require('gulp-rev');


gulp.task('usemin', function(){
  return gulp.src('app/popup/*.html')
    .pipe(usemin({
      css:[rev()],
      html:[minifyHtml({empty:true})],
      js:[uglify(),rev()]
    }))
    .pipe(gulp.dest('dist/'));
});
