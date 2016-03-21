/*!
 * gulp
 * Dependencies
 * - You need node installed if you don't already have it - https://nodejs.org/en/
 * - Open Terminal
 * - Run command 'npm install --global gulp'
 *
 * Project usage
 * - Navigate to the root of your project in terminal with 'cd <path to your project>'
 * - Run the command 'npm install' which installs all of the gulp plugins to the project
 * - Run the command 'gulp' if you want to manually clean up and compile all CSS, JS, and images
 * - Run the command 'gulp watch'
 */

var

	// Dependencies
	browserSync = require('browser-sync'),
	gulp = require('gulp'),
	del = require('del'),
	plugins = require("gulp-load-plugins")(),

	// Paths
	base = {
		src: 'src',
		public: 'public'
	},
	assets = base.public + '/assets'
	paths = {
		styles: {
			src:	base.src + '/scss/**/*.scss',
			dest: assets + '/css'
		},
		scripts: {
			dir: base.src + '/js',
			src: base.src + '/js/**/*.js',
			dest: assets + '/js',
			destFiles: assets + '/js/**/*',
			precompiled: {
				root: assets + '/js/precompiled',
				files: assets + '/js/precompiled/**'
			}
		},
		images: {
			src:	base.src + '/img/**/*',
			dest: assets + '/img'
		}
	};


// Clean

gulp.task('clean', function(cb) {
	return del([
		paths.styles.dest,
		paths.scripts.destFiles,
		'!' + paths.scripts.precompiled.root,
		'!' + paths.scripts.precompiled.files,
		paths.images.dest
	], cb);
});


// SCSS

gulp.task('styles', function() {

	return gulp
		.src(paths.styles.src)
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.sass({ errLogToConsole: true, outputStyle: 'expanded' }))
		.pipe(plugins.cleanCss({ restructuring: false }))
		.pipe(plugins.autoprefixer({ browsers: ['last 2 versions', 'IE 9'], cascade: false }))
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(browserSync.stream());

});


// Images

gulp.task('images', function() {

	var optimised = plugins.filter('**/*.{jpg,png}', { restore: true });

	return gulp
		.src(paths.images.src)
		.pipe(plugins.changed(paths.images.dest))
		.pipe(optimised)
		.pipe(plugins.tinypng('5_gZs_VCSFhHU28xGAVSm8o_JbT0Gpum'))
		.pipe(optimised.restore)
		.pipe(gulp.dest(paths.images.dest))
		.pipe(browserSync.stream());

});


// JS

gulp.task('scripts.lint', function() {
	return gulp
		.src(paths.scripts.src)
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('scripts.site', function() {

	return gulp
		.src([
			paths.scripts.dir + '/site/global.js',
			paths.scripts.dir + '/site/modules/*.js',
			paths.scripts.dir + '/site/pages/*.js',
		])
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.concat('site.js'))
		.pipe(plugins.uglify())
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest(paths.scripts.dest))
		.pipe(browserSync.stream());

});

gulp.task('scripts.plugins', function() {

	return gulp
		.src([
			paths.scripts.dir + '/plugins/*.js',
			paths.scripts.dir + '/plugins/jquery/*.js',
		])
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.concat('plugins.js'))
		.pipe(plugins.uglify())
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest(paths.scripts.dest))
		.pipe(browserSync.stream());

});

gulp.task('scripts.libs', function() {

	return gulp
		.src(paths.scripts.dir + '/libs/*.js')
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.concat('libs.js'))
		.pipe(plugins.uglify())
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest(paths.scripts.dest))
		.pipe(browserSync.stream());

});

gulp.task('scripts', ['scripts.lint'], function() {
	gulp.start('scripts.site', 'scripts.plugins', 'scripts.libs');
});


// Watch
gulp.task('watch', function() {

	browserSync.init({
		ghostMode: { scroll: false },
		notify: false,
		open: false,
		proxy: 'front-end-baseplate.dev.com'
	});

	gulp.watch(paths.styles.src, ['styles']);

	gulp.watch(paths.images.src, ['images']);

	gulp.watch(paths.scripts.src, ['scripts.lint']);

	gulp.watch(paths.scripts.src, ['scripts']);

	gulp.watch(['public/**/*.html', 'public/**/*.php']) .on('change', browserSync.reload);

});

gulp.task('default', ['clean'], function() {
	gulp.start('styles', 'scripts', 'images');
});
