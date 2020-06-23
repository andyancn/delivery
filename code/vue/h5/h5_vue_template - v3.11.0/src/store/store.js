import Vue from 'vue';
import user from './modules/user'
import getters from './getters'
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user
  },
  getters,
});

export default store;
