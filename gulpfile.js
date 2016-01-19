/*!
 * gulp
 * Useage
 - You need node installed if you don't already have it - https://nodejs.org/en/
 - Open Terminal
 - Run command 'npm install --global gulp'
 - Navigate to the root of your project in terminal with 'cd <path to your project>'
 - Run the command 'npm install' which installs all of the gulp plugins to the project
 - Run the command 'gulp watch'
 - You're all set and style and js changes should be auto detected
 - If you want live reload functionality just download the chrome plugin here https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en

 * $ npm install gulp-ruby-plugins.sass gulp-autoprefixer gulp-minify-css gulp-plugins.jshint gulp-concat gulp-plugins.uglify gulp-imagemin gulp-plugins.notify gulp-rename gulp-livereload gulp-cache del gulp-bower gulp-imports merge-stream --save-dev
 */

// Load plugins
var gulp = require('gulp');

var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/,
    rename: {
        'gulp-ruby-sass': 'sass'
    }
});

// Set the paths up here, for most projects you should only need to change the basePath.src
var basePaths = {
    src: 'assets/'
};

var paths = {
    scripts: {
        src: basePaths.src + 'js/',
        dest: basePaths.src + 'js-min/'
    },
    styles: {
        src: basePaths.src + 'scss/',
        dest: basePaths.src + 'css/'
    }
};

// configure the plugins.jshint task
gulp.task('plugins.jshint', function() {
  return gulp.src(paths.scripts.src+'**/*.js')
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('styles', function() {
  return plugins.sass(paths.styles.src+'*.{scss,sass}', { style: 'expanded' })
    .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions', 'IE 9'],
            cascade: false
        }))
    .pipe(plugins.notify({ message: 'Styles task running' }))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.cssnano())
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(plugins.notify({ message: 'Styles task complete' }));
});

// Takes all the files imported into core.js and merges them into js-min/core.js
gulp.task('coreimports', function() {
    gulp.src([paths.scripts.src+'core.js'])
        .pipe(plugins.imports())
        .pipe(plugins.plumber({
            errorHandler: plugins.notify.onError('Error: <%= error.message %>')
        }))
        .pipe(plugins.uglify())
        .on('error', onError)
        .pipe(gulp.dest(paths.scripts.dest));
});

// Takes all the files imported into site.js and merges them into js-min/site.js
gulp.task('siteimports', function() {
    gulp.src([paths.scripts.src+'site.js'])
        .pipe(plugins.imports())
        .pipe(plugins.plumber({
            errorHandler: plugins.notify.onError('Error: <%= error.message %>')
        }))
        .pipe(plugins.uglify())
        .on('error', onError)
        .pipe(gulp.dest(paths.scripts.dest));
});

// Takes all the files imported into plugins.js and merges them into js-min/plugins.js
gulp.task('pluginimports', function() {
    gulp.src([paths.scripts.src+'plugins.js'])
        .pipe(plugins.imports())
        .pipe(plugins.plumber({
            errorHandler: plugins.notify.onError('Error: <%= error.message %>')
        }))
        .pipe(plugins.uglify())
        .on('error', onError)
        .pipe(gulp.dest(paths.scripts.dest));
});

// Takes all the files imported into libs.js and merges them into js-min/libs.js
gulp.task('libimports', function() {
    gulp.src([paths.scripts.src+'libs.js'])
        .pipe(plugins.imports())
        .pipe(plugins.plumber({
            errorHandler: plugins.notify.onError('Error: <%= error.message %>')
        }))
        .pipe(plugins.uglify())
        .on('error', onError)
        .pipe(gulp.dest(paths.scripts.dest));
});

// Takes all the files imported into utils.js and merges them into js-min/utils.js
gulp.task('utilimports', function() {
    gulp.src([paths.scripts.src+'utils.js'])
        .pipe(plugins.imports())
        .pipe(plugins.plumber({
            errorHandler: plugins.notify.onError('Error: <%= error.message %>')
        }))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(plugins.notify({ message: 'Scripts task complete' }));
});

// Scripts - central locations which runs all of the import tasks
gulp.task('scripts', function() {
    gulp.run('pluginimports');
    gulp.run('libimports');
    gulp.run('coreimports');
    gulp.run('siteimports');
    gulp.run('utilimports');
});

function onError(err) {
  plugins.notify.onError({
        message: 'Error: <%= err %>'
    });
  console.log(err);
  this.emit('end');
}

// Install Dependencies
gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest())
});

// Clean
gulp.task('clean', function(cb) {
    del(['assets/css', 'assets/js'], cb)
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts');
});

// Watch
gulp.task('watch', function() {

  gulp.watch(paths.scripts.src+'/**/*.js', ['plugins.jshint']);

  // Watch .scss files
  gulp.watch(paths.styles.src+'/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch(paths.scripts.src+'/**/*.js', ['scripts']);

  // Create LiveReload server
  plugins.livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch('assets/**').on('change', plugins.livereload.changed);

});