let exampleIndex,
	prevHtml,
	styleguide;

const
	config = require('../config'),
	paths = {
		css: require('../utils/paths')('css'),
		styleguide: require('../utils/paths')('styleguide'),
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
	template = path.resolve(
		__dirname,
		'../..',
		path.join(
			config.root.src,
			config.tasks.styleguide.src,
			'index.html'
		)
	),

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
		node.children = node.children.filter(filterComponent);
		return node.children.length || node.components.length;
	},

	escape = (html, encode) => (
		html
			.replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;')
	);

renderer.code = (code, lang, escaped) => {
	const id = `example-${exampleIndex += 1}`;

	return [
		'<div class="sg-example">',
		'	<div class="sg-example__preview">',
		code,
		'		<div class="sg-example__button">',
		`			<label class="button button--small reveal__label" for="${id}">View Source</label>`,
		'		</div>',
		'	</div>',
		`	<input class="vh reveal__toggle" type="checkbox" id="${id}" value="" tabindex="-1">`,
		'	<div class="reveal__wrapper">',
		'		<div class="sg-example__source">',
		`			<pre class="language-${lang || 'markup'}"><code>`,
		(escaped ? code : escape(code, true)),
		'			</code></pre>',
		'		</div>',
		'	</div>',
		'</div>',
	].join('');
};

gulp.task('styleguide.parse', () => {
	styleguide = {
		variables: {},
		components: {},
	};
	exampleIndex = 0;

	return gulp
		.src(paths.css.src)
		.pipe(postcss([processor], options.postcss));
});

gulp.task('styleguide.generate', (done) => {
	const data = {
		variables: styleguide.variables,
		nodes: {
			docs: directory('src/styleguide/docs', ['.md']).children.map(parseDoc),
			vars: directory('src/styleguide/templates/vars', ['.html']).children.map(parseVar),
			components: directory('src/scss', ['.scss']).children.map(parseComponent).filter(filterComponent),
		},
	};

	ejs.renderFile(template, data, null, (error, html) => {
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
