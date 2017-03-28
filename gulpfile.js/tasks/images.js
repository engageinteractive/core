const
	config = require('../config'),
	notification = require('../utils/notification'),
	paths = require('../utils/paths')('images'),
	tinypngOptions = config.tasks.images.tinypngCompress,

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
			excludeFilter: '.*, favicon.ico, sprite.svg',
		},
	},

	optimise = () => {
		const filters = {
			optimise: filter('**/*.{jpg,png}', { restore: true }),
			svg: filter('**/*.svg', { restore: true }),
		};

		return gulp
			.src(paths.src())
			.pipe(filters.optimise)
			.pipe(tinypngCompress(tinypngOptions).on('error', notification(options.notification)))
			.pipe(filters.optimise.restore)
			.pipe(filters.svg)
			.pipe(svgmin())
			.pipe(filters.svg.restore)
			.pipe(gulp.dest(paths.dest));
	},

	diff = () => (
		comparison
			.compare(paths.src('', false), paths.dest, options.compare)
			.then((result) => {
				const diffSet = result.diffSet.filter(_diff => _diff.type1 === 'missing');

				if (!result.differencesFiles || !diffSet.length) {
					return;
				}

				gutil.log(gutil.colors.red('Unexpected files in destination directory:'));
				diffSet.forEach(_diff => gutil.log(
					path.relative(paths.dest, path.join(_diff.path2, _diff.name2))
				));
			})
	);

tinypngOptions.key = tinypngOptions.key || process.env.TINYPNG_KEY;
tinypngOptions.sigFile = tinypngOptions.sigFile || path.join(paths.dest, '.tinypng');

gulp.task('images.optimise', optimise);
gulp.task('images.diff', diff);

const task = gulp.series('images.optimise', 'images.diff');
gulp.task('images', task);
module.exports = task;
