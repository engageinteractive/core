var
	config = require('../config'),
	paths = require('../utils/paths')('sprite'),

	gulp = require('gulp'),
	svgSprite = require('gulp-svg-sprite'),

	task = function() {
		return gulp
			.src(paths.src)
			.pipe(svgSprite(config.tasks.sprite.svgSprite))
			.pipe(gulp.dest(paths.dest));
	};

gulp.task('sprite', task);
module.exports = task;
