var
	config = require('../config'),
	gulp = require('gulp'),
	// notification = require('../utils/notification'),
	paths = require('../utils/paths')('scripts'),
	task,

	concat = require('gulp-concat'),
	path = require('path'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),

	compile = function(name) {
		var file = config.tasks.scripts.files.find(item => item.name === name);

		return function() {
			return gulp
				.src(
					file.src.map(src => path.join(
						config.root.src,
						config.tasks.scripts.src,
						file.name,
						src + '.+(' + config.tasks.scripts.extensions.join('|') + ')'
					))
				)
				.pipe(sourcemaps.init())
				.pipe(concat(name + '.js'))
				.pipe(uglify())
				.pipe(sourcemaps.write('.'))
				.pipe(gulp.dest(paths.dest));
		};
	};

config.tasks.scripts.files.forEach((file) => {
	gulp.task('scripts.' + file.name, compile(file.name));
});

task = gulp.series(
	// 'scripts.lint'
	gulp.parallel(config.tasks.scripts.files.map(file => 'scripts.' + file.name))
);
gulp.task('scripts', task);
module.exports = task;
