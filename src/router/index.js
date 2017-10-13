import Vue from 'vue';
import Router from 'vue-router';
import store from '../store'; // vuex
import setTitle from '../assets/scripts/settitle.js'; // 设置页面标题
import { wechatLogin, fetchWechatToken, deleteUrlWechatCode } from 'src/assets/scripts/wechat-login';

Vue.use(Router);

const home = () =>
  import('src/views/home/home.vue');
const detail = () =>
  import('src/views/detail/detail.vue');

const router = new Router({
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
    meta: {
      title: '首页',
    },
  }, {
    path: '/detail',
    name: 'detail',
    component: detail,
    meta: {
      title: '详情页',
      requireWechatLogin: true,
    },
  }, {
    path: '*',
    redirect: {
      name: 'home',
    },
  }],
});

router.beforeEach(async (to, from, next) => {
  const { query, meta } = to;
  // 微信登录
  const { wechat_code } = query;
  if (wechat_code) { // 刚从微信授权跳转过来
    await fetchWechatToken({ wechat_code });
    return deleteUrlWechatCode(to);
  }
  const { title, requireWechatLogin } = meta;
  if (requireWechatLogin) {
    const force = false;
    await wechatLogin(force, to);
  }
  // 设置标题
  if (title) {
    setTitle(title);
  }
  next();
});

router.afterEach((route) => {
  const { name, params, query, hash, meta } = route;
  const { href } = router.resolve({ name, params, query, hash });
  if (typeof _hmt !== 'undefined') {
    _hmt.push(['_trackPageview', href]); // 百度统计
  }
  store.commit('closeModal');// 关闭弹窗
});

export default router;
