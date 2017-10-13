// 组装模块并导出 store 的地方
import Vue from 'vue';
import Vuex from 'vuex';

import modal from './modules/modal'; // modal 弹窗 模块

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    modal,
  },
  strict: process.env.NODE_ENV !== 'production', // 严格模式
});
