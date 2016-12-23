var x = 0,
	y = 0,
	listeners = {},
	update = function(){

		$.each(listeners, function(){
			this(x, y);
		});

	},
	onScroll = function(){

		var left = document.documentElement.scrollLeft,
			top = document.documentElement.scrollTop;

		x = left === 0 ? document.body.scrollLeft : left;
		y = top === 0 ? document.body.scrollTop : top;

		if( typeof window.requestAnimationFrame === 'function' ){

			window.requestAnimationFrame(update);

		}else{

			update();

		}

	};

$(window).on('scroll', onScroll);

onScroll();

/* eslint-disable */
$.extend($.easing, {
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
});
/* eslint-enable */

module.exports = {
	x: function(){
		return x;
	},
	y: function(){
		return y;
	},
	addListener: function(name, listener){
		listeners[name] = listener;
	},
	removeListener: function(name){
		delete listeners[name];
	},
	animate: function(top){
		$('body, html').animate({
			scrollTop: top,
		}, 500, 'easeInOutQuad');
	},
};
