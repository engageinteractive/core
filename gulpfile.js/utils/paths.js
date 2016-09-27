var
	config = require('../config'),
	path = require('path'),

	src = function(task, glob) {
		return path.join(
			config.root.src,
			config.tasks[task].src,
			glob + '.+(' + config.tasks[task].extensions.join('|') + ')'
		);
	};

module.exports = function(task) {
	return {
		src: src(task, ['/**/*']),
		dest: path.join(
			config.root.public,
			config.root.dest,
			config.tasks[task].dest
		),
		public: path.join(
			'/',
			config.root.dest,
			config.tasks[task].dest,
			'/'
		),
		entries: function() {
			return src(task, config.tasks.scripts.entries);
		},
	};
};
