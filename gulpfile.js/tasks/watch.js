var
	config = require('../config'),
	paths = require('../utils/paths'),

	browserSync = require('browser-sync'),
	gulp = require('gulp'),

	task = function() {
		var options = config.tasks.watch.browserSync;

		config.tasks.watch.tasks.forEach(function(name) {
			var tasks = [name];

			if (name === 'css') {
				tasks.push('styleguide');
			}

			options.files.push(paths(name).dest);
			gulp.watch(paths(name).src, gulp.parallel(tasks));
		});

		browserSync.init(options);
	};

gulp.task('watch', task);
module.exports = task;
