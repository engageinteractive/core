var
	config = require('../config'),
	notification = require('../utils/notification'),
	paths = require('../utils/paths')('scripts'),
	task,

	ModernizrPlugin = require('modernizr-webpack-plugin'),
	eslint = require('gulp-eslint'),
	filter = require('gulp-filter')(['**/!(*.min.js)']),
	gulp = require('gulp'),
	named = require('vinyl-named'),
	summary = require('engage-eslint-summary'),
	webpack = require('webpack-stream');

gulp.task('scripts.lint', function() {
	return gulp
		.src(paths.src)
		.pipe(filter)
		.pipe(eslint())
		.pipe(eslint.format(summary))
		.pipe(
			eslint.failOnError()
				.on('error', notification({
					title: 'JavaScript Error',
					subtitle: [
						'<%= options.relative(options.cwd, error.fileName) %>',
						'<%= error.lineNumber %>',
					].join(':'),
					message: '<%= error.message %>',
					open: 'file://<%= error.fileName %>',
				}))
		)
		.pipe(eslint.failAfterError());
});

gulp.task('scripts.lint.full', function() {
	return gulp
		.src(paths.src)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('scripts.compile', function() {
	return gulp
		.src(paths.entries())
		.pipe(named())
		.pipe(
			webpack({
				devtool: 'eval',
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
			})
		)
		.pipe(gulp.dest(paths.dest));
});

task = gulp.series('scripts.lint', 'scripts.compile');
gulp.task('scripts', task);
module.exports = task;
