import $ from 'jquery';
import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import { sync } from 'vuex-router-sync';
import * as filters from './filters';
import mixins from './mixins';

// lib
// import 'jquery';
//  import 'src/assets/countdown/jquery.countdown.js';

import '../node_modules/swiper/dist/css/swiper.min.css';
import 'swiper';
import '../node_modules/mint-ui/lib/style.min.css';

// font-size
import { rem } from './assets/scripts/rem'; // rem

rem();

Vue.config.productionTip = false; // 关闭开发模式的警告提示;

// 同步加载 路由和状态仓库
// 同时把路由存储到状态仓库
sync(store, router);

// 注册 filters.
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.mixin(mixins);

// 创建 app 的实例
// 注入 组件,路由,状态仓库
const app = new Vue({
  router,
  store,
  ...App,
});

// 注意, 这个时候 还没有把 实例替换到 HTML节点上
export { app, router, store };
