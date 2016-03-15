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
            src:  base.src + '/scss/**/*.scss',
            dest: assets + '/css'
        },
        scripts: {
            src: base.src + '/js/**',
            dest: assets + '/js',
            destFiles: assets + '/js/**/*',
            precompiled: {
                root: assets + '/js/precompiled',
                files: assets + '/js/precompiled/**'
            }
        },
        images: {
            src:  base.src + '/img/**/*',
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

    return gulp.src(paths.styles.src)
        .pipe(plugins.notify({ message: paths.scripts.precompiled.root }))
        // .pipe(plugins.notify({ message: 'Styles task running' }))
        .pipe(plugins.sass({ errLogToConsole: true, outputStyle: 'expanded' }))
        .pipe(plugins.autoprefixer({ browsers: ['last 2 versions', 'IE 9'], cascade: false }))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.cleanCss())
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest))
        // .pipe(plugins.notify({ message: 'Styles task complete' }))
        .pipe(browserSync.stream());

});


// Images

gulp.task('images', function() {

    var optimised = plugins.filter('**/*.{jpg,png}', { restore: true });

    return gulp.src(paths.images.src)
        .pipe(plugins.changed(paths.images.dest))
        .pipe(optimised)
        .pipe(plugins.tinypng('5_gZs_VCSFhHU28xGAVSm8o_JbT0Gpum'))
        .pipe(optimised.restore)
        .pipe(gulp.dest(paths.images.dest))
        .pipe(browserSync.stream());

});


// JS

gulp.task('plugins.jshint', function() {
  return gulp.src(paths.scripts.src + '**/*.js')
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', function() {

    return gulp.src([
            paths.scripts.src + '/libs.js',
            paths.scripts.src + '/plugins.js',
            paths.scripts.src + '/utils.js',
            paths.scripts.src + '/site.js'
        ])
        .pipe(plugins.imports())
        .pipe(plugins.uglify())
        .on('error', onError)
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream());

});

function onError(err) {
    plugins.notify.onError({
        message: 'Error: <%= err %>'
    });
    console.log(err);
}

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
        // .on('change', browserSync.reload);

    gulp.watch(paths.scripts.src + '/**/*.js', ['plugins.jshint']);

    gulp.watch(paths.scripts.src, ['scripts']);

});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});