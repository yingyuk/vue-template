import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import { sync } from 'vuex-router-sync';
import * as filters from './filters';
import mixins from './mixins';
import VueLazyload from 'vue-lazyload';
import titleMixin from 'src/mixins/title';

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
Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options;
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to,
      }).then(next).catch(next);
    } else {
      next();
    }
  },
});
Vue.mixin(titleMixin);

const app = new Vue({
  router,
  store,
  ...App,
});

export { app, router, store };
