import eventBus from 'src/event';
// const isDev = process.env.NODE_ENV === 'development';

function callHandler(funcName, data = {}, callback = () => {}) {
  if (!funcName) {
    console.error('请输入 JSBridge 调取的方法名');
  }
  if (!window.WebViewJavascriptBridge) {
    // 如果 WebViewJavascriptBridge 还没有注入, 等待注入完成后, 再发送消息给 APP
    eventBus.$on('JSBridgeConnectSuccess', () => {
      window.WebViewJavascriptBridge.callHandler(funcName, data, callback);
    });
    return;
  }
  window.WebViewJavascriptBridge.callHandler(funcName, data, callback);
}

/**
 * 设置 APP 标题, 背景色
 * @param {Object} data
 * @param {Function} callback
 */
export function settingHeader(
  data = { title: '', backgroundColor: '' },
  callback
) {
  return new Promise((resolve, reject) => {
    if (!data.title) {
      reject(new Error('请传入标题名称'));
      return;
    }
    if (!data.backgroundColor) {
      data.backgroundColor = '#ffffff'; // 白底
    }
    if (!data.isWhite) {
      data.isWhite = '0'; // 黑字 [ 0: 黑, 1: 白]
    }
    callHandler(
      'commonAction',
      {
        action: 'settingHeader',
        data,
      },
      (...args) => {
        typeof callback === 'function' && callback.call(null, ...args);
        resolve(...args);
      }
    );
  });
}

// 登录失效
// Cookies.get('token'); 失效
export function goLogin(data = {}, callback) {
  return new Promise(resolve => {
    // 让 APP 重新登录, 跳转登录页面
    callHandler(
      'commonAction',
      {
        action: 'goLogin',
        data,
      },
      (...args) => {
        resolve(...args);
        typeof callback === 'function' && callback.call(null, ...args);
      }
    );
  });
}
