const
	config = require('../config'),
	paths = require('../utils/paths'),

	browserSync = require('browser-sync'),
	gulp = require('gulp'),

	task = () => {
		const options = config.tasks.watch.browserSync;

		config.tasks.watch.tasks.forEach((name) => {
			const tasks = [name];

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
