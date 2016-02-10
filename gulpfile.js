var gulp      = require('gulp');
var plugins   = require('gulp-load-plugins')();

// Override gulp.src method
var gulp_src = gulp.src;
gulp.src = function() {
  return gulp_src.apply(gulp, arguments)
    .pipe(plugins.plumber(function(error) {
      // Output an error message
      plugins.util.log(plugins.util.colors.red('Error (' + error.plugin + '): ' + error.message));
      // emit the end event, to properly end the task
      this.emit('end');
    })
  );
};

// Build SCSS
gulp.task('scss', function() {
  return gulp.src('./src/styles.scss')
          .pipe(plugins.sass())
          .pipe(plugins.autoprefixer())
          .pipe(plugins.cssnano())
          .pipe(plugins.rename({suffix: '.min'}))
          .pipe(gulp.dest('./build'))
});
