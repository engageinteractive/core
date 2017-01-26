let exampleIndex,
	exampleTemplate,
	prevHtml,
	styleguide;

const
	paths = {
		css: require('../utils/paths')('css').src(), // eslint-disable-line global-require
		styleguide: require('../utils/paths')('styleguide'), // eslint-disable-line global-require
	},

	directory = require('directory-tree'),
	ejs = require('ejs'),
	fm = require('front-matter'),
	fs = require('fs'),
	gulp = require('gulp'),
	gutil = require('gulp-util'),
	marked = require('marked'),
	path = require('path'),
	postcss = require('gulp-postcss'),
	syntax = require('postcss-scss'),
	titleCase = require('title-case'),

	options = {
		postcss: {
			syntax,
		},
	},
	renderer = new marked.Renderer(),

	processor = (css) => {
		const relPath = path.relative(process.cwd(), css.source.input.file);

		css.walkDecls((decl) => {
			const
				variable = decl.prop.match(/\$(\w+(-\w+)?)(--(\w+(-\w+)?))?/),
				type = variable && variable[1];

			if (!variable || decl.value.substr(0, 1) === '$' || decl.value.match(/\W*!default/)) {
				return;
			}

			if (!styleguide.variables[type]) {
				styleguide.variables[type] = [];
			}

			styleguide.variables[type].push({
				modifier: variable && (variable[4] || false),
				value: decl.value,
			});
		});

		css.walkComments((comment) => {
			// skip non-styleguide comments
			if (comment.text.substr(0, 3) !== '---') {
				return;
			}

			const content = fm(comment.text);

			if (content.body.substr(0, 3) === '---') {
				content.body = content.body.substr(3);
			}

			if (!styleguide.components[relPath]) {
				styleguide.components[relPath] = [];
			}

			styleguide.components[relPath].push({
				attributes: content.attributes,
				html: marked(content.body.trim(), { renderer }),
			});
		});
	},

	titleCaseFilename = filename => titleCase(filename.match(/_?([^.]+)/)[1]),

	parseDoc = node => ({
		filename: titleCaseFilename(node.name),
		children: node.children ? node.children.map(parseDoc) : [],
		html: !node.children && marked(fs.readFileSync(node.path, 'utf8')),
	}),

	parseVar = node => ({
		filename: titleCaseFilename(node.name),
		children: node.children ? node.children.map(parseVar) : [],
		html: !node.children && ejs.render(fs.readFileSync(node.path, 'utf8'), styleguide.variables),
	}),

	parseComponent = node => ({
		filename: titleCaseFilename(node.name),
		components: styleguide.components[node.path] || [],
		children: node.children ? node.children.map(parseComponent) : [],
	}),

	filterComponent = (node) => {
		node.children = node.children.filter(filterComponent); // eslint-disable-line no-param-reassign
		return node.children.length || node.components.length;
	};

renderer.code = (code, lang) => {
	const id = `example-${exampleIndex += 1}`;

	return ejs.render(exampleTemplate, {
		code,
		lang,
		id,
	});
};

gulp.task('styleguide.parse', () => {
	styleguide = {
		variables: {},
		components: {},
	};
	exampleIndex = 0;
	exampleTemplate = fs.readFileSync(
		paths.styleguide.src('templates/components/example.html', false),
		'utf8'
	);

	return gulp
		.src(paths.css)
		.pipe(postcss([processor], options.postcss));
});

gulp.task('styleguide.generate', (done) => {
	const data = {
		variables: styleguide.variables,
		nodes: {
			docs: directory(paths.styleguide.src('docs', false), ['.md']).children.map(parseDoc),
			vars: directory(paths.styleguide.src('templates/vars', false), ['.html']).children.map(parseVar),
			components: directory('src/scss', ['.scss']).children.map(parseComponent).filter(filterComponent),
		},
	};

	ejs.renderFile(paths.styleguide.src('index.html', false), data, null, (error, html) => {
		if (error) {

			gutil.log(gutil.colors.red(error.message));
			done();

		} else {

			if (html === prevHtml) {
				done();
				return;
			}

			prevHtml = html;

			fs.writeFile(paths.styleguide.dest, html, 'utf8', done);

		}
	});
});

const task = gulp.series('styleguide.parse', 'styleguide.generate');
gulp.task('styleguide', task);
module.exports = task;
