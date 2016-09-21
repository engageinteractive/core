var
	config = require('../config'),
	gulp = require('gulp'),
	paths = require('../utils/paths')('sprite'),

	svgSprite = require('gulp-svg-sprite'),

	task = function() {
		return gulp
			.src(paths.src())
			.pipe(svgSprite(config.tasks.sprite.svgSprite))
			.pipe(gulp.dest(paths.dest));
	};

gulp.task('sprite', task);
module.exports = task;
