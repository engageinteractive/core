const ready = () => {
	require('what-input');
	require('./module/links');
	require('./module/polyfills');
};

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', ready);
} else {
	ready();
}
