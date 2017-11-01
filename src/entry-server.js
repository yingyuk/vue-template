import MessageBox from 'mint-ui/lib/message-box';
import 'mint-ui/lib/message-box/style.css';
import Toast from 'mint-ui/lib/toast';
import 'mint-ui/lib/toast/style.css';
import Indicator from 'mint-ui/lib/indicator';
import 'mint-ui/lib/indicator/style.css';

global.MessageBox = MessageBox;
global.Toast = Toast;
global.Indicator = Indicator;

const { app, store, router } = require('./main.js'); // 使用 require, 确保在 MessageBox 加载完之后

const isDev = process.env.NODE_ENV !== 'production';

export default (context) => {
  const s = isDev && Date.now();

  return new Promise((resolve, reject) => {
    const { url } = context;
    const { fullPath } = router.resolve(url).route;
    if (fullPath !== url) {
      return reject({ url: fullPath });
    }
    router.push(context.url);
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        reject({ code: 404 });
      }

      Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
        store,
        route: router.currentRoute,
      }))).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`);

        context.state = store.state;
        resolve(app);
      }).catch(reject);
    });
  });
};
