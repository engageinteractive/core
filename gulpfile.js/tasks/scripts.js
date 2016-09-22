var
	config = require('../config'),
	gulp = require('gulp'),
	notification = require('../utils/notification'),
	paths = require('../utils/paths')('scripts'),
	lintSrc,
	task,

	concat = require('gulp-concat'),
	eslint = require('gulp-eslint'),
	path = require('path'),
	sourcemaps = require('gulp-sourcemaps'),
	summary = require('engage-eslint-summary'),
	uglify = require('gulp-uglify'),

	fileSrc = function(name) {
		return config.tasks.scripts.files
			.find(function(file) { return file.name === name; }).src
			.map(function(src) {
				return path.join(
					config.root.src,
					config.tasks.scripts.src,
					name,
					src + '.+(' + config.tasks.scripts.extensions.join('|') + ')'
				);
			});
	},

	lint = function() {
		return gulp
			.src(lintSrc)
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
	},

	lintReport = function() {
		return gulp
			.src(lintSrc)
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());
	},

	compile = function(name) {
		return function() {
			return gulp
				.src(fileSrc(name))
				.pipe(sourcemaps.init())
				.pipe(concat(name + '.js'))
				.pipe(uglify())
				.pipe(sourcemaps.write('.'))
				.pipe(gulp.dest(paths.dest));
		};
	};

lintSrc = config.tasks.scripts.files
	.filter(function(file) { return file.lint; })
	.map(function(file) { return fileSrc(file.name); })
	.reduce(function(a, b) { return a.concat(b); });

gulp.task('scripts.lint', lint);
gulp.task('scripts.lint.full', lintReport);

config.tasks.scripts.files.forEach(function(file) {
	gulp.task('scripts.' + file.name, compile(file.name));
});

task = gulp.series(
	'scripts.lint',
	gulp.parallel(config.tasks.scripts.files.map(function(file) {
		return 'scripts.' + file.name;
	}))
);
gulp.task('scripts', task);
module.exports = task;
