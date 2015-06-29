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

						if( data.fade ){

							TweenLite
								.set($img, {
									opacity: 0
								});

							TweenLite
								.to($img, 1, {
									opacity: 1,
									ease: Cubic.easeOut,
									delay: data.delay ? data.delay : 0,
									onComplete: function(){

										$img.removeAttr('style');
										$this.removeAttr('style');

									}
								});

						}

					}
				});

		}else{

			var setCss = {
				backgroundImage: 'url(' + src + ')'
			};

			if( data.animation )
				setCss['x'] = data.animation == 'from-left' ? '-50%' : '50%';

			if( data.fade )
				setCss['opacity'] = 0;

			TweenLite
				.set($this, setCss);

			if( data.fade ){

				TweenLite
					.to($this, 1, {
						opacity: 1,
						x: 0,
						delay: data.delay ? data.delay : 0,
						ease: Cubic.easeOut
					});

			}

		}

	});

	return this;

};