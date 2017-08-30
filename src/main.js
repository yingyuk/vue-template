// import $ from 'jquery';
import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import { sync } from 'vuex-router-sync';
import * as filters from './filters';
import mixins from './mixins';

// import 'swiper';
// import 'swiper/dist/css/swiper.min.css';

Vue.config.productionTip = false;

sync(store, router);

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.mixin(mixins);

const app = new Vue({
  router,
  store,
  ...App,
});

export { app, router, store };
