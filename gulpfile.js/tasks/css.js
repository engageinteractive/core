var
	config = require('../config'),
	gulp = require('gulp'),

	autoprefixer = require('gulp-autoprefixer'),
	cleanCss = require('gulp-clean-css'),
	notify = require('gulp-notify'),
	path = require('path'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),

	paths = {
		src: path.join(
			config.root.src,
			config.tasks.css.src,
			'/**/*.{' + config.tasks.css.extensions + '}'
		),
		dest: path.join(
			config.root.dest,
			config.tasks.css.dest
		),
	},

	task = function() {
		return gulp
			.src(paths.src)
			.pipe(sourcemaps.init())
			.pipe(
				sass(config.tasks.css.sass)
					.on('error', notify.onError({
						title: 'Sass Error',
						subtitle: [
							'<%= error.relativePath %>',
							'<%= error.line %>',
						].join(':'),
						message: '<%= error.messageOriginal %>',
						open: 'file://<%= error.file %>',
						onLast: true,
						icon: config.tasks.images.icon,
					}))
			)
			.pipe(cleanCss(config.tasks.css.cleanCss))
			.pipe(autoprefixer(config.tasks.css.autoprefixer))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(paths.dest));
	};

gulp.task('css', task);
module.exports = task;
