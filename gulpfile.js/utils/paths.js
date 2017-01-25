const
	config = require('../config'),
	path = require('path'),

	src = (task, glob) => (
		path.join(
			config.root.src,
			config.tasks[task].src,
			`${glob}.+(${config.tasks[task].extensions.join('|')})`
		)
	);

module.exports = task => ({
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
	entries: () => src(task, config.tasks.scripts.entries),
});
