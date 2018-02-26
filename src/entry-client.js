import MessageBox from 'mint-ui/lib/message-box';
import 'mint-ui/lib/message-box/style.css';
import Toast from 'mint-ui/lib/toast';
import 'mint-ui/lib/toast/style.css';
import Indicator from 'mint-ui/lib/indicator';
import 'mint-ui/lib/indicator/style.css';

window.MessageBox = MessageBox;
window.Toast = Toast;
window.Indicator = Indicator;

const { app, store, router } = require('./main.js'); // 使用 require, 确保在 MessageBox 加载完之后

/* eslint no-underscore-dangle: 0 */
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
  app.$mount('#app');
});

const isLocal =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1';

const serviceWorkerRegister =
  SERVICE_WORKER &&
  (window.location.protocol === 'https:' || isLocal) &&
  'serviceWorker' in navigator;
if (serviceWorkerRegister) {
  navigator.serviceWorker.register('/service-worker.js');
}
