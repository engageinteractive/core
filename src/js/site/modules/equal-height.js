(function() {

	var defaults = {
			active: 768,
		},
		count = 0;

	$.fn.equalHeight = function(method, settings) {

		var instanceOptions = $.extend({}, defaults, settings);

		this.each(function() {

			var
				$eh = $(this),
				options = $.extend({}, instanceOptions, $eh.data()),
				eh = {
					height: false,
				};

			$eh = {
				root: $eh,
				master: $eh.find('.equal-height__master'),
				children: $eh.find('.equal-height__component'),
			};

			core.resize['equalHeight-' + count] = function(x) {

				if (!x) return;

				eh.height = 0;

				$eh.children
					.css({
						minHeight: false,
					});

				if (core.width >= options.active) {

					if ($eh.master.length) {

						eh.height = $eh.master.height();

					} else {

						$eh.children
							.each(function() {

								var $this = $(this);

								eh.height = $this.height() > eh.height ? $this.outerHeight() : eh.height;

							});

					}

					$eh.children
						.css({
							minHeight: eh.height,
						});

				}

			};

			core.resize['equalHeight-' + count]();

			count += 1;

		});

		return this;

	};

	$('.equal-height').equalHeight();

	// if the content contains images that dictate the height of the content, you'll probably
	// want to use something to detect image load state such as http://imagesloaded.desandro.com/
	// var $equalHeight = $('.equal-height');

	// $equalHeight
	// 	.each(function(){

	// 		var $this = $(this);

	// 		$this.imagesLoaded(function() {
	// 			$this.equalHeight();
	// 		});

	// 	});

}());
