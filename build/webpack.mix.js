const mix = require('laravel-mix');

const {
	assets,
	config: { browserSync, css, js },
	paths: { dest },
	src
} = require('./config');
const styleguide = require('./styleguide');

mix
	.browserSync(browserSync)
	.options({
		autoprefixer: css.autoprefixer,
		cleanCss: css.cleanCss,
		clearConsole: false,
	})
	.setPublicPath(dest)
	.webpackConfig({
		module: {
			rules: [
				{
					enforce: 'pre',
					exclude: /node_modules/,
					loader: 'eslint-loader',
					options: {
						configFile: 'build/.eslintrc',
					},
					test: /\.js$/,
				},
			],
		},
	})
	.sourceMaps(false)
	.version([assets('static')])
	.extract(js.extract)
	.copyDirectory(src('static'), assets('static'))
	.then(styleguide);

css.files.forEach((filename) => {
	mix.standaloneSass(
		src(`scss/${filename}`),
		assets('css'),
		{
			importer: 'node_modules/node-sass-json-importer/dist/node-sass-json-importer.js',
			includePaths: css.includePaths,
		}
	);
});

js.files.forEach(filename => mix.js(src(`js/${filename}`), assets('js')));
