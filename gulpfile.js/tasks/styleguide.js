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
				html: content.body.trim(),
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
			html: !node.children && marked(fs.readFileSync(node.path, { encoding: 'utf8' }))
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
			vars: [],
			components: directory('src/scss').children.map(parseComponent).filter(filterComponent)
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
