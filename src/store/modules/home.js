// import request from 'src/http/index';
import axios from 'axios';

// 初始状态
const state = {
  loading: false,
  total: -1,
  page: 1,
  list: [],
};

// 读取数据
const getters = {};

// 逻辑响应
const actions = {
  async fetchList({ commit, state }, { isFirstFetch } = {}) {
    try {
      const len = state.list.length;
      if (isFirstFetch && len > 0) {
        return;
      }
      const isOver = len === state.total;
      if (state.loading || isOver) {
        return;
      }
      commit('setLoading', true);
      const { data: { items, total_count: total } } = await axios({
        url: 'https://api.github.com/search/repositories',
        params: {
          q: 'javascript',
          sort: 'stars',
          page: state.page,
        },
      });
      commit('saveList', { total, list: items });
    } catch (err) {
      console.error('fetchList err', err);
    } finally {
      commit('setLoading', false);
    }
  },
};

// 数据改变
const mutations = {
  saveList(state, { total, list }) {
    if (!list.length) {
      return;
    }
    state.page += 1;
    state.total = total;
    state.list = state.list.concat(list);
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
