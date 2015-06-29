//	Variables
var $core = {
	win: $(window),
	doc: $(document),
	html: $('html'),
	body: $('body')
};

var $site = {
	wrapper: $('#site-wrapper'),
	content: $('#site-content'),
	nav: {
		root: $('#site-nav'),
		inner: $('#site-nav').children('.inner'),
		toggle: $('#site-nav-toggle')
	},
	header: $('#site-header'),
	footer: $('#site-footer')
};

var site = {
	busy: [],
	resize: {
		timer: false,
		before: {},
		after: {}
	},
	width: $core.win.width(),
	height: $core.win.height(),
	old: {
		width: 0,
		height: 0
	},
	scrollTo: function(y, s){

		TweenLite
			.to(window, s, {
				scrollTo: {
					y: y
				},
				ease: Expo.easeInOut
			});

	}
};


/*--------------------------------

	Functions

--------------------------------*/

/**
 *  Updates site metrics and calls any necessary
 *  functions before and then after a browser resize.
 */
function beforeResize(){

	site.old.width = site.width;
	site.old.height = site.height;

	$.each(site.resize.before, function(){

		this();

	});

};

function afterResize(){

	site.width = $core.win.width();
	site.height = $core.win.height();

	$.each(site.resize.after, function(){

		this();

	});

};

function clearResize(time, name){

	delete site.resize[time][name];

};


/**
 *  Get a random number in a range
 */
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 *  Takes one range and converts it to
 *  another! Easy as pie! I love pie.
 */
function rangeToRange(oldVal, oldMax, oldMin, newMax, newMin){
	return ( ( ( oldVal - oldMin ) * ( newMax - newMin ) ) / ( oldMax - oldMin ) ) + newMin;
};


/*--------------------------------

	Indirect events

--------------------------------*/

$core.win.on({
	resize: function(){

		if( !site.resize.timer )
			beforeResize();

		clearTimeout(site.resize.timer);

		site.resize.timer = setTimeout(function(){

			afterResize();

			site.resize.timer = false;

		}, 300);

	}
});


/*--------------------------------

    External/internal links

--------------------------------*/

jQuery.extend( jQuery.expr[':'], {
	external: function(obj, index, meta, stack){

		return (obj.hostname != location.hostname) && /:\/\//.test($(obj).attr('href'));

	},
	internal: function(obj, index, meta, stack){

		return (obj.hostname == location.hostname) || !/:\/\//.test($(obj).attr('href'));

	}
});


/*--------------------------------

    Ready? Go!

--------------------------------*/

$core.win
	.ready(function(){

		if( !navigator.userAgent.match(/iemobile/i) )
			FastClick.attach(document.body);

		$('[data-img]').loadImg();

		$core.body
			.on('click', 'a:external:not(.internal):not(.slide), a.external', function(e){

				if( e.which != 2 ){

					window.open( $(this).attr('href') );

					e.preventDefault();

				}

			});

		if( !$('.lt-ie9').length ){
			simpleSelect($('select:not([multiple="multiple"])'), { selectClass : 'select' });
		}

	});