require('svg4everybody')();

if (!Modernizr.csspointerevents) {

	require.ensure('./simpleSelect', function(require) {

		var simpleSelect = require('./simpleSelect');

		simpleSelect($('.select select:not([multiple="multiple"])'));

	});

}
