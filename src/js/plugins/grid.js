;(function(){

	var grid = {
		breakpoints: [
			'desktop-wide',
			'desktop',
			'tablet-wide',
			'tablet',
			'tablet-small',
			'phablet',
			'phone-wide',
			'phone',
			'base'
		],
		build: {},
		readyToExport: false,
		run: function(){

			grid.readyToExport = true;

			// Populate the breakpoints object with the different components
			for( var i = grid.breakpoints.length - 1; i >= 0; i-- ){

				grid.build[ grid.breakpoints[i] ] = {
					block: [],
					columns: {
						width: [],
						push: [],
						pull: []
					},
					flush: []
				}

			}

			// Do the scan
			grid.scan.columns();
			// grid.scan.block();
			// grid.scan.flush();

		},
		scan: {
			columns: function(){

				// Gather
				$('.column')
					.each(function(){

						// Get the classes for each column and put them into an array
						var classes = $(this).attr('class').split(' '),
							options = {
								width: '-',
								push: '-push-',
								pull: '-pull-'
							};

						// Loop through the breakpoints
						for( var b = grid.breakpoints.length - 1; b >= 0; b-- ){

							// Store the object for easy access
							var bp = grid.build[grid.breakpoints[b]].columns;

							// Loop through the classes for each breakpoint
							for( var c = classes.length - 1; c >= 0; c-- ){

								$.each(options, function(o){

									var expression = grid.breakpoints[b] + options[o] + '\\d',
										re = new RegExp(expression),
										found = classes[c].match(re);

									if( found ){

										var num = parseFloat( classes[c].replace(grid.breakpoints[b] + options[o], ''));

										if( bp[o].indexOf(num) < 0 )
											bp[o].push(num);

									}

								});

							}

						}

					});

				// Sort
				$.each(grid.build, function(bp, obj){

					// Columns
					$.each(obj.columns, function(col, arr){

						arr.sort(function(a, b){
							return a - b;
						});

					});

				});

			},
			block: function(){

			},
			flush: function(){

			}
		},
		export: function(){

			if( !grid.readyToExport )
				grid.run();

			var count = 0,
				scss = '$grid-bp: (\n';

			for( var i = grid.breakpoints.length - 1; i >= 0; i-- ){

				var bp = grid.build[ grid.breakpoints[i] ];

				// Columns
				scss += '	"' + grid.breakpoints[i] + '": (\n';
				scss += '		"block": (' + bp.block + '),\n'
				scss += '		"columns": (\n'
				scss += '			"width": (' + bp.columns.width + '),\n'
				scss += '			"push": (' + bp.columns.push + '),\n'
				scss += '			"pull": (' + bp.columns.pull + ')\n'
				scss += '		),\n'
				scss += '		"flush": (' + bp.flush + ')\n'

				if( count == grid.breakpoints.length - 1 ){
					scss += '	)\n';
				}else{
					scss += '	),\n';
				}

				count++;

			}

			scss += ');';

			var $ta = $('<textarea></textarea>'),
				$darken = $('<div></div>');

			$darken
				.css({
					position: 'fixed',
					top: 0,
					left: 0,
					zIndex: 99,
					width: '100vw',
					height: '100vh',
					background: 'rgba(0,0,0,.8)'
				});

			$ta
				.html(scss)
				.css({
					fontFamily: '"Courier New",Courier,"Lucida Sans Typewriter","Lucida Typewriter",monospace',
					fontSize: 13,
					position: 'fixed',
					top: '5vmin',
					left: '5vmin',
					zIndex: 100,
					width: '90vw',
					height: '90vh'
				});

			$darken.appendTo('body');
			$ta.appendTo('body');

			return grid.message('Success!', 'Remember, remove grid.js when making your project live.');

		},
		message: function(title, body){

			var cssh = 'font-size: 16px; font-weight: bold; text-transform: uppercase; color: green;',
				cssp = 'font-size: 11px; color: grey; font-style: italic;';

			console.log('%c' + title + ' %s', cssh, '');
			console.log('%c' + body + ' %s', cssp, '');

			return '✔';

		}
	};

	window.grid = grid;

}());