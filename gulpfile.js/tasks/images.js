var
	config = require('../config'),
	notification = require('../utils/notification'),
	paths = require('../utils/paths')('images'),
	options = config.tasks.images.tinypngCompress,

	changed = require('gulp-changed'),
	filter = require('gulp-filter'),
	gulp = require('gulp'),
	path = require('path'),
	svgmin = require('gulp-svgmin'),
	tinypngCompress = require('gulp-tinypng-compress'),

	filters = {
		optimise: filter('**/*.{jpg,png}', { restore: true }),
		svg: filter('**/*.svg', { restore: true }),
	},

	task = function() {
		return gulp
			.src(paths.src)
			.pipe(changed(paths.dest))
			.pipe(filters.optimise)
			.pipe(
				tinypngCompress(options)
					.on('error', notification({
						title: 'Images Error',
						message: '<%= error.message %>',
					}))
			)
			.pipe(filters.optimise.restore)
			.pipe(filters.svg)
			.pipe(svgmin())
			.pipe(filters.svg.restore)
			.pipe(gulp.dest(paths.dest));
	};

options.key = options.key || process.env.TINYPNG_KEY;
options.sigFile = options.sigFile || path.join(paths.dest, '.tinypng');

gulp.task('images', task);
module.exports = task;
