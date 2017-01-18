var
	config = require('../config'),
	notification = require('../utils/notification'),
	paths = require('../utils/paths')('images'),
	tinypngOptions = config.tasks.images.tinypngCompress,
	task,

	comparison = require('dir-compare'),
	filter = require('gulp-filter'),
	gutil = require('gulp-util'),
	gulp = require('gulp'),
	path = require('path'),
	svgmin = require('gulp-svgmin'),
	tinypngCompress = require('gulp-tinypng-compress'),

	options = {
		notification: {
			title: 'Images Error',
			message: '<%= error.message %>',
		},
		compare: {
			excludeFilter: '.*, sprite.svg',
		},
	},

	optimise = function() {
		var filters = {
			optimise: filter('**/*.{jpg,png}', { restore: true }),
			svg: filter('**/*.svg', { restore: true }),
		};

		return gulp
			.src(paths.src)
			.pipe(filters.optimise)
			.pipe(tinypngCompress(tinypngOptions).on('error', notification(options.notification)))
			.pipe(filters.optimise.restore)
			.pipe(filters.svg)
			.pipe(svgmin())
			.pipe(filters.svg.restore)
			.pipe(gulp.dest(paths.dest));
	},

	diff = function() {
		var
			src = path.join(config.root.src, config.tasks.images.src),
			dest = path.join(config.root.public, config.root.dest, config.tasks.images.dest);

		return comparison
			.compare(src, dest, options.compare)
			.then(function(result) {
				if (!result.differencesFiles) {
					return;
				}

				gutil.log(gutil.colors.red('Unexpected files in destination directory:'));
				result.diffSet
					.filter(function(_diff) {
						return _diff.type1 === 'missing';
					})
					.forEach(function(_diff) {
						gutil.log(path.relative(dest, path.join(_diff.path2, _diff.name2)));
					});
			});
	};

tinypngOptions.key = tinypngOptions.key || process.env.TINYPNG_KEY;
tinypngOptions.sigFile = tinypngOptions.sigFile || path.join(paths.dest, '.tinypng');

gulp.task('images.optimise', optimise);
gulp.task('images.diff', diff);

task = gulp.series('images.optimise', 'images.diff');
gulp.task('images', task);
module.exports = task;
