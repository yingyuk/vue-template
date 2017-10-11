import Vue from 'vue';
import Router from 'vue-router';
import setTitle from '../assets/scripts/settitle.js'; // 设置页面标题

Vue.use(Router);

const home = () => import('src/views/home/home.vue');
const detail = () => import('src/views/detail/detail.vue');

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
    },
  }, {
    path: '*',
    redirect: {
      name: 'home',
    },
  }],
});

router.beforeEach((to, from, next) => {
  // 百度统计
  let { name, params, query } = to;
  let { href: pathname } = router.resolve({ name, params, query });
  if (typeof _hmt !== 'undefined') {
    _hmt.push(['_trackPageview', pathname]);
  }
  next();
});

router.afterEach(function (to) {
  // 设置页面标题
  if (to.meta.title) {
    setTitle(to.meta.title);
  }
});

export default router;
