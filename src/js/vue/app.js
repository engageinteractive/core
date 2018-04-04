/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

// require('./bootstrap');

/* eslint-disable import/imports-first */
import createStore from './stores/store';
/* eslint-enable import/imports-first */

const Vue = require('vue');
const Vuex = require('vuex');

Vue.use(Vuex);

// Components that can appear anywhere within the App:
Vue.component('sample', require('./components/sample.vue').default);

// The App itself:
window.App = new Vue({
	el: '#app',

	store: new Vuex.Store(createStore()),

	// Components only the App can create:
	components: {
		'store-loader': require('./components/store-loader.vue').default,
	},

	mounted: function () {

		require('svg4everybody')();

	},
});
