(function() {

	var defaults = { breakpoint: 768 };
	var count = 0;

	$.fn.tableResponsiveCollapse = function(settings) {

		var instanceOptions = $.extend({}, defaults, settings);

		this.each(function() {

			var $trc = $(this);
			var options = $.extend({}, instanceOptions, $trc.data());

			$trc = {
				root: $trc,
				headers: $trc.find('thead th'),
				rows: $trc.find('tbody tr')
			};

			$trc.headers.each(function() {

				var $this = $(this);
				$trc.rows
					.find('td:eq(' + $this.index() + ')')
					.prepend('<span class="faux-th">' + $this.text() + '</span>');

			});

			core.resize['tableResponsiveCollapse-' + count] = function(x, y) {

				if( x === false ) return false;

				$trc.root.toggleClass(
					'table-responsive-collapse--collapsed',
					core.width < options.breakpoint
				);

			};

			core.resize['tableResponsiveCollapse-' + count]();

			count++;

		});

		return this;

	};

	$('.table-responsive-collapse').tableResponsiveCollapse();

}());
