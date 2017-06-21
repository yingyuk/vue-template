import {
  Indicator,
} from 'mint-ui';
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
  return new Promise(async (resolve, reject) => {
    try {
      // loading && haveIndicator && Indicator.open(); // loading
      loading && Indicator.open(); // loading
      let res;
      if (ONLINE) {
        res = await request({
          ...obj,
          headers: {
            Authorization: `Bearer ${getUser().token}`,
          },
        });
      } else if (obj.url == '/hotel') {
        res = await $.getJSON({
          url: `${LOCAL_PATH}jsons/hotel.json`,
        });
      } else {
        res = await $.getJSON({
          url: `${LOCAL_PATH}jsons/v2${obj.url}.json`,
        });
      }
      const {
        iRet,
        info,
      } = res;
      if (alertInfoError === true) {
        if (iRet !== 1) {
          throw new MyError(info);
        }
      }
      return resolve(res);
    } catch (error) {
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
