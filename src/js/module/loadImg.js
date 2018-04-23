import preload from './preload';

const loadImg = (el) => {
	const { insert, replace, img: src } = el.dataset;

	if (!insert) {
		el.style.backgroundImage = `url(${src})`;
		return;
	}

	preload({
		src,
		ready: () => {
			const img = document.createElement('img');

			if (replace) {
				while (el.firstChild) {
					el.removeChild(el.firstChild);
				}
			}

			img.src = src;
			el.appendChild(img);
		},
	});
};

[].slice.call(document.querySelectorAll('[data-img]')).forEach(el => loadImg(el));
