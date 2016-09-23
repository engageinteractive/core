var
	paths = require('../utils/paths')('static'),
	gulp = require('gulp'),

	changed = require('gulp-changed'),

	task = function() {
		return gulp
			.src(paths.src)
			.pipe(changed(paths.dest))
			.pipe(gulp.dest(paths.dest));
	};

gulp.task('static', task);
module.exports = task;
