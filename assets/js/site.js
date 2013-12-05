//	Settings
var setting = {
	mediaQuery:	{
		small: 768,
		medium: 1024,
		large: 1140,
		huge: 1300
	}
};

//	Variables
var $core = {},
	$site = {},
	site = {};

//	jQuery
$(function(){

	$core = {
		win: $(window),
		doc: $(document),
		body: $('body')
	};

	$site = {
		wrapper: $('#site-wrapper'),
		page: $('#page-wrapper')
	};

	site = {
		resize: false,
		width: $core.win.height(),
		height: $core.win.width(),
		scroll: {
			x: 0,
			y: 0
		},
		transitions: $.support.transition
	};


	/*--------------------------------

		Functions

	--------------------------------*/

	/**
	 *  Updates site metrics and calls any necessary
	 *  functions after a browser resize.
	 */
	var afterResize = function(){

		site.width = $core.win.width();
		site.height = $core.win.height();

	};


	/*--------------------------------

		Direct events

	--------------------------------*/


	/*--------------------------------

		Indirect events

	--------------------------------*/

	$core.win.on({

		resize: function(){

			clearTimeout(site.resize);

			site.resize = setTimeout(function(){

				afterResize();

			}, 200);

		},
		scroll: function(){

			site.scroll.y = document.documentElement.scrollTop;
			site.scroll.y = site.scroll === 0 ? document.body.scrollTop : site.scroll;

			site.scroll.x = document.documentElement.scrollLeft;
			site.scroll.x = site.scroll === 0 ? document.body.scrollLeft : site.scroll;

		}

	});


	/*--------------------------------

	    Ready? Go!

	--------------------------------*/

	FastClick.attach(document.body);

	$core.body.on('click', 'a:external', function(e){

		if( e.which != 2 ){

			window.open( $(this).attr('href') );

			e.preventDefault();

		}

	});

	$('select').simpleSelect();

});


/*--------------------------------

    Custom plugins

--------------------------------*/

(function($){

	$.fn.simpleSelect = function(settings) {

		// Settings
		var defaults = {
			defaultText: null,
			ready: function(){},
			click: function(){},
			change: function(){}
		};

		var o = $.extend(defaults, settings);

		return this.each(function(){

			// Objects
			var $this = $(this),
				// Are there classes
				classes = 'select ' + ($this.attr('class') ?
					$this.attr('class') : ''),
				// Set the initial text
				initial = o.defaultText === null
					? $this.find('option:selected').text()
					: o.defaultText,
				// The new select
				$s;

			// Wrap everything up
			$this
				.wrap('<span class="' + classes + '"/>');

			$s = $this
				.parent('.select');

			// Add in the other contnent
			$s
				.prepend('<span>' + initial + '</span>');

			// Sort out the original select
			$this
				.css({
					width: $s.innerWidth(),
					height: $s.innerHeight(),
					opacity: 0
				}).on({
					change: function(){

						$s.find('span')
							.text( $this.find('option:selected').text() );

						o.change.apply($this);

					},
					click: function(){

						o.click.apply($this);

					},
					focus: function(){

						$s.addClass('focus');

					},
					blur: function(){

						$s.removeClass('focus');

					},
					mouseenter: function(){

						$s.addClass('hover');

					},
					mouseleave: function(){

						$s.removeClass('hover');

					}

				});

			o.ready.apply($this);

		});

	};

})(jQuery);


/*--------------------------------

    Easing

--------------------------------*/

jQuery.extend( jQuery.easing,
{
	def: 'OutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	},
	easeSmoothFade: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	}
});


/*--------------------------------

    External/internal links

--------------------------------*/

jQuery.extend( jQuery.expr[':'],{
	external: function(obj, index, meta, stack){

		return /:\/\//.test($(obj).attr('href'));

	},
	internal: function(obj, index, meta, stack){

		return !/:\/\//.test($(obj).attr('href'));

	}
});