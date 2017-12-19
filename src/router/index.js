import Vue from 'vue';
import Router from 'vue-router';

import {
  wechatLogin,
  fetchWechatToken,
  deleteUrlWechatCode,
} from 'src/assets/scripts/wechat-login';
import store from 'src/store/index'; // vuex
import { saveLog } from 'src/assets/scripts/local-storage';

Vue.use(Router);

const home = () => import('src/views/home/home.vue');
const detail = () => import('src/views/detail/detail.vue');
const log = () => import('src/views/log/log.vue');
const error404 = () => import('src/views/error/404.vue');

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
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {},
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail,
      meta: {
        requireWechatLogin: true,
      },
    },
    {
      path: '/log',
      name: 'log',
      component: log,
    },
    {
      path: '/404',
      name: 'error404',
      component: error404,
    },
    {
      path: '*',
      redirect: {
        name: 'home',
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const { query, meta } = to;
  // 微信登录
  const { wechat_code: wechatCode } = query;
  if (wechatCode) {
    // 刚从微信授权跳转过来
    await fetchWechatToken({ wechat_code: wechatCode });
    deleteUrlWechatCode(to);
    return;
  }
  const { requireWechatLogin } = meta;
  if (requireWechatLogin) {
    const forceLogin = false;
    await wechatLogin(forceLogin, to);
  }
  next();
});

router.afterEach(route => {
  const { name, params, query, hash } = route;
  const { href } = router.resolve({ name, params, query, hash });
  if (typeof _hmt !== 'undefined') {
    _hmt.push(['_trackPageview', href]); // 百度统计
  }
  saveLog(`进入${name}页面`);
  store.commit('closeModal'); // 切换路由, 关闭弹窗
});

export default router;
