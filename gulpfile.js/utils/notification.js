var
	config = require('../config'),
	notify = require('gulp-notify'),
	paths = require('../utils/paths')('images'),
	icon = require('path').join(paths.dest, config.tasks.images.icon);

module.exports = function(opts) {
	return notify.onError({
		title: opts.title,
		subtitle: opts.subtitle,
		message: opts.message,
		open: opts.open,
		onLast: true,
		icon: icon,
	});
};
