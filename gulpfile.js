var gulp= require('gulp'),
    uglify= require('gulp-uglify');

gulp.task('minify', function(){
  gulp.src(['app/js/*.js','app/config/*.js'])
  .pipe(uglify())
  .pipe(gulp.dest('dist'))
})
