/* global simpleSelect */

if (!Modernizr.csspointerevents) {
	simpleSelect($('.select select:not([multiple="multiple"])'));
}
