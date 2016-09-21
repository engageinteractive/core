var
	config = require('../config'),
	path = require('path');

module.exports = function(task) {
	var extensions = config.tasks[task].extensions;

	return {
		src: function(type) {
			return path.join(
				config.root.src,
				config.tasks[task].src,
				'/**/*.+(' + (type ? extensions[type] : extensions).join('|') + ')'
			);
		},
		dest: path.join(
			config.root.dest,
			config.tasks[task].dest
		),
	};
};
