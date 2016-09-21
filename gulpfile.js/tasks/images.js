var
	config = require('../config'),
	gulp = require('gulp'),
	notification = require('../utils/notification'),
	paths = require('../utils/paths')('images'),

	path = require('path'),
	svgmin = require('gulp-svgmin'),
	tinypngCompress = require('gulp-tinypng-compress'),
	task,

	vectors = function() {
		return gulp
			.src(paths.src('vectors'))
			.pipe(svgmin())
			.pipe(gulp.dest(paths.dest));
	},

	bitmaps = function() {
		var options = config.tasks.images.tinypngCompress;
		options.key = options.key || process.env.TINYPNG_KEY;
		options.sigFile = options.sigFile || path.join(paths.dest, '.tinypng');

		return gulp
			.src(paths.src('bitmaps'))
			.pipe(
				tinypngCompress(options)
					.on('error', notification({
						title: 'Images Error',
						message: '<%= error.message %>',
					}))
			)
			.pipe(gulp.dest(paths.dest));
	};

gulp.task('images.vectors', vectors);
gulp.task('images.bitmaps', bitmaps);

task = gulp.parallel('images.vectors', 'images.bitmaps');

gulp.task('images', task);
module.exports = task;
