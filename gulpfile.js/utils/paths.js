var
	config = require('../config'),

	path = require('path');

module.exports = function(task) {
	return {
		src: path.join(
			config.root.src,
			config.tasks[task].src,
			'/**/*.+(' + config.tasks[task].extensions.join('|') + ')'
		),
		dest: path.join(
			config.root.dest,
			config.tasks[task].dest
		),
		scripts: function(name, lintOnly) {
			return config.tasks.scripts.files
				.filter(function(file) { return file.name === name; })
				.filter(function(file) { return !lintOnly || file.lint; })
				.map(function(file) { return file.src; })
				.reduce(function(a, b) { return a.concat(b); }, [])
				.map(function(src) {
					return path.join(
						config.root.src,
						config.tasks.scripts.src,
						name,
						src + '.+(' + config.tasks.scripts.extensions.join('|') + ')'
					);
				});
		},
	};
};
