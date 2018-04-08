import 'es6-promise/auto';
import { app, store, router } from './main.js';

const isDev = process.env.NODE_ENV === 'development';

/* eslint no-underscore-dangle: 0 */
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

const asyncDataExec = (to, prevMatched = [], next = () => {}) => {
  const matched = router.getMatchedComponents(to);

  let diffed = false;
  const activated = matched.filter((comp, index) => {
    if (diffed) {
      return diffed;
    }
    diffed = prevMatched[index] !== comp;
    return diffed;
  });
  const asyncDataHooks = activated.map(comp => comp.asyncData).filter(exist => exist);

  if (!asyncDataHooks.length) {
    next();
    return;
  }

  Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
    .then(() => {
      next();
    })
    .catch(next);
};

router.onReady(curRoute => {
  if (isDev) {
    asyncDataExec(curRoute);
  }
  router.beforeResolve((to, from, next) => {
    const prevMatched = router.getMatchedComponents(from);
    asyncDataExec(to, prevMatched, next);
  });

  app.$mount('#app');
});

const { location: { hostname, protocol } } = window;

const canRegister = hostname === 'localhost' || hostname === '127.0.0.1' || protocol === 'https:';

const { SERVICE_WORKER } = process.env;

const serviceWorkerRegister = canRegister && SERVICE_WORKER && 'serviceWorker' in navigator;

if (serviceWorkerRegister) {
  navigator.serviceWorker.register('/service-worker.js');
}
