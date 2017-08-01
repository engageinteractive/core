const
	config = require('../config'),
	notification = require('../utils/notification'),
	paths = require('../utils/paths')('scripts'),

	ModernizrPlugin = require('modernizr-webpack-plugin'),
	eslint = require('gulp-eslint'),
	filter = require('gulp-filter'),
	gulp = require('gulp'),
	gutil = require('gulp-util'),
	named = require('vinyl-named'),
	summary = require('engage-eslint-summary'),
	webpack = require('webpack-stream'),

	options = {
		webpack: {
			devtool: 'source-map',
			output: {
				publicPath: paths.public,
			},
			module: {
				loaders: [
					{
						loader: 'babel-loader',
						exclude: /node_modules/,
						query: {
							presets: [
								'es2015',
							],
						},
					},
					{
						loader: 'json-loader',
						test: /\.json$/,
					},
					{
						loader: 'script-loader',
						test: /libs/,
						exclude: /node_modules/,
					},
				],
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
						'mq',
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

	handler = (err, stats) => {
		if (stats.hasErrors()) {
			gutil.log(gutil.colors.red(stats.compilation.errors[0].error.toString()));
		} else if (stats.hasWarnings()) {
			gutil.log(gutil.colors.yellow(stats.compilation.warnings[0].error.toString()));
		}
	},

	task = (done) => {
		const filters = filter(paths.src('*'));

		return gulp
			.src(paths.src())
			.pipe(eslint())
			.pipe(eslint.format(summary({ hideErrors: true })))
			.pipe(eslint.failOnError().on('error', notification(options.notification)))
			.pipe(eslint.failOnError().on('error', () => { done(); }))
			.pipe(filters)
			.pipe(named())
			.pipe(webpack(options.webpack, null, handler).on('error', () => { done(); }))
			.pipe(gulp.dest(paths.dest));
	};

gulp.task('scripts.lint', () => (
	gulp
		.src(paths.src())
		.pipe(eslint())
		.pipe(eslint.format())
));

gulp.task('scripts', task);
module.exports = task;

gulp.task('scripts.lint.full', gulp.series('scripts.lint')); // legacy alias
