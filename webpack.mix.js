const mix = require('laravel-mix');
const importer = require('node-sass-json-importer');

mix
	.browserSync({
		files: 'public/assets',
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
	})
	.webpackConfig({
		module: {
			rules: [
				{
					test: /\.scss$/,
					use: [
						{
							loader: 'sass-loader',
							options: {
								importer,
							},
						},
					],
				},
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

mix
	.sass('src/scss/main.scss', 'public/assets/css/')
	.sass('src/scss/styleguide.scss', 'public/assets/css/')
	.sass('src/scss/page/system-message.scss', 'public/assets/css/page/');

mix
	.js('src/js/site.js', 'public/assets/js/')
	.extract([
		'svg4everybody',
		'what-input',
	]);
