module.exports = {

	states: {
		active: 'is-active',
		fixed: 'is-fixed',
		hidden: 'is-hidden',
		loading: 'is-loading',
	},

	block: function(name) {
		if( !name ){
			throw new Error('Empty block name.');
		}

		return {

			event: function(event){
				return name + ':' + event;
			},

			selector: function(element){
				return '.js-' + name + (element ? ('__' + element) : '');
			},

		};
	}

};
