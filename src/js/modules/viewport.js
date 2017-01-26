let width = 0,
	height = 0,
	prevWidth,
	prevHeight,
	timer = null;

const breakpoints = {},
	listeners = {},
	variables = require('json!../../variables.json'),
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

Object.keys(variables.breakpoints).forEach((name) => {
	let value = variables.breakpoints[name];

	if( variables['em-media-queries'] ){
		value /= variables['browser-default-font-size'] || 16;
	}

	breakpoints[name] = value;
});

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
	mq(name, extremum = 'min', property = 'width'){
		let value = breakpoints[name];

		if( !value ){
			throw new Error(`Unkown breakpoint: ${name} is not defined`);
		}

		if( extremum === 'min' ){
			value -= variables['em-media-queries'] ? 0.01 : 1;
		}

		const unit = variables['em-media-queries'] ? 'em' : 'px';

		return Modernizr.mq(`only screen and (${extremum}-${property}: ${value}${unit})`);
	},
};
