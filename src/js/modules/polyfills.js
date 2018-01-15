require('svg4everybody')();

if (!window.Element.prototype.matches) {
	window.Element.prototype.matches = window.Element.prototype.msMatchesSelector;
}
