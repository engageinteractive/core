const mix = require('laravel-mix');

const pluginOptions = {
	importer: 'node_modules/node-sass-json-importer/dist/node-sass-json-importer.js',
	includePaths: ['node_modules'],
};

mix
	.browserSync({
		files: [
			'app/**/*.php',
			'public/**/*.{html,php}',
			'public/assets',
			'resources/views/**/*.php',
			'!**/*.map',
		],
		ghostMode: false,
		notify: false,
		open: false,
		port: 5757,
		proxy: 'core.dev.com',
	})
	.options({
		autoprefixer: {
			options: {
				// browsers: [],
				cascade: false,
			},
		},
		clearConsole: false,
		// cleanCss: {},
		fileLoaderDirs: {
			images: 'assets/img',
		},
	})
	.setPublicPath('./public')
	.webpackConfig({
		module: {
			rules: [
				{
					enforce: 'pre',
					exclude: /node_modules/,
					loader: 'eslint-loader',
					options: {},
					test: /\.js$/,
				},
			],
		},
	})
	.sourceMaps(false);

if (mix.inProduction()) {
	mix.version();
}

mix
	.standaloneSass('src/scss/main.scss', 'public/assets/css/', pluginOptions)
	.standaloneSass('src/scss/styleguide.scss', 'public/assets/css/', pluginOptions)
	.standaloneSass('src/scss/page/system-message.scss', 'public/assets/css/page/', pluginOptions);

mix
	.js('src/js/site.js', 'public/assets/js/')
	.extract([
		'svg4everybody',
		'what-input',
	]);

mix
	.copyDirectory('src/static', 'public/assets/static');
