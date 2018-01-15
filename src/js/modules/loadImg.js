// $('div.foo').loadImg();
// <div data-img="http://placehold.it/100x100">

require('./preload');

$.fn.loadImg = function(){

	this.each(function(){

		let $img = null;

		const $this = $(this),
			data = $this.data(),
			src = data.img;

		if( data.insert ){

			$img = $('<img/>');

			$img
				.attr('src', src)
				.preload({
					src,
					ready: () => {

						if( data.replace ){
							$this.empty();
						}

						$this.append($img);

					},
				});

		}else{

			$this.css({
				backgroundImage: `url(${src})`,
			});

		}

	});

	return this;

};

$('[data-img]').loadImg();
