const selector = '.external, [rel="external"], [href$=".pdf"]';

document.body.addEventListener('click', (e) => {
	if (e.target.tagName !== 'A' || !e.target.matches(selector)) {
		return;
	}

	// TODO: e.which !== 2 check

	e.preventDefault();
	window.open(e.target.href);
});
