var
	config = require('../config'),
	paths = require('../utils/paths')('images'),
	icon,

	notify = require('gulp-notify'),
	path = require('path');

icon = path.join(paths.dest, config.tasks.images.icon);

module.exports = function(opts) {
	return notify.onError({
		title: opts.title,
		subtitle: opts.subtitle,
		message: opts.message,
		open: opts.open,
		onLast: true,
		icon: icon,
		templateOptions: {
			relative: path.relative,
			cwd: process.cwd(),
		},
	});
};
