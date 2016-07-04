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

				$(this).addClass('focused');

			}

		})
		.on('blur', selectors, function() {

			$(this).removeClass('focused');

		});

}());
