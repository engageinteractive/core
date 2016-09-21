var
	config = require('../config'),
	gulp = require('gulp'),

	del = require('del'),

	task = function() {
		return del(config.root.dest);
	};

gulp.task('clean', task);
module.exports = task;
