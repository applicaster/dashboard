require('dotenv').load();
var gulp = require('gulp');
var template = require('gulp-template');

gulp.task('default', function () {
  console.log('Creating dist/index.html')
  return gulp.src('src/index.html')
    .pipe(template({
      X_PARSE_APPLICATION_ID: process.env.X_PARSE_APPLICATION_ID,
      X_PARSE_REST_API_KEY: process.env.X_PARSE_REST_API_KEY
    }))
    .pipe(gulp.dest('dist'));
});
