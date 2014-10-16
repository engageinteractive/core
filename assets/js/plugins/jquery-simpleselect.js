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