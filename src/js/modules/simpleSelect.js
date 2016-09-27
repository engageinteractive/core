/* eslint-disable */
;(function (root, factory) {
	'use strict';

	if( typeof define === 'function' && define.amd ){
		// AMD
		define(factory);
	}else if( typeof exports === 'object' ){
		// Node, CommonJS-like
		module.exports = factory();
	}else{
		// Browser globals (root is window)
		root.simpleSelect = factory();
	}
}(this, function(){

	'use strict';

	function addClass(el, className){
		if ( el.classList ){
			el.classList.add(className);
		}else{
			el.className += ' ' + className;
		}
	}

	function removeClass(el, className){
		if( el.classList ){
			el.classList.remove(className);
		}else{
			el.className = el.className.replace(
				new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),
				' '
			);
		}
	}

	function init(select, options){
		var changeCallback = function(){
				display.textContent = select.options[select.selectedIndex].text;
			},
			focusCallback = function(){
				addClass(wrap, 'is-focused-ss');
			},
			blurCallback = function(){
				removeClass(wrap, 'is-focused-ss');
			},
			mouseenterCallback = function(){
				addClass(wrap, 'is-hovered');
			},
			mouseleaveCallback = function(){
				removeClass(wrap, 'is-hovered');
			},
			checkSelectedText = function(){
				if( display.textContent !== select.options[select.selectedIndex].text ){
					display.textContent = select.options[select.selectedIndex].text;
				}
			},
			formReset = function(){
				setTimeout(function(){
					changeCallback();
				}, 50);
			},
			wrap,
			display,
			checkSelectedTextInterval,
			form,
			elem;

		options = options || {};

		return {
			bind : function(){
				var classes;

				wrap = select.parentNode;
				addClass(wrap, options.selectClass || 'simple-select');

				display = document.createElement('span');
				addClass(display, 'simple-select__label');
				display.textContent = options.defaultText || (select.options[select.selectedIndex] ? select.options[select.selectedIndex].text : '');

				classes = select.className.split(' ');
				if( classes.length && classes[0] !== ''){
					for ( var j = 0; j < classes.length; j++ ){
						addClass(wrap, classes[j]);
					}
				}

				wrap.insertBefore(display, select.nextSibling);

				select.addEventListener('change', changeCallback);
				select.addEventListener('focus', focusCallback);
				select.addEventListener('blur', blurCallback);
				select.addEventListener('mouseenter', mouseenterCallback);
				select.addEventListener('mouseleave', mouseleaveCallback);

				// check for form reset
				elem = select;
				for ( ; elem && elem !== document && elem.nodeType === 1; elem = elem.parentNode ){
					if ( elem.tagName.toLowerCase() === 'form' ) {
						form = elem;
					}
				}
				form.addEventListener('reset', formReset);

				if( options && options.checkSelectedText === true ){
					checkSelectedTextInterval = setInterval(
						checkSelectedText,
						options.checkSelectedTextInterval || 250
					);
				}
			},
			unbind : function(){
				select.removeEventListener('mouseleave', mouseleaveCallback);
				select.removeEventListener('mouseenter', mouseenterCallback);
				select.removeEventListener('focus', focusCallback);
				select.removeEventListener('blur', blurCallback);
				select.removeEventListener('change', changeCallback);

				wrap.parentNode.removeChild(display);

				if( options && options.checkSelectedText === true ){
					clearInterval(checkSelectedTextInterval);
				}
			}
		};
	}

	return function(selects, options){
		var elements = [],
			returnObject;

		for ( var i = 0; i < selects.length; i++ ){
			elements.push(init(selects[i], options));
		}

		returnObject = {
			unbind : function(){
				for ( var i = 0; i < elements.length; i++ ){
					elements[i].unbind();
				}
			},
			bind : function(){
				for ( var i = 0; i < elements.length; i++ ){
					elements[i].bind();
				}
			},
			rebind : function(){
				for ( var i = 0; i < elements.length; i++ ){
					elements[i].unbind();
					elements[i].bind();
				}
			}
		};

		returnObject.bind();

		return returnObject;
	};

}));
