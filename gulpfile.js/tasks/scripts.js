var
	config = require('../config'),
	notification = require('../utils/notification'),
	paths = require('../utils/paths')('scripts'),

	ModernizrPlugin = require('modernizr-webpack-plugin'),
	eslint = require('gulp-eslint'),
	filter = require('gulp-filter'),
	gulp = require('gulp'),
	named = require('vinyl-named'),
	summary = require('engage-eslint-summary'),
	webpack = require('webpack-stream'),

	options = {
		webpack: {
			devtool: 'source-map',
			output: {
				publicPath: paths.public,
			},
			plugins: [
				new webpack.webpack.optimize.UglifyJsPlugin({
					compress: { warnings: false },
				}),
				new ModernizrPlugin({
					filename: 'modernizr.js',
					htmlWebpackPlugin: false,
					minify: true,
					options: [
						'setClasses',
					],
					'feature-detects': config.tasks.scripts.featureDetects,
				}),
			],
		},
		notification: {
			title: 'JavaScript Error',
			subtitle: [
				'<%= options.relative(options.cwd, error.fileName) %>',
				'<%= error.lineNumber %>',
			].join(':'),
			message: '<%= error.message %>',
			open: 'file://<%= error.fileName %>',
		},
	},

	task = function(done) {
		var filters = {
			custom: filter(['**/!(*.min.js)']),
			entries: filter([paths.entries()]),
		};

		return gulp
			.src(paths.src)
			.pipe(filters.custom)
			.pipe(eslint())
			.pipe(eslint.format(summary))
			.pipe(eslint.failOnError().on('error', notification(options.notification)))
			.pipe(eslint.failOnError().on('error', function() { done(); }))
			.pipe(filters.entries)
			.pipe(named())
			.pipe(webpack(options.webpack))
			.pipe(gulp.dest(paths.dest));
	};

gulp.task('scripts.lint', function() {
	return gulp
		.src(paths.src)
		.pipe(eslint())
		.pipe(eslint.format());
});

gulp.task('scripts', task);
module.exports = task;

gulp.task('scripts.lint.full', gulp.series('scripts.lint')); // legacy alias
