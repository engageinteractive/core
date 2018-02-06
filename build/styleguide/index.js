const ejs = require('ejs');
const File = require('laravel-mix/src/File');
const glob = require('glob');
const syntax = require('postcss-scss');

const { assets, src } = require('../config');
const Processor = require('./Processor');

const root = new File(src('styleguide'));

const paths = {
	docs: root.append('docs').relativePath(),
	index: root.append('index.html').relativePath(),
	sass: src('scss'),
	src: src('scss/**/*.+(css|sass|scss)'),
	vars: root.append('templates/vars').relativePath(),
};
const output = new File(assets('styleguide.html'));
const processor = new Processor(root.append('templates/components/example.html'));
const postcss = require('postcss')([processor.handler]);

let prevHtml = null;

module.exports = async () => {
	prevHtml = null;
	processor.reset();

	// fetch list of sass & css files
	const filenames = glob.sync(paths.src, { nodir: true });

	// read each file and process with postcss
	await Promise.all(filenames.map((filename) => {
		const css = new File(filename).read();
		const options = {
			from: filename,
			syntax,
		};

		return postcss.process(css, options);
	}));

	// generate and store html
	const html = await new Promise((resolve, reject) => {
		ejs.renderFile(paths.index, processor.data(paths), (error, newHtml) => {
			if (error) {
				return reject(error);
			}

			return resolve(newHtml);
		});
	});

	// avoid write if nothing's changed
	if (html === prevHtml) {
		return;
	}

	output.write(html);
	prevHtml = html;
};
