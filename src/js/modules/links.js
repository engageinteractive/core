$(document.body).on('click', 'a.external, a[rel="external"], a[href$=".pdf"]', function(e){

	if( e.which !== 2 ){

		window.open($(this).attr('href'));
		e.preventDefault();

	}

});
