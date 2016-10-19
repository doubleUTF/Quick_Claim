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
    .pipe(gulp.dest('dist/popup/'));
});

gulp.task('clean',function(){
  return del('dist')
})

gulp.task('copyImages',function(){
  gulp.src('app/img/*')
  .pipe(gulp.dest('dist/img/'))
})

gulp.task('copyManifest',function(){
  gulp.src('app/manifest.json')
  .pipe(gulp.dest('dist'))
})

gulp.task('copyLib',function(){
  gulp.src('app/vendor/*.js')
  .pipe(gulp.dest('dist/vendor'))
})

gulp.task('copyContentJs',function(){
  gulp.src('app/js/content.js')
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'))
})

gulp.task('default',['clean'],function(){
  gulp.start('usemin','copyImages',
  'copyManifest','copyLib','copyContentJs')
})
