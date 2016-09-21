var
	paths = require('../utils/paths')('static'),
	gulp = require('gulp'),

	task = function() {
		return gulp
			.src(paths.src())
			.pipe(gulp.dest(paths.dest));
	};

gulp.task('static', task);
module.exports = task;
