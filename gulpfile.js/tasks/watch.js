var
	config = require('../config'),
	paths = require('../utils/paths'),

	browserSync = require('browser-sync'),
	gulp = require('gulp'),
	path = require('path'),

	template = path.join(
		config.root.src,
		config.tasks.styleguide.template
	),

	task = function() {
		var options = config.tasks.watch.browserSync;

		config.tasks.watch.tasks.forEach(function(name) {
			options.files.push(paths(name).dest);
		});

		browserSync.init(options);

		config.tasks.watch.tasks.forEach(function(name) {
			gulp.watch(paths(name).src, gulp.parallel(name));

			if (name === 'styleguide') {
				gulp.watch(template, gulp.parallel('styleguide'));
			}
		});
	};

gulp.task('watch', task);
module.exports = task;
