import Indicator from 'mint-ui/lib/indicator';
import 'mint-ui/lib/indicator/style.css';

import MessageBox from 'mint-ui/lib/message-box'
import 'mint-ui/lib/message-box/style.css'

import request from 'create-api';
import MyError from './my.error.js';
import errorHandler from './error.handler.js';
import {
  getUser,
} from 'src/assets/scripts/local.storage.js';
/**
 * 代理 HTTP 请求;
 * @param  {Object}  obj      http 请求参数
 * @param  {Boolean} loading    是否显示 loading 弹窗
 * @param  {Boolean} alertInfoError 是否弹出捕获的服务器返回的逻辑错误
 * @param  {Boolean} alertServerError 是否弹出捕获的服务器错误
 * @return {Promise}            resolve(res); res 是 http 请求的结果
 */
export default function (obj, loading = true, alertInfoError = true, alertServerError = true) {
  const isObject = typeof obj === 'object';
  if (!isObject) {
    return Promise.reject(`obj require a object, but got a ${typeof obj}!`);
  }
  const haveIndicator = typeof Indicator === 'object';
  return new Promise(async(resolve, reject) => {
    try {
      // loading && haveIndicator && Indicator.open(); // loading
      loading && Indicator.open(); // loading
      let token = getUser().token;
      const res = await request({
        ...obj,
        headers: {
          Authorization: `Bearer${token ? ` ${token}` : ''}`,
        },
      });
      const {
        iRet,
        info,
      } = res;
      if (alertInfoError === true) {
        if (iRet !== 1) {
          throw new MyError({
            response: {
              data: res,
            },
            message: info,
          });
        }
      }
      return resolve(res);
    } catch (error) { // console.log(11,error.response.data)
      // 处理服务器正常错误
      console.info(error.response);
      var isFromServe = typeof error.response.data.iRet !== 'undefined';
      if (isFromServe) {
        try {
          let iRet = error.response.data.iRet
          if (iRet === -1) {
            let href = window.location.href
            window.location.href = `http://wechat.halobear.com/token?back=${decodeURIComponent(href)}`
            return
          }
          if (alertInfoError || alertServerError) {
            MessageBox.alert(error.response.data.info)
          }
          return reject(error.response.data)
        } catch (error) {

          if (alertInfoError || alertServerError) {
            if (typeof errorHandler === 'function') {
              errorHandler(error, alertInfoError, alertServerError); // 错误处理
            } else {
              console.warn('errorHandler is not a function');
            }
          }
          return reject(error)
        }
      }

      if (alertInfoError || alertServerError) {
        if (typeof errorHandler === 'function') {
          errorHandler(error, alertInfoError, alertServerError); // 错误处理
        } else {
          console.warn('errorHandler is not a function');
        }
      }
      return reject(error); // 错误传递
    } finally {
      // loading && haveIndicator && Indicator.close(); // close loading
      loading && Indicator.close(); // close loading
    }
  });
}
