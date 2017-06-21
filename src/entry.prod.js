import 'es6-promise/auto';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import registerEvents from 'serviceworker-webpack-plugin/lib/browser/registerEvents';
import applyUpdate from 'serviceworker-webpack-plugin/lib/browser/applyUpdate';
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

// service worker
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  // navigator.serviceWorker.register('/sw.js');
  const registration = runtime.register();
  registerEvents(registration, {
    onInstalled: () => {
      console.info('onInstalled');
    },
    onUpdateReady: () => {
      console.info('onUpdateReady');
    },
    onUpdating: () => {
      console.info('onUpdating');
    },
    onUpdateFailed: () => {
      console.info('onUpdateFailed');
    },
    onUpdated: () => {
      console.info('onUpdated');
    },
  });
} else {
  console.info('serviceWorker not available');
}
