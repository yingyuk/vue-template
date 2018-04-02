import { getUser } from 'src/assets/scripts/local-storage.js';

const user = getUser();

// 初始状态
const state = {
  isLogin: !!user.token,
  token: user.token,
};

// 读取数据
const getters = {
  user(state) {
    return state;
  },
};

// 逻辑响应
const actions = {};

// 数据改变
const mutations = {
  setUserToken(state, token) {
    state.token = token;
    state.isLogin = !!token;
  },
};

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
