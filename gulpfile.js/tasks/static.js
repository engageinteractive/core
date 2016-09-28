var
	config = require('../config'),
	paths = require('../utils/paths')('static'),
	task,

	changed = require('gulp-changed'),
	gulp = require('gulp'),
	merged = require('merge-stream')(),
	path = require('path');

config.tasks.static.npm.forEach(function(item) {
	var dest = path.join(paths.dest, item.dest);

	merged.add(gulp
		.src(item.src.map(function(src) {
			return path.join('node_modules', src);
		}))
		.pipe(changed(dest))
		.pipe(gulp.dest(dest))
	);
});

gulp.task('static.assets', function() {
	return gulp
		.src(paths.src)
		.pipe(changed(paths.dest))
		.pipe(gulp.dest(paths.dest));
});

gulp.task('static.npm', function() {
	return merged;
});

task = gulp.parallel('static.assets', 'static.npm');
gulp.task('static', task);
module.exports = task;
