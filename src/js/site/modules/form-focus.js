(function() {

	var
		mouseActive = false,
		selectors = 'input, select, textarea, button, .button';

	$core.body
		.on('mousedown', selectors, function() {

			mouseActive = true;
			setTimeout(function() {

				mouseActive = false;

			}, 100);

		})
		.on('mousedown', 'label', function() {

			mouseActive = true;

		})
		.on('focus', selectors, function() {

			if (mouseActive === false) {

				var $this = $(this);

				$this.addClass('focused');

				if( $this.is('select:not([multiple="multiple"])') ){
					$this.parent('.simple-select').addClass('focused');
				}

			}

		})
		.on('blur', selectors, function() {

			var $this = $(this);

			$(this).removeClass('focused');

			if( $this.is('select:not([multiple="multiple"])') ){
				$this.parent('.simple-select').removeClass('focused');
			}

		});

}());
