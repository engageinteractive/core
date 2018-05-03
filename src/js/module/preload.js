// preload({
// 	src: 'http://placehold.it/100',
// 	timeout: false,
// 	arrayItemReady: () => console.log('arrayItemReady'),
// 	ready: (img, src) => console.log('ready', img, src),
// 	error: () => console.log('error'),
// });

const preload = (settings) => {
	let complete = false;
	let tooSlow = false;

	const onArrayReady = settings.arrayItemReady || (() => {});
	const onError = settings.error || (() => {});
	const onReady = settings.ready || (() => {});

	if (typeof settings.src === 'object') {
		let loaded = 0;
		const total = settings.src.length;
		const ready = (img) => {
			loaded += 1;

			onArrayReady(loaded);

			if (loaded === total) {
				onReady(img, settings.src);
			}
		};

		settings.src.forEach(src => preload({
			src,
			ready,
		}));
	} else if (typeof settings.src === 'string') {
		const img = document.createElement('img');

		img.addEventListener('load', () => {
			setTimeout(() => {
				complete = true;

				if (!tooSlow) {
					onReady(img, settings.src);
				}

			}, 0);
		});

		img.addEventListener('error', onError);
		img.src = settings.src;

		if (settings.timeout) {
			setTimeout(() => {
				tooSlow = true;

				if (!complete) {
					onReady(null, settings.src);
				}
			}, settings.imageTimeout || 3000);
		}
	}
};

export default preload;
