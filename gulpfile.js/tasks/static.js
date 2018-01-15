const
	config = require('../config'),
	paths = require('../utils/paths')('static'),

	changed = require('gulp-changed'),
	gulp = require('gulp'),
	merged = require('merge-stream')(),
	path = require('path');

gulp.task('static.assets', () => (
	gulp
		.src(paths.src())
		.pipe(changed(paths.dest))
		.pipe(gulp.dest(paths.dest))
));

gulp.task('static.npm', (done) => {
	if (!config.tasks.static.npm.length) {
		done();
	}

	config.tasks.static.npm.forEach((item) => {
		const dest = path.join(paths.dest, item.dest);

		merged.add(gulp
			.src(item.src.map(src => path.join('node_modules', src)))
			.pipe(changed(dest))
			.pipe(gulp.dest(dest))
		);
	});

	return merged;
});

const task = gulp.parallel('static.assets', 'static.npm');
gulp.task('static', task);
module.exports = task;
