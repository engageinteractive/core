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
		height: e[a + 'Height'],
	};

}

/**
 *  Updates site metrics and calls any necessary
 *  functions after a browser resize.
 */

window.coreResize = function() {

	var dimensions = viewport(),
		prevWidth = core.width,
		prevHeight = core.height,
		x,
		y;

	core.width = dimensions.width;
	core.height = dimensions.height;

	x = prevWidth !== core.width;
	y = prevHeight !== core.height;

	$.each(core.resize, function() {

		this(x, y);

	});

};

window.clearCoreResize = function(name) {

	delete core.resize[name];

};


/**
 *  Get a random number in a range
 */
window.getRandomInt = function(min, max) {

	return Math.floor(Math.random() * (max - (min + 1))) + min;

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

window.core = {
	resize: {},
	resizeTimer: false,
	width: viewport().width,
	height: viewport().height,
	scroll: {
		x: 0,
		y: 0,
		update: function() {

			$.each(core.scroll.listener, function() {

				this();

			});

		},
		listener: {},
	},
};


/*--------------------------------

	Window events

--------------------------------*/

$(window).on({
	resize: function() {

		clearTimeout(core.resizeTimer);
		core.resizeTimer = setTimeout(coreResize, 300);

	},
	scroll: function() {

		var x,
			y;

		y = document.documentElement.scrollTop;
		y = y === 0 ? document.body.scrollTop : y;

		x = document.documentElement.scrollLeft;
		x = x === 0 ? document.body.scrollLeft : x;

		core.scroll.x = x;
		core.scroll.y = y;

		if (Modernizr.raf) {

			window.requestAnimationFrame(core.scroll.update);

		} else {

			core.scroll.update();

		}

	},
});
