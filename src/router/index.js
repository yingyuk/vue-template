import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import home from 'src/views/home/home.vue';

export default new Router({
  mode: 'history', // ['history', 'hash']
  linkActiveClass: 'active', // active class 名称
  scrollBehavior(to, from, savedPosition) { // 后退页面时, 保留滚动位置
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
  routes: [{
    path: '/home',
    name: 'home',
    component: home,
  }, {
    path: '*',
    redirect: {
      name: 'home',
    },
  }],
});
