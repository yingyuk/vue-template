import eventBus from 'src/event';

import * as handlersObj from 'src/assets/scripts/jsBridge/handler';

const isServer = process.env.VUE_ENV === 'server';

const handlers = Object.entries(handlersObj);

// 注册事件监听
function connectBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    callback && callback(window.WebViewJavascriptBridge);
  } else {
    document.addEventListener(
      'WebViewJavascriptBridgeReady',
      () => {
        callback && callback(window.WebViewJavascriptBridge);
      },
      false
    );
  }
}

const connectSuccess = bridge => {
  // APP 成功注入 变量, 广播该事情, 用于执行注入变量前 一些待执行的任务
  eventBus.$emit('JSBridgeConnectSuccess');
  // 初始化, 告诉 APP 连接成功
  bridge.init((message, responseCallback) => {
    const data = {
      'Javascript Responds': 'ok ok!',
    };
    responseCallback && responseCallback(data);
  });

  // APP 通知 H5; 方法注册
  handlers.forEach(([eventName, eventHanlder]) => {
    bridge.registerHandler(eventName, (data, responseCallback) => {
      const responseData = {
        'Javascript Responds': `${eventName} received`,
      };
      eventHanlder(data);
      responseCallback && responseCallback(responseData);
    });
  });
};

export default function () {
  if (!isServer) {
    // 注册回调函数，第一次连接时调用 初始化函数
    connectBridge(connectSuccess);
  }
}
