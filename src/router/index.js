import Vue from 'vue';
import Router from 'vue-router';

import store from 'src/store/index'; // vuex
import { saveLog } from 'src/assets/scripts/local-storage';
import analytics from 'src/router/analytics';

import routes from 'src/router/routes';

Vue.use(Router);

const router = new Router({
  mode: 'history', // ['history', 'hash']
  linkActiveClass: 'active', // active class 名称
  scrollBehavior(to, from, savedPosition) {
    // 后退页面时, 保留滚动位置
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
  routes,
});

router.beforeEach(async (to, from, next) => {
  const { name, meta } = to;
  const { requireLogin } = meta;
  if (name === 'login') {
    return next();
  }
  const needLogin = requireLogin && !store.getters.user.isLogin;
  if (needLogin) {
    return next({
      name: 'login',
      params: { to },
    });
  }
  return next();
});

router.afterEach(route => {
  const { name } = route;
  analytics(route); // 页面统计
  saveLog(`进入${name}页面`);
});

export default router;
