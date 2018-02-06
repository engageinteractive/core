const paths = {
	src: 'src',
	dest: 'public',
	assets: 'assets',
};

const config = {
	browserSync: {
		files: [
			'app/**/*.php',
			'resources/views/**/*.php',
			'public/**/*.{html,php}',
			'public/assets',
			'!**/*.map',
		],
		ghostMode: false,
		notify: false,
		open: false,
		port: 5757,
		proxy: 'core.dev.com',
	},
	css: {
		files: [
			'main.scss',
			'styleguide.scss',
			'page/system-message.scss',
		],
		autoprefixer: {
			cascade: false,
		},
		cleanCss: {},
		includePaths: [
			'node_modules',
		],
	},
	js: {
		files: [
			'site.js',
		],
		extract: [
			'svg4everybody',
			'what-input',
		],
	},
};

module.exports = {
	src: filename => [paths.src, filename].join('/'),
	assets: filename => [paths.dest, paths.assets, filename].join('/'),
	config,
	paths,
};
