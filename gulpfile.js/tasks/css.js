var
	config = require('../config'),
	notification = require('../utils/notification'),
	paths = require('../utils/paths')('css'),

	autoprefixer = require('gulp-autoprefixer'),
	cleanCss = require('gulp-clean-css'),
	gulp = require('gulp'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),

	options = {
		notification: {
			title: 'Sass Error',
			subtitle: '<%= error.relativePath %>:<%= error.line %>',
			message: '<%= error.messageOriginal %>',
			open: 'file://<%= error.file %>',
		},
	},

	task = function() {
		return gulp
			.src(paths.src)
			.pipe(sourcemaps.init())
			.pipe(sass(config.tasks.css.sass).on('error', notification(options.notification)))
			.pipe(cleanCss(config.tasks.css.cleanCss))
			.pipe(autoprefixer(config.tasks.css.autoprefixer))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(paths.dest));
	};

gulp.task('css', task);
module.exports = task;

gulp.task('styles', gulp.series('css')); // legacy alias
