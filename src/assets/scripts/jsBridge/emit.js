import eventBus from 'src/event';

const isDev = process.env.NODE_ENV === 'development';

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
export function settingHeader(data = { title: '', backgroundColor: '' }) {
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
        resolve(...args);
      }
    );
  });
}

// 登录失效
// Cookies.get('token'); 失效
export function goLogin(data = {}) {
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
      }
    );
  });
}

/**
 * 获取定位信息
 * @return {Object}
 * {
 *   latitude: 31.3005612,
 *   longitude: 121.4496557,
 *   region_code: 310100,
 * }
 */
export function getLocation(data = {}) {
  return new Promise(resolve => {
    callHandler(
      'commonAction',
      {
        action: 'Halobear_GetLocation',
        data,
      },
      coordsStr => {
        const isStr = typeof coordsStr === 'string';
        const isObj = typeof coordsStr === 'object';
        let coordsObj = {};
        if (isStr) {
          // coordsStr:  '{"lat":"12","lng":"12","region_code":"310100"}'
          coordsObj = JSON.parse(coordsStr);
        } else if (isObj) {
          coordsObj = coordsStr;
        }
        const {
          lat,
          latitude,
          lng,
          longitude,
          region_code,
          regionCode,
          adCode,
        } = coordsObj;
        const coords = {
          latitude: lat || latitude,
          longitude: lng || longitude,
          region_code: region_code || regionCode || adCode,
        };

        if (isDev) {
          MessageBox.alert(coords);
        }
        resolve(coords);
      }
    );
  });
}
