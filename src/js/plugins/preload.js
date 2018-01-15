// $('img.foo').preload()
// $('div.foo').preload({
// 	src: false,
// 	timeout: false,
// 	ready(){},
// 	error(){},
// })

$.fn.preload = function(settings){

	const defaults = {
		src: false,
		timeout: false,
		ready(){},
		error(){},
	};

	this.each(function(){

		const $img = $(this),
			option = $.extend(defaults, settings);

		if( !option.src ){
			option.src = $img.attr('src');
		}

		if( option.src ){
			$.preload(option);
		}

	});

	return this;

};

// $.preload({
// 	src: null,
// 	timeout: false,
// 	arrayItemReady(){},
// 	ready(){},
// 	error(){},
// })

$.preload = function(settings){

	let tooSlow = false,
		complete = false,
		total,
		loaded,
		ready,
		i;

	const defaults = {
			src: null,
			timeout: false,
			arrayItemReady(){},
			ready(){},
			error(){},
		},
		option = $.extend(defaults, settings),
		$img = $('<img/>');

	if( typeof option.src === 'object' ){

		total = option.src.length;
		loaded = 0;
		ready = function(img){

			loaded += 1;

			option.arrayItemReady(loaded);

			if( total === loaded ){
				option.ready(img, option.src);
			}

		};

		for( i = option.src.length - 1; i >= 0; i -= 1 ){

			$.preload({
				src: option.src[i],
				ready,
			});

		}

	}else if( option.src ){

		$img.one('load', function(){

			const img = this;

			// Timeout for Webkit
			// As the width/height of the image is 0 initially
			setTimeout(() => {

				complete = true;

				if( !tooSlow ){
					option.ready(img, option.src);
				}

			}, 0);

		})
		.one('error', () => {

			option.error();

		})
		.attr('src', option.src)
		.each(function(){

			if( this.complete ){
				$img.trigger('load');
			}

		});

		if( option.timeout ){

			setTimeout(() => {

				tooSlow = true;

				if( !complete ){
					option.ready(null, option.src);
				}

			}, option.imageTimeout);

		}

	}

};
