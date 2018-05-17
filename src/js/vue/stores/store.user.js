import Vue from 'vue';

export default function () {
    return {
        namespaced: true,

        state: {
            name: null,
        },

        getters: {
            isUserSignedIn: function (state) {
                return (state.name !== null);
            },
        },

        mutations: {
            load: function (store, name) {
                Vue.set(store, 'name', name);
            },
        },

        actions: {
            load: function ({ commit }, name) {
                commit('load', name);
            },
        },
    };
}
