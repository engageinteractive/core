/**
 *  Load images using the data-img attribute
 *
 *  All settings are provided using the data tag
 *  	- Insert: Insert the image inside of the object
 *  	- Replace: Replace the contents of the object (used with insert)
 *  	- Fade: Fade in the new image
 *
 *  @return {Object}	The originally targeted object
 */
$.fn.loadImg = function(){

	this.each(function(){

		var $this = $(this),
			data = $this.data(),
			src = data.img;

		if( data.insert ){

			var $img = $('<img/>');

			$img
				.attr('src', src)
				.preload({
					src:	src,
					ready:	function(){

						if( data.replace ){

							$this.empty();

						}

						$this.append($img);

					}
				});

		}else{

			var setCss = {
				backgroundImage: 'url(' + src + ')'
			};

			$this
				.css(setCss);

		}

	});

	return this;

};
