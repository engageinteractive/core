$.extend($.expr[':'], {
	external: function(obj) {

		return (obj.hostname !== window.location.hostname) && /:\/\//.test($(obj).attr('href'));

	},
	internal: function(obj) {

		return (obj.hostname === window.location.hostname) || !/:\/\//.test($(obj).attr('href'));

	},
});

$(document.body).on('click', 'a:external:not(.internal), a.external', function(e) {

	if (e.which !== 2) {

		window.open($(this).attr('href'));
		e.preventDefault();

	}

});
