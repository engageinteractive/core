module.exports = {

	states: {
		active: 'is-active',
		fixed: 'is-fixed',
		hidden: 'is-hidden',
		loading: 'is-loading',
	},

	block(name){
		if( !name ){
			throw new Error('Empty block name.');
		}

		return {

			event(event){
				return `${name}:${event}`;
			},

			selector(element){
				return `.js-${name}${element ? `__${element}` : ''}`;
			},

		};
	},

};
