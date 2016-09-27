var
	config = require('../config'),

	gulp = require('gulp'),
	del = require('del'),
	path = require('path'),

	task = function() {
		return del(path.join(
			config.root.public,
			config.root.dest
		));
	};

gulp.task('clean', task);
module.exports = task;
