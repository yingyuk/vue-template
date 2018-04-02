const home = () => import('src/views/home/home.vue');
const login = () => import('src/views/login/index.vue');
const detail = () => import('src/views/detail/detail.vue');

const log = () => import('src/views/log/log.vue');
const error404 = () => import('src/views/error/404.vue');

export default [
  {
    path: '/home',
    alias: '/',
    name: 'home',
    component: home,
    meta: {},
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {},
  },
  {
    path: '/detail',
    name: 'detail',
    component: detail,
    meta: {
      requireLogin: true,
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
    component: error404,
  },
];
