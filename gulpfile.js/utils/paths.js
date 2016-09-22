var
	config = require('../config'),
	path = require('path'),

	scriptsSrc = function(name) {
		return config.tasks.scripts.files
			.find(function(file) { return file.name === name; }).src
			.map(function(src) {
				return path.join(
					config.root.src,
					config.tasks.scripts.src,
					name,
					src + '.+(' + config.tasks.scripts.extensions.join('|') + ')'
				);
			});
	};

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
		scripts: scriptsSrc,
		lint: function() {
			return config.tasks.scripts.files
				.filter(function(file) { return file.lint; })
				.map(function(file) { return scriptsSrc(file.name); })
				.reduce(function(a, b) { return a.concat(b); });
		},
	};
};
