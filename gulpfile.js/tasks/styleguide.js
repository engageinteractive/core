var
	config = require('../config'),
	paths = {
		css: require('../utils/paths')('css'),
		styleguide: require('../utils/paths')('styleguide'),
	},
	src,
	styleguide,
	task,

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
			syntax: syntax,
		},
	},
	src = path.join(
		config.root.src,
		config.tasks.css.src
	),
	template = path.resolve(
		__dirname,
		'../..',
		path.join(
			config.root.src,
			config.tasks.styleguide.src,
			'index.html'
		)
	),
	renderer = new marked.Renderer(),

	processor = function(css) {
		var relPath = path.relative(process.cwd(), css.source.input.file);

		css.walkDecls(function(decl) {
			var
				variable = decl.prop.match(/\$(\w+(-\w+)?)(--(\w+(-\w+)?))?/),
				type = variable && variable[1];

			if (!variable) {
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

		css.walkComments(function(comment) {
			var content;

			// skip non-styleguide comments
			if (comment.text.substr(0, 3) !== '---') {
				return;
			}

			content = fm(comment.text);

			if (content.body.substr(0, 3) === '---') {
				content.body = content.body.substr(3);
			}

			if (!styleguide.components[relPath]) {
				styleguide.components[relPath] = [];
			}

			styleguide.components[relPath].push({
				attributes: content.attributes,
				html: marked(content.body.trim(), { renderer: renderer }),
			});
		});
	},

	titleCaseFilename = function(filename) {
		return titleCase(filename.match(/_?([^\.]+)/)[1]);
	},

	parseDoc = function(node) {
		return {
			filename: titleCaseFilename(node.name),
			children: node.children ? node.children.map(parseDoc) : [],
			html: !node.children && marked(fs.readFileSync(node.path, 'utf8'))
		};
	},

	parseVar = function(node) {
		return {
			filename: titleCaseFilename(node.name),
			children: node.children ? node.children.map(parseVar) : [],
			html: !node.children && ejs.render(fs.readFileSync(node.path, 'utf8'), styleguide.variables)
		};
	},

	parseComponent = function(node) {
		return {
			filename: titleCaseFilename(node.name),
			components: styleguide.components[node.path] || [],
			children: node.children ? node.children.map(parseComponent) : []
		};
	},

	filterComponent = function(node) {
		node.children = node.children.filter(filterComponent);
		return node.children.length || node.components.length;
	},

	escape = function(html, encode) {
		return html
			.replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;');
	};

renderer.code = function (code, lang, escaped) {
	var id = Math.random().toString(36).substring(7);

	return [
		'<div class="sg-example">',
			'<div class="sg-example__preview">',
				code,
				'<div class="sg-example__button">',
					'<label class="button reveal__label" for="' + id + '">View Source</label>',
				'</div>',
			'</div>',
			'<input class="vh reveal__toggle" type="checkbox" id="' + id + '" value="" tabindex="-1">',
			'<div class="reveal__wrapper">',
				'<div class="sg-example__source">',
					'<pre class="language-' + (lang || 'markup') + '"><code>',
						(escaped ? code : escape(code, true)),
					'</code></pre>',
				'</div>',
			'</div>',
		'</div>'
	].join('');
};

gulp.task('styleguide.parse', function() {
	styleguide = {
		variables: {},
		components: {}
	};

	return gulp
		.src(paths.css.src)
		.pipe(postcss([processor], options.postcss));
});

gulp.task('styleguide.generate', function(done) {
	var data = {
		variables: styleguide.variables,
		nodes: {
			docs: directory('src/styleguide/docs', ['.md']).children.map(parseDoc),
			vars: directory('src/styleguide/templates/vars', ['.html']).children.map(parseVar),
			components: directory('src/scss', ['.scss']).children.map(parseComponent).filter(filterComponent)
		}
	};

	ejs.renderFile(template, data, null, function(error, html) {
		if (error) {

			gutil.log(gutil.colors.red(error.message));
			done();

		} else {

			fs.writeFile(paths.styleguide.dest, html, 'utf8', done);

		}
	});
});

task = gulp.series('styleguide.parse', 'styleguide.generate');
gulp.task('styleguide', task);
module.exports = task;
