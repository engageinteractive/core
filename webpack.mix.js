const mix = require('laravel-mix');
const jsonImporter = require('node-sass-json-importer');

mix.options({
	clearConsole: false,
});

// mix.autoload({}); // TODO: check if needed

mix.webpackConfig({
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'sass-loader',
						options: {
							importer: jsonImporter,
						},
					},
				],
			},
		],
	},
});

mix.browserSync({
	files: [
		'public/assets',
	],
	ghostMode: false,
	notify: false,
	open: false,
	port: 5757,
	proxy: 'core.dev.com',
});

mix.sass('src/scss/main.scss', 'public/assets/css/');
