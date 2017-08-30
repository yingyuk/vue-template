import { app, store, router } from './main.js';

import MessageBox from 'mint-ui/lib/message-box';
import 'mint-ui/lib/message-box/style.css';
import Toast from 'mint-ui/lib/toast';
import 'mint-ui/lib/toast/style.css';
import Indicator from 'mint-ui/lib/indicator';
import 'mint-ui/lib/indicator/style.css';

global.MessageBox = MessageBox;
global.Toast = Toast;
global.Indicator = Indicator;

const isDev = process.env.NODE_ENV !== 'production';

export default (context) => {
  const s = isDev && Date.now();

  return new Promise((resolve, reject) => {
    router.push(context.url);
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        reject({ code: 404 });
      }

      Promise.all(matchedComponents.map(component => component.preFetch && component.preFetch(store))).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`);

        context.state = store.state;
        resolve(app);
      }).catch(reject);
    });
  });
};
