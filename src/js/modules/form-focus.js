let mouseActive = false;

const selectors = 'input, select, textarea, button, .button';

$(document.body)
	.on('mousedown', selectors, () => {

		mouseActive = true;
		setTimeout(() => {

			mouseActive = false;

		}, 100);

	})
	.on('mousedown', 'label', () => {

		mouseActive = true;

	})
	.on('focus', selectors, function(){

		const $this = $(this);

		if( !mouseActive ){

			$this.addClass('is-focused');

			if( $this.is( 'select:not([multiple="multiple"])' ) ){
				$this.parent('.simple-select').addClass('is-focused');
			}

		}

	})
	.on('blur', selectors, function(){

		const $this = $(this);

		$(this).removeClass('is-focused');

		if( $this.is( 'select:not([multiple="multiple"])' ) ){
			$this.parent('.simple-select').removeClass('is-focused');
		}

	});
