const
	config = require('../config'),
	notification = require('../utils/notification'),
	paths = require('../utils/paths')('css'),

	autoprefixer = require('gulp-autoprefixer'),
	cleanCss = require('gulp-clean-css'),
	gulp = require('gulp'),
	importer = require('node-sass-json-importer'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),

	options = {
		notification: {
			title: 'Sass Error',
			subtitle: '<%= error.relativePath %>:<%= error.line %>',
			message: '<%= error.messageOriginal %>',
			open: 'file://<%= error.file %>',
		},
		sass: Object.assign({}, config.tasks.css.sass, { importer }),
	},

	task = () => gulp
		.src(paths.src)
		.pipe(sourcemaps.init())
		.pipe(sass(options.sass).on('error', notification(options.notification)))
		.pipe(cleanCss(config.tasks.css.cleanCss))
		.pipe(autoprefixer(config.tasks.css.autoprefixer))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.dest));

gulp.task('css', task);
module.exports = task;

gulp.task('styles', gulp.series('css')); // legacy alias
