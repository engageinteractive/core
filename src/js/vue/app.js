// require('./bootstrap');

const createStore = require('./stores/store').default;

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
