let width = 0,
	height = 0,
	prevWidth,
	prevHeight,
	timer = null;

const listeners = {},
	update = () => {

		prevWidth = width;
		prevHeight = height;

		width = window.innerWidth;
		height = window.innerHeight;

		$.each(listeners, function(){
			this(prevWidth !== width, prevHeight !== height);
		});

	};

$(window).on('resize', () => {

	clearTimeout(timer);
	timer = setTimeout(update, 300);

});

update();

module.exports = {
	get width(){
		return width;
	},
	get height(){
		return height;
	},
	addListener(name, listener){
		listeners[name] = listener;
	},
	removeListener(name){
		delete listeners[name];
	},
};
