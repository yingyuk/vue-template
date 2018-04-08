import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
import { sync } from 'vuex-router-sync';

import App from './App.vue';
import store from './store';
import router from './router';
import * as filters from './filters';
import mixins from './mixins';

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('src/../static/favicon.png'),
  loading: require('src/../static/favicon.png'),
  attempt: 1,
});

sync(store, router);

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.mixin(mixins);

const app = new Vue({
  router,
  store,
  ...App,
});

export { app, router, store };

if (module.hot) {
  module.hot.accept();
}
