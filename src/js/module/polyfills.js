require('classlist-polyfill');
require('details-element-polyfill');
require('svg4everybody')();

if (!window.Element.prototype.matches) {
	window.Element.prototype.matches = window.Element.prototype.msMatchesSelector;
}
