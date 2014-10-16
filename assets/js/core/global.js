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
var $core = {
	win: $(window),
	doc: $(document),
	body: $('body')
};

var $site = {
	wrapper: $('#site-wrapper'),
	page: $('#page-wrapper')
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
	scroll: {
		x: 0,
		y: 0
	}
};


/*--------------------------------

	Functions

--------------------------------*/

/**
 *  Updates site metrics and calls any necessary
 *  functions before and then after a browser resize.
 */
var beforeResize = function(){

	$.each(site.resize.before, function(){

		this();

	});

};

var afterResize = function(){

	site.width = $core.win.width();
	site.height = $core.win.height();

	$.each(site.resize.after, function(){

		this();

	});

};


/**
 *  Adds/removes an item to an array, while array has contents
 *  you can check it's length to check for activity and
 *  prevent button mashing
 */
var busy = function(arr){

	for( item in arr ){

		site.busy.push(arr[item]);

	}

};

var quiet = function(arr){

	for( item in arr ){

		var i = site.busy.indexOf( arr[item] );

		if( i > -1 )
			site.busy.splice(i, 1);

	}

};

/**
 *  Get a random number in a range
 */
var getRandomInt = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 *  Takes one range and converts it to
 *  another! Easy as pie! I love pie.
 */
var rangeToRange = function(oldVal, oldMax, oldMin, newMax, newMin){
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

		}, 200);

	},
	scroll: function(){

		site.scroll.y = document.documentElement.scrollTop;
		site.scroll.y = site.scroll.y === 0 ? document.body.scrollTop : site.scroll.y;

		site.scroll.x = document.documentElement.scrollLeft;
		site.scroll.x = site.scroll.x === 0 ? document.body.scrollLeft : site.scroll.x;

	}

});


/*--------------------------------

    Easing for jQuery animate

--------------------------------*/

jQuery.extend(jQuery.easing, {
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

FastClick.attach(document.body);

$core.body
	.on('click', 'a:external:not(.internal), a.external', function(e){

		if( e.which != 2 ){

			window.open( $(this).attr('href') );

			e.preventDefault();

		}

	});

$('select').simpleSelect();