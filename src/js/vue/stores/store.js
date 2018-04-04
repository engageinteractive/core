import Vue from 'vue';

import createUserStore from './store.user';

export default function () {
	return {
		modules: {
			user: createUserStore(),
		},

		state: {
			homeUrl: '/',
		},

		getters: {

		},

		mutations: {
			load: function (store, globals) {
				Vue.set(store, 'homeUrl', globals['home-url']);
			},
		},

		actions: {
			load: function ({ commit }, globals) {
				commit('load', globals);
			},
		},
	};
}
