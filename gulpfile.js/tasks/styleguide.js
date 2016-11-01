var
	config = require('../config'),
	paths = require('../utils/paths')('css'),
	src,
	styleguide,
	task,

	fm = require('front-matter'),
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
			var variable = decl.prop.match(/\$(\w+(-\w+)?)(--(\w+(-\w+)?))?/);

			if (!variable) {
				return;
			}

			styleguide.variables.push({
				modifier: variable && (variable[4] || false),
				path: relPath,
				type: variable[1],
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

			styleguide.examples.push({
				attributes: content.attributes,
				html: marked(content.body.trim()),
				path: relPath,
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
		variables: [],
		examples: [],
	};

	return gulp
		.src(paths.src)
		.pipe(postcss([processor], options.postcss));
});

gulp.task('styleguide.generate', function(done) {
	console.log(JSON.stringify(styleguide));
	done();
});

task = gulp.series('styleguide.parse', 'styleguide.generate');
gulp.task('styleguide', task);
module.exports = task;
