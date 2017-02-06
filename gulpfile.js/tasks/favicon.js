const
	config = require('../config'),
	paths = require('../utils/paths')('favicon'),

	gulp = require('gulp'),
	favicons = require('gulp-favicons'),
	filter = require('gulp-filter'),

	task = () => gulp
		.src('src/img/meta/favicon-32.png')
		.pipe(favicons({
			online: true,
			icons: {
	            android: false,
	            appleIcon: false,
	            appleStartup: false,
	            coast: false,
	            favicons: true,
	            firefox: false,
	            windows: false,
	            yandex: false
	        }
		}))
		.pipe(filter('favicon.ico'))
		.pipe(gulp.dest(paths.dest));

gulp.task('favicon', task);
module.exports = task;
