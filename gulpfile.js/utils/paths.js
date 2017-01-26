const
	config = require('../config'),
	join = require('path').join;

module.exports = (task) => {
	const publicPath = join(config.root.dest, config.tasks[task].dest);

	return {
		src: (paths = '**/*', _extension = true) => {
			const path = join(
				config.root.src,
				config.tasks[task].src,
				paths
			);
			let extension = _extension;

			if (extension === true) {
				extension = config.tasks[task].extensions.join('|');
			}

			if (extension) {
				extension = `.+(${extension})`;
			}

			return `${path}${extension || ''}`;
		},
		dest: join(
			config.root.public,
			publicPath
		),
		public: `/${publicPath}/`,
	};
};
