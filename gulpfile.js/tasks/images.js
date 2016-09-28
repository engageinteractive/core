var
	config = require('../config'),
	notification = require('../utils/notification'),
	paths = require('../utils/paths')('images'),
	tinypngOptions = config.tasks.images.tinypngCompress,

	changed = require('gulp-changed'),
	filter = require('gulp-filter'),
	gulp = require('gulp'),
	path = require('path'),
	svgmin = require('gulp-svgmin'),
	tinypngCompress = require('gulp-tinypng-compress'),

	options = {
		notification: {
			title: 'Images Error',
			message: '<%= error.message %>',
		},
	},

	task = function() {
		var filters = {
			optimise: filter('**/*.{jpg,png}', { restore: true }),
			svg: filter('**/*.svg', { restore: true }),
		};

		return gulp
			.src(paths.src)
			.pipe(changed(paths.dest))
			.pipe(filters.optimise)
			.pipe(tinypngCompress(tinypngOptions).on('error', notification(options.notification)))
			.pipe(filters.optimise.restore)
			.pipe(filters.svg)
			.pipe(svgmin())
			.pipe(filters.svg.restore)
			.pipe(gulp.dest(paths.dest));
	};

tinypngOptions.key = tinypngOptions.key || process.env.TINYPNG_KEY;
tinypngOptions.sigFile = tinypngOptions.sigFile || path.join(paths.dest, '.tinypng');

gulp.task('images', task);
module.exports = task;
