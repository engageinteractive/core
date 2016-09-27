module.exports = function(block) {

	if (!block) {
		throw new Error('Missing block parameter.');
	}

	return {

		states: {
			active: 'is-active',
			hidden: 'is-hidden',
			loading: 'is-loading',
			fixed: 'is-fixed',
		},

		event: function(_event) {

			return block + ':' + _event;

		},

		selector: function(_element) {

			return '.js-' + block + (_element ? ('__' + _element) : '');

		},

	};

};
