import { app, store, router } from './main.js';

const isDev = process.env.NODE_ENV !== 'production';

export default context => {
  const s = isDev && Date.now();

  return new Promise((resolve, reject) => {
    const { url } = context;
    const { fullPath } = router.resolve(url).route;
    if (fullPath !== url) {
      const ret = { url: fullPath };
      reject(ret);
      return;
    }
    router.push(context.url);
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        const ret = { code: 404 };
        reject(ret);
        return;
      }

      const asyncDataArr = matchedComponents.map(({ asyncData }) =>
        asyncData &&
          asyncData({
            store,
            route: router.currentRoute,
          }));
      Promise.all(asyncDataArr)
        .then(() => {
          isDev && console.info(`data pre-fetch: ${Date.now() - s}ms`);
          context.state = store.state;
          resolve(app);
        })
        .catch(reject);
    });
  });
};
