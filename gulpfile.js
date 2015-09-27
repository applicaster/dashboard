require('dotenv').load();
var gulp = require('gulp');
var template = require('gulp-template');

gulp.task('default', function () {
  console.log('Creating dist/index.html')
  return gulp.src('src/index.html')
    .pipe(template({FIREBASE_APP: process.env.FIREBASE_APP}))
    .pipe(gulp.dest('dist'));
});
