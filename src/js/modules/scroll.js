let x = 0,
	y = 0;

const listeners = {},
	update = () => Object.keys(listeners).forEach(name => listeners[name](x, y)),
	onScroll = () => {

		const left = document.documentElement.scrollLeft,
			top = document.documentElement.scrollTop;

		x = left === 0 ? document.body.scrollLeft : left;
		y = top === 0 ? document.body.scrollTop : top;

		if( typeof window.requestAnimationFrame === 'function' ){

			window.requestAnimationFrame(update);

		}else{

			update();

		}

	};

window.addEventListener('scroll', onScroll);

onScroll();

module.exports = {
	get x(){
		return x;
	},
	get y(){
		return y;
	},
	addListener(name, listener){
		listeners[name] = listener;
	},
	removeListener(name){
		delete listeners[name];
	},
};
