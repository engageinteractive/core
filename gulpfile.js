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

	// Config
	config = {
		url: 'front-end-baseplate.dev.com',
		tinypngKey: process.env.TINYPNG_KEY,
		autoprefixer: ['last 2 versions', 'IE 9', 'Safari 8'],
	},

	// Dependencies
	browserSync = require('browser-sync'),
	gulp = require('gulp'),
	del = require('del'),
	path = require('path'),
	summary = require('engage-eslint-summary'),
	plugins = require('gulp-load-plugins')(),

	// Paths
	base = {
		src: 'src',
		public: 'public',
	},
	assets = base.public + '/assets',
	paths = {
		styles: {
			src: base.src + '/scss/**/*.scss',
			dest: assets + '/css',
		},
		scripts: {
			dir: base.src + '/js',
			src: base.src + '/js/**/*.js',
			dest: assets + '/js',
		},
		images: {
			dir: base.src + '/img',
			src: base.src + '/img/**/*',
			dest: assets + '/img',
			icon: base.src + '/img/meta/favicon-180.png',
		},
		sprite: {
			src: base.src + '/sprite/**/*.svg',
			dest: assets + '/img',
		},
		static: {
			src: base.src + '/static/**/*',
			dest: assets + '/static',
		},
	};


// Clean

gulp.task('clean', function(cb) {
	return del(assets, cb);
});


// Styles

gulp.task('styles', function() {
	return gulp
		.src(paths.styles.src)
		.pipe(plugins.sourcemaps.init())
		.pipe(
			plugins.sass({ includePaths: ['node_modules'] })
				.on('error', plugins.notify.onError({
					title: 'Sass Error',
					subtitle: [
						'<%= error.relativePath %>',
						'<%= error.line %>',
					].join(':'),
					message: '<%= error.messageOriginal %>',
					open: 'file://<%= error.file %>',
					onLast: true,
					icon: paths.images.icon,
				}))
		)
		.pipe(plugins.cleanCss({ restructuring: false }))
		.pipe(plugins.autoprefixer({
			browsers: config.autoprefixer,
			cascade: false,
		}))
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest(paths.styles.dest));
});


// JS

gulp.task('scripts.lint', function() {
	return gulp
		.src(paths.scripts.dir + '/site/**/*.js')
		.pipe(plugins.eslint())
		.pipe(plugins.eslint.format(summary))
		.pipe(
			plugins.eslint.failOnError()
				.on('error', plugins.notify.onError({
					title: 'JavaScript Error',
					subtitle: [
						'<%= options.relative(options.cwd, error.fileName) %>',
						'<%= error.lineNumber %>',
					].join(':'),
					message: '<%= error.message %>',
					open: 'file://<%= error.fileName %>',
					templateOptions: {
						relative: path.relative,
						cwd: process.cwd(),
					},
					icon: paths.images.icon,
				}))
		)
		.pipe(plugins.eslint.failAfterError());
});

gulp.task('scripts.lint.full', function() {
	return gulp
		.src(paths.scripts.dir + '/site/**/*.js')
		.pipe(plugins.eslint())
		.pipe(plugins.eslint.format())
		.pipe(plugins.eslint.failAfterError());
});

gulp.task('scripts.site', function() {
	return gulp
		.src([
			paths.scripts.dir + '/site/core.js',
			paths.scripts.dir + '/site/modules/*.js',
			paths.scripts.dir + '/site/pages/*.js',
		])
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.concat('site.js'))
		.pipe(plugins.changed(paths.scripts.dest))
		.pipe(plugins.uglify())
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('scripts.plugins', function() {
	return gulp
		.src([
			paths.scripts.dir + '/plugins/*.js',
			paths.scripts.dir + '/plugins/jquery/*.js',
		])
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.concat('plugins.js'))
		.pipe(plugins.changed(paths.scripts.dest))
		.pipe(plugins.uglify())
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('scripts.libs', function() {
	return gulp
		.src(paths.scripts.dir + '/libs/*.js')
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.concat('libs.js'))
		.pipe(plugins.changed(paths.scripts.dest))
		.pipe(plugins.uglify())
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('scripts', ['scripts.lint'], function() {
	gulp.start('scripts.site', 'scripts.plugins', 'scripts.libs');
});


// Images

gulp.task('images', function() {
	var
		optimised = plugins.filter('**/*.{jpg,png}', { restore: true }),
		svgs = plugins.filter('**/*.svg', { restore: true });

	return gulp
		.src(paths.images.src)
		.pipe(optimised)
		.pipe(plugins.tinypngCompress({
			key: config.tinypngKey,
			sigFile: paths.images.dest + '/.tinypng',
			summarise: true,
		}))
		.pipe(optimised.restore)
		.pipe(svgs)
		.pipe(plugins.svgmin())
		.pipe(svgs.restore)
		.pipe(gulp.dest(paths.images.dest));
});


// SVG sprite

gulp.task('sprite', function() {
	return gulp
		.src(paths.sprite.src)
		.pipe(plugins.svgSprite({
			mode: {
				symbol: {
					dest: '',
					sprite: 'sprite.svg',
				},
			},
			svg: {
				xmlDeclaration: false,
				doctypeDeclaration: false,
			},
		}))
		.pipe(gulp.dest(paths.sprite.dest));
});


// Static

gulp.task('static', function() {
	return gulp
		.src(paths.static.src)
		.pipe(gulp.dest(paths.static.dest));
});


// Watch

gulp.task('watch', function() {
	browserSync.init({
		ghostMode: { scroll: false },
		notify: false,
		open: false,
		proxy: config.url,
		port: 5757,
		files: [
			paths.styles.dest + '/**/*.css',
			paths.scripts.dest + '/**/*.js',
			paths.images.dest,
			base.public + '/**/*.{html,php}',
			'app/views/**/*.php',
			'resources/views/**/*.php',
		],
	});

	gulp.watch(paths.styles.src, ['styles']);
	gulp.watch(paths.scripts.src, ['scripts']);
	gulp.watch(paths.images.src, ['images']);
	gulp.watch(paths.sprite.src, ['sprite']);
	gulp.watch(paths.static.src, ['static']);
});

gulp.task('default', [], function() {
	gulp.start('styles', 'scripts', 'images', 'sprite', 'static');
});
