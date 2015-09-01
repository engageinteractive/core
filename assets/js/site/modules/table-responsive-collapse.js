;(function(){

	var defaults = {
		breakpoint: 768
	},
	count = 0;

	$.fn.tableResponsiveCollapse = function(settings){

		var instanceOptions = $.extend({}, defaults, settings);

		this.each(function(){

			var $trc = $(this);

			var options = $.extend({}, instanceOptions, $trc.data());

			$trc = {
				root: $trc,
				headers: $trc.find('thead th'),
				rows: $trc.find('tbody tr')
			};

			$trc.headers
				.each(function(){

					var $this = $(this);

					$trc.rows
						.find('td:eq(' + $this.index() + ')')
						.prepend('<span class="faux-th">' + $this.text() + '</span>');

				});

			// set section name widths
			site.resize.after['tableResponsiveCollapse-' + count] = function(){

				if( site.width == site.old.width ) return false;

				if( site.width < options.breakpoint ){

					$trc.root
						.addClass('table-responsive-collapse--collapsed');

				}else{

					$trc.root
						.removeClass('table-responsive-collapse--collapsed');

				}

			};

			site.resize.after['tableResponsiveCollapse-' + count]();

			count++;

		});

		return this;

	};

	$('.table-responsive-collapse').tableResponsiveCollapse();

}());