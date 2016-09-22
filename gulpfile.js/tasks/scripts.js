var
	config = require('../config'),
	gulp = require('gulp'),
	notification = require('../utils/notification'),
	paths = require('../utils/paths')('scripts'),
	lintSrc = paths.lint(),
	task,

	concat = require('gulp-concat'),
	eslint = require('gulp-eslint'),
	sourcemaps = require('gulp-sourcemaps'),
	summary = require('engage-eslint-summary'),
	uglify = require('gulp-uglify'),

	lintSummary = function() {
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

	lint = function() {
		return gulp
			.src(lintSrc)
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());
	},

	compile = function(name) {
		return function() {
			return gulp
				.src(paths.scripts(name))
				.pipe(sourcemaps.init())
				.pipe(concat(name + '.js'))
				.pipe(uglify())
				.pipe(sourcemaps.write('.'))
				.pipe(gulp.dest(paths.dest));
		};
	};

gulp.task('scripts.lint', lintSummary);
gulp.task('scripts.lint.full', lint);

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
