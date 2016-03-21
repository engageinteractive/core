/* global simpleSelect */

/*--------------------------------

	Functions

--------------------------------*/

/**
 *  Returns a width and height for the browser
 *  viewport. These sizes match Media Queries
 */
function viewport() {
	var e = window;
	var a = 'inner';

	if (!('innerWidth' in window)) {
		a = 'client';
		e = document.documentElement || document.body;
	}

	return {
		width: e[a + 'Width'],
		height: e[a + 'Height']
	};
}

/**
 *  Updates site metrics and calls any necessary
 *  functions after a browser resize.
 */

window.siteResize = function() {
	var dimensions = viewport();

	site.width = dimensions.width;
	site.height = dimensions.height;

	$.each(site.resize, function() {
		this();
	});
};

window.clearSiteResize = function(name) {
	delete site.resize[name];
};


/**
 *  Get a random number in a range
 */
window.getRandomInt = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};


/**
 *  Takes one range and converts it to
 *  another! Easy as pie! We love pie.
 */
window.rangeToRange = function(oldVal, oldMax, oldMin, newMax, newMin) {
	return (((oldVal - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin;
};


/*--------------------------------

	Set globals

--------------------------------*/

window.$core = {
	win: $(window),
	doc: $(document),
	html: $('html'),
	body: $('body')
};

window.$site = {
	wrapper: $('#site-wrapper'),
	content: $('#site-content'),
	header: $('#site-header'),
	footer: $('#site-footer')
};

window.site = {
	resize: {},
	resizeTimer: false,
	width: viewport().width,
	height: viewport().height,
	scroll: {
		x: 0,
		y: 0,
		update: function() {
			var x;
			var y;

			y = document.documentElement.scrollTop;
			y = y === 0 ? document.body.scrollTop : y;

			x = document.documentElement.scrollLeft;
			x = x === 0 ? document.body.scrollLeft : x;

			site.scroll.x = x;
			site.scroll.y = y;

			$.each(site.scroll.listener, function() {
				this();
			});
		},
		listener: {}
	}
};


/*--------------------------------

	Indirect events

--------------------------------*/

$core.win.on({
	resize: function() {
		clearTimeout(site.resizeTimer);
		site.resizeTimer = setTimeout(siteResize, 300);
	},
	scroll: function() {
		if (Modernizr.raf) {
			requestAnimationFrame(site.scroll.update);
		} else {
			site.scroll.update();
		}
	}
});


/*--------------------------------

    External/internal links

--------------------------------*/

jQuery.extend(jQuery.expr[':'], {
	external: function(obj) {
		return (obj.hostname !== location.hostname) && /:\/\//.test($(obj).attr('href'));
	},
	internal: function(obj) {
		return (obj.hostname === location.hostname) || !/:\/\//.test($(obj).attr('href'));
	}
});


/*--------------------------------

    Ready? Go!

--------------------------------*/

$('[data-img]').loadImg();

$core.body.on('click', 'a:external:not(.internal), a.external', function(e) {
	if (e.which !== 2) {
		window.open($(this).attr('href'));
		e.preventDefault();
	}
});

if (!$('.lt-ie9').length) {
	simpleSelect($('select:not([multiple="multiple"])'), { selectClass: 'select' });
}
