let x = 0,
	y = 0;

const listeners = {},
	update = function(){

		$.each(listeners, function(){
			this(x, y);
		});

	},
	onScroll = function(){

		const left = document.documentElement.scrollLeft,
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
	get x(){
		return x;
	},
	get y(){
		return y;
	},
	addListener(name, listener){
		listeners[name] = listener;
	},
	removeListener(name){
		delete listeners[name];
	},
	animate(top){
		$('body, html').animate({
			scrollTop: top,
		}, 500, 'easeInOutQuad');
	},
};
