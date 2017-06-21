import 'es6-promise/auto';
import {
  app,
  store,
  router,
} from './main.js';

// 替换 store 的状态,
// 在浏览器渲染是, 已经有了 服务器渲染的 store,
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
  app.$mount('#app');
});
