var mouseActive = false,
	selectors = 'input, select, textarea, button, .button';

$(document.body)
	.on('mousedown', selectors, function(){

		mouseActive = true;
		setTimeout(function(){

			mouseActive = false;

		}, 100);

	})
	.on('mousedown', 'label', function(){

		mouseActive = true;

	})
	.on('focus', selectors, function(){

		var $this = $(this);

		if( !mouseActive ){

			$this.addClass('is-focused');

			if( $this.is( 'select:not([multiple="multiple"])' ) ){
				$this.parent('.simple-select').addClass('is-focused');
			}

		}

	})
	.on('blur', selectors, function(){

		var $this = $(this);

		$(this).removeClass('is-focused');

		if( $this.is( 'select:not([multiple="multiple"])' ) ){
			$this.parent('.simple-select').removeClass('is-focused');
		}

	});
