const ready = () => {
	require('what-input');

	require('./modules/links');
	require('./modules/polyfills');

	require('./vue/app');
};

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', ready);
} else {
	ready();
}
