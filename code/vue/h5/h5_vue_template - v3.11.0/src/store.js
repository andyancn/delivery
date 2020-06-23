import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    num: 10,
    JsCode: '033Er4G30BiorJ1aB3E30pbHF30Er4GF',
    currentUser: null,
    isLogin: false
  },
  getters: {
    getCurrentUser(state) {
      return state.currentUser;
    }
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
  },
  actions: {
    setUser(context, user) {
      context.commit('ADD', n);
    },
    del(context, n) {
      context.commit('DEL', n);
    }
  }
});

export default store;
