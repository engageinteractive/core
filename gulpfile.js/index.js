var gulp = require('gulp');

require('require-dir')('./tasks', { recurse: true });

gulp.task('default', gulp.parallel(require('./config').tasks.default.tasks));
