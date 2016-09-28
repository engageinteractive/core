var width = 0,
	height = 0,
	prevWidth,
	prevHeight,
	listeners = {},
	timer = null,
	update = function(){

		prevWidth = width;
		prevHeight = height;

		width = window.innerWidth;
		height = window.innerHeight;

		$.each(listeners, function(){
			this(prevWidth !== width, prevHeight !== height);
		});

	};

$(window).on('resize', function(){

	clearTimeout(timer);
	timer = setTimeout(update, 300);

});

update();

module.exports = {
	width: function(){
		return width;
	},
	height: function(){
		return height;
	},
	addListener: function(name, listener){
		listeners[name] = listener;
	},
	removeListener: function(name){
		delete listeners[name];
	},
};
