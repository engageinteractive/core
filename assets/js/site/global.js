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
	header: $('#site-header'),
	footer: $('#site-footer')
};

var site = {
	resize: {
		timer: false,
		after: {}
	},
	width: viewport().width,
	height: viewport().height
};


/*--------------------------------

	Functions

--------------------------------*/


/**
 *  Returns a width and height for the browser
 *  viewport. These sizes match Media Queries
 */
function viewport(value){

	var e = window,
		a = 'inner';

	if( !( 'innerWidth' in window ) ){

		a = 'client';
		e = document.documentElement || document.body;

	}

	return {
		width: e[ a + 'Width' ],
		height: e[ a + 'Height' ]
	}

};

/**
 *  Updates site metrics and calls any necessary
 *  functions after a browser resize.
 */

function afterResize(){

	var viewport = viewport();

	site.width = viewport.width;
	site.height = viewport.height;

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

		clearTimeout(site.resize.timer);
		site.resize.timer = setTimeout(afterResize, 300);

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

Modernizr
	.load({
		test: Modernizr.touch && !navigator.userAgent.match(/iemobile/i),
		yep: '/assets/js/libs/fastclick.js',
		complete: function(){

			if( Modernizr.touch && !navigator.userAgent.match(/iemobile/i) )
				FastClick.attach(document.body);

		}
	});

$('[data-img]').loadImg();

$site.content.fitVids();

$core.body
	.on('click', 'a:external:not(.internal), a.external', function(e){

		if( e.which != 2 ){

			window.open( $(this).attr('href') );

			e.preventDefault();

		}

	});

if( !$('.lt-ie9').length )
	simpleSelect($('select:not([multiple="multiple"])'), { selectClass : 'select' });