var
	config = require('../config'),
	notify = require('gulp-notify'),
	icon = require('path').join(require('../utils/paths')('bitmap').dest, config.tasks.bitmap.icon);

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
