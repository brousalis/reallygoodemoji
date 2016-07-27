require('bendystraw')({
  angular: { enabled: true },
  scripts: { babel: true }
})

var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});
