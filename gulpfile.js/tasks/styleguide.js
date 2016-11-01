var
	config = require('../config'),
	paths = require('../utils/paths')('css'),
	src,
	styleguide,
	task,

	ejs = require('ejs'),
	fm = require('front-matter'),
	fs = require('fs'),
	gulp = require('gulp'),
	marked = require('marked'),
	path = require('path'),
	postcss = require('gulp-postcss'),
	syntax = require('postcss-scss'),

	options = {
		postcss: {
			syntax: syntax,
		},
	},

	processor = function(css) {
		var relPath = path.relative(src, css.source.input.file);

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

			if (!styleguide.examples[relPath]) {
				styleguide.examples[relPath] = [];
			}

			styleguide.examples[relPath].push({
				attributes: content.attributes,
				html: marked(content.body.trim()),
			});
		});
	};

src = path.join(
	process.cwd(),
	config.root.src,
	config.tasks.css.src
);

gulp.task('styleguide.parse', function() {
	styleguide = {
		variables: {},
		examples: {},
	};

	return gulp
		.src(paths.src)
		.pipe(postcss([processor], options.postcss));
});

gulp.task('styleguide.generate', function(done) {
	fs.readFile(
		path.resolve(__dirname, '../utils/styleguide.html'),
		'utf8',
		function(err, template) {
			fs.writeFile(
				'public/styleguide.html', // TODO: replace hardcoded path
				ejs.render(template, styleguide),
				'utf8',
				done
			);
		}
	);
});

task = gulp.series('styleguide.parse', 'styleguide.generate');
gulp.task('styleguide', task);
module.exports = task;
