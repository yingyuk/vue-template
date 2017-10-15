import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import { sync } from 'vuex-router-sync';
import * as filters from './filters';
import mixins from './mixins';
import VueLazyload from 'vue-lazyload';

// import 'swiper';
// import 'swiper/dist/css/swiper.min.css';

Vue.config.productionTip = false;

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('src/../static/favicon.png'),
  loading: require('src/../static/favicon.png'),
  attempt: 1,
});

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
