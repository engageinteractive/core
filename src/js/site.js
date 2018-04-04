const ready = () => {
	require('what-input');
	require('./modules/links');
	require('./modules/polyfills');
};

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', ready);
} else {
	ready();
}
