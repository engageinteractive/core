$.fn.preload = function(settings){

	var defaults = {
		src: false,
		timeout: false,
		ready: function(){},
		error: function(){}
	};

	this.each(function(){

		var $img = $(this),
			option = $.extend(defaults, settings);

		if( !option.src )
			option.src = $img.attr('src');

		if( option.src )
			$.preload(option);

	});

	return this;

};

$.preload = function(settings){

	var defaults = {
		src: null,
		timeout: false,
		arrayItemReady: function(){},
		ready: function(){},
		error: function(){}
	};

	var option = $.extend(defaults, settings);

	var $img = $('<img/>'),
		tooSlow = false,
		complete = false;

	if( typeof option.src == 'object' ){

		var total = option.src.length,
			loaded = 0;

		for( var i = option.src.length - 1; i >= 0; i-- ){

			$.preload({
				src: option.src[i],
				ready: function(img){

					loaded++;

					option.arrayItemReady(loaded);

					if( total == loaded )
						option.ready(img,option.src);

				}
			});

		};

	}else if( option.src ){

		$img.one('load', function(){

			var img = this;

			// Timeout for Webkit
			// As the width/height of the image is 0 initially
			setTimeout(function(){

				complete = true;

				if( !tooSlow )
					option.ready(img,option.src);

			}, 0);

		})
		.one('error', function(){

			option.error();

		})
		.attr('src', option.src)
		.each(function() {

			if( this.complete ){

				$img.trigger('load');

			}

		});

		if( option.timeout ){

			setTimeout(function(){

				tooSlow = true;

				if( !complete )
					option.ready(img,option.src);

			}, option.imageTimeout);

		}

	}

};