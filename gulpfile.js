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
		tinypngKey: '4JMVAf6xxnmCIghoCC30WGJez6kwgX7d', // https://tinypng.com/developers
		autoprefixer: ['last 2 versions', 'IE 9']
	},

	// Dependencies
	browserSync = require('browser-sync'),
	gulp = require('gulp'),
	del = require('del'),
	plugins = require('gulp-load-plugins')(),

	// Paths
	base = {
		src: 'src',
		public: 'public'
	},
	assets = base.public + '/assets',
	paths = {
		styles: {
			src: base.src + '/scss/**/*.scss',
			dest: assets + '/css'
		},
		scripts: {
			dir: base.src + '/js',
			src: base.src + '/js/**/*.js',
			dest: assets + '/js'
		},
		images: {
			dir: base.src + '/img',
			src: base.src + '/img/**/*',
			dest: assets + '/img'
		},
		svgIcons: {
			src:  base.src + '/img/svg-icons/**/*',
			dest: assets + '/img/svg-icons'
		},
		static: {
			src: base.src + '/static/**/*',
			dest: assets + '/static'
		}
	};


// Clean

gulp.task('clean', function(cb) {
	return del(assets, cb);
});


// Styles

gulp.task('styles', function() {
	return gulp
		.src(paths.styles.src)
		.pipe(plugins.changed(paths.styles.dest))
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.sass({ errLogToConsole: true, outputStyle: 'compressed' })
				.on('error', plugins.notify.onError({
					title: 'Error compiling SCSS (see terminal)',
					icon: paths.images.dir + '/tile/favicon-152.png'
				}))
		)
		.pipe(plugins.cleanCss({ restructuring: false }))
		.pipe(plugins.autoprefixer({ browsers: config.autoprefixer, cascade: false }))
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(plugins.notify({
			message: 'Styles compiled',
			onLast: true,
			icon: paths.images.dir + '/tile/favicon-152.png'
		}));
});


// JS

gulp.task('scripts.lint', function() {
	return gulp
		.src(paths.scripts.dir + '/site/**/*.js')
		.pipe(plugins.eslint())
		.pipe(plugins.eslint.format(require('eslint-summary')))
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
			paths.scripts.dir + '/site/global.js',
			paths.scripts.dir + '/site/modules/*.js',
			paths.scripts.dir + '/site/pages/*.js'
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
			paths.scripts.dir + '/plugins/jquery/*.js'
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
	var optimised = plugins.filter('**/*.{jpg,png}', { restore: true }),
		svgs = plugins.filter('**/*.svg', { restore: true });

	return gulp
		.src(paths.images.src)
		.pipe(optimised)
		.pipe(plugins.tinypngCompress({
			key: config.tinypngKey,
			sigFile: paths.images.dir + '/.tinypng',
			summarise: true
		}))
		.pipe(optimised.restore)
		.pipe(svgs)
		.pipe(plugins.svgmin({
			plugins: [
				{
					removeDoctype: true
				}
			]
		}))
		.pipe(svgs.restore)
		.pipe(gulp.dest(paths.images.dest));
});


// SVG icon sprite

gulp.task('svg-icon-sprite', function() {
	return gulp
		.src(paths.svgIcons.src)
		.pipe(plugins.svgSprite({
			mode: {
				symbol: {
					dest:   '',
					sprite: 'sprite.svg'
				}
			},
			svg: {
				xmlDeclaration: false,
				doctypeDeclaration: false
			}
		}))
		.pipe(gulp.dest(paths.svgIcons.dest));
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
			base.public + '/**/*.html',
			base.public + '/**/*.php',
		],
	});

	gulp.watch(paths.styles.src, ['styles']);
	gulp.watch(paths.scripts.src, ['scripts']);
	gulp.watch(paths.images.src, ['images']);
	gulp.watch(paths.svgIcons.src, ['svg-icon-sprite']);
	gulp.watch(paths.static.src, ['static']);
});

gulp.task('default', [], function() {
	gulp.start('styles', 'scripts', 'images', 'svg-icon-sprite', 'static');
});
