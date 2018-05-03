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

	bableLoaderOptions = {
		plugins: [
			'transform-object-rest-spread'
		],
		presets: [
			'es2015'
		],
	},

	options = {
		webpack: {
			devtool: 'source-map',
			output: {
				publicPath: paths.public,
			},
			module: {
				rules: [
					{
						test: /\.vue$/,
						exclude: /node_modules/,
						loader: 'vue-loader',
						options: {
							loaders: {
								js: {
									loader: 'babel-loader',
									options: bableLoaderOptions,
								},
							},
						},
					},
					{
						test: /\.js$/,
						loader: 'babel-loader',
						exclude: /node_modules/,
						options: bableLoaderOptions,
					},
					{
						test: /\.json$/,
						loader: 'json-loader',
					},
				],
			},
			plugins: [
				new webpack.webpack.optimize.UglifyJsPlugin({
					compress: { warnings: false },
					sourceMap: true,
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
			resolve: {
				alias: {
					'vue': 'vue/dist/vue.common.js',
				},
			},
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
			if (!stats.compilation.errors[0].error) {
				gutil.log('stats.compilation.errors[0]');
				gutil.log(stats.compilation.errors[0]);
			} else {
				gutil.log(gutil.colors.red(stats.compilation.errors[0].error.toString()));
			}
		} else if (stats.hasWarnings()) {
			if (!stats.compilation.warnings[0].error) {
				gutil.log('stats.compilation.warnings[0]');
				gutil.log(stats.compilation.warnings[0]);
			} else {
				gutil.log(gutil.colors.yellow(stats.compilation.warnings[0].error.toString()));
			}
		}
	},

	task = (done) => {
		const filters = filter(paths.src('*'));

		return gulp
			.src(paths.src())
			.pipe(eslint())
			.pipe(eslint.format(summary({ hideErrors: false })))
			.pipe(eslint.failOnError().on('error', notification(options.notification)))
			.pipe(eslint.failOnError().on('error', () => { done(); }))
			.pipe(filters)
			.pipe(named())
			.pipe(webpack(options.webpack, null, handler).on('error', (a, b, c) => { gutil.log(a, b, c); done(); }))
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
