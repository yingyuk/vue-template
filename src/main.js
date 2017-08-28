// import $ from 'jquery';
import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import { sync } from 'vuex-router-sync';
import * as filters from './filters';
import mixins from './mixins';

import MessageBox from 'mint-ui/lib/message-box';
import 'mint-ui/lib/message-box/style.css';
import Toast from 'mint-ui/lib/toast';
import 'mint-ui/lib/toast/style.css';
import Indicator from 'mint-ui/lib/indicator';
import 'mint-ui/lib/indicator/style.css';

global = global || window;

global.MessageBox = MessageBox;
global.Toast = Toast;
global.Indicator = Indicator;

// import 'swiper';
// import 'swiper/dist/css/swiper.min.css';

// import 'mint-ui';
// import 'mint-ui/lib/style.min.css';

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
