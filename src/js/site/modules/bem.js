window.bem = {

	states: {
		active: 'is-active',
		hidden: 'is-hidden',
		loading: 'is-loading',
	},

	event: function(_block, _event) {

		return _block + ':' + _event;

	},

	selector: function(_block, _element) {

		return '.js-' + _block + (_element ? ('__' + _element) : '');

	},

};
