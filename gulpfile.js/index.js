var gulp = require('gulp');

require('require-dir')('./tasks', { recurse: true });

gulp.task('default', gulp.parallel(require('./config').tasks.default.tasks));

// legacy faux aliases

gulp.task('styles', gulp.series('css'));
gulp.task('scripts.lint', gulp.series('scripts.site.lint'));
gulp.task('scripts.lint.full', gulp.series('scripts.site.lint.full'));
