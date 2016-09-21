var
	config = require('../config'),
	path = require('path');

module.exports = function(task) {
	return {
		src: path.join(
			config.root.src,
			config.tasks[task].src,
			'/**/*.{' + config.tasks[task].extensions + '}'
		),
		dest: path.join(
			config.root.dest,
			config.tasks[task].dest
		),
	};
};
