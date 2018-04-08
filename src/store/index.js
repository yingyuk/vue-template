// 组装模块并导出 store 的地方
import Vue from 'vue';
import Vuex from 'vuex';

import home from './modules/home';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home,
    user,
  },
  strict: process.env.NODE_ENV !== 'production', // 严格模式
});
