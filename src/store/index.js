import Vue from 'vue';
import Vuex from 'vuex';

import * as types from './mutation-types';
import API from '../api';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    account: {
      email: '',
      firstname: '',
      lastname: '',
      initials: ''
    },
    space: {
      used: 0,
      allocated: 0
    },
    counters: {
      files: 0,
      folders: 0,
      size: 0
    }
  },
  getters: {
    spaceUsage(state) {
      return state.space.allocated > 0
        ? Math.round(state.space.used / state.space.allocated * 100)
        : 0;
    }
  },
  mutations: {
    [types.SET_ACCOUNT](state, account) {
      state.account = account;
    },
    [types.SET_SPACE_USAGE](state, space) {
      state.space = space;
    },
    [types.INC_FILE_COUNTER](state, n) {
      state.counters.files += n !== undefined ? n : 0;
    },
    [types.INC_FOLDER_COUNTER](state, n) {
      state.counters.folders += n !== undefined ? n : 0;
    },
    [types.INC_SIZE_COUNTER](state, n) {
      state.counters.size += n !== undefined ? n : 0;
    },
    [types.RESET_COUNTERS](state) {
      state.counters = Object.keys(state.counters).reduce((obj, key) => {
        obj[key] = 0;
        return obj;
      }, {});
    }
  },
  actions: {
    async [types.INIT]({ dispatch }) {
      dispatch(types.FETCH_ACCOUNT);
      dispatch(types.FETCH_SPACE_USAGE);
    },
    async [types.FETCH_ACCOUNT]({ commit }) {
      const account = await API.getAccount();
      commit(types.SET_ACCOUNT, account);
    },
    async [types.FETCH_SPACE_USAGE]({ commit }) {
      const space = await API.getSpaceUsage();
      commit(types.SET_SPACE_USAGE, space);
    }
  },
  strict: process.env.NODE_ENV !== 'production'
});

export default store;
