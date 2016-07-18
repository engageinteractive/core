;(function(){

	var defaultTC = {
		target: 'next',
		className: 'vh'
	};

	$core.body
		.on('click', '.toggle-class', function(e){

			e.preventDefault();

			var $this = $(this),
				data = $this.data(),
				target = data.target ? data.target : defaultTC.target,
				className = data.className ? data.className : defaultTC.className;

			if( target === 'next' ){

				$this.next().toggleClass(className);

			}else if( target === 'prev' ){

				$this.prev().toggleClass(className);

			}else if( target === 'parent' ){

				$this.parent().toggleClass(className);

			}else if( $(target).length ){

				$(target).toggleClass(className);

			}else{

				console.log('Toggle-class fail');

			}

		});

}());