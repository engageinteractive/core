var
	paths = require('../utils/paths')('css'),
	task,

	gulp = require('gulp'),
	postcss = require('gulp-postcss'),
	syntax = require('postcss-scss'),

	options = {
		postcss: {
			syntax: syntax,
		},
	},

	styleguide = {
		variables: {},
		files: {},
	},

	processor = function(css) {
		css.walkDecls(function(decl) {
			var
				variable = decl.prop.match(/\$(\w+(-\w+)?)(--(\w+(-\w+)?))?/),
				type = variable && variable[1],
				parsed = {
					modifier: variable && (variable[4] || false),
					value: decl.value,
				};

			if (!variable) {
				return;
			}

			if (!styleguide.variables[type]) {
				styleguide.variables[type] = [];
			}

			styleguide.variables[type].push(parsed);
		});
	};

gulp.task('styleguide.parse', function() {
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
