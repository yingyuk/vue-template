// import MessageBox from 'mint-ui/lib/message-box';
// import 'mint-ui/lib/message-box/style.css';

import { wechatLogin } from 'src/assets/scripts/wechat-login';

function serverError(response) {
  const isServerError = response && response.status && response.status !== 200;
  if (isServerError) {
    const status = response.status;
    const codeStrategy = {
      400: '错误的请求!',
      401: '未授权!',
      403: '禁止访问!',
      404: '没有找到服务!',
      405: '错误的请求方法!',
      408: '请求超时!',
      409: '发生冲突!',
      414: '请求数据量太大!',
      422: '数据错误!',
      500: '服务器错误!',
      501: '服务器不支持!',
      502: '错误的连接!',
      503: '服务器暂停服务!',
      504: '连接超时!',
    };
    const message = codeStrategy[status] || '服务器错误!';
    if (status === 401) {
      wechatLogin(); // 微信授权
    }
    return Promise.reject({ message, type: 'server' });
  }
  return arguments[0];
}

function infoError(response) {
  const isUserError = response && response.data && response.data.iRet !== 1 && response.data.info;
  if (isUserError) {
    const message = response.data.info;
    return Promise.reject({ message, type: 'info' });
  }
  return arguments[0];
}

function codeError(response) {
  const isError = Boolean(response);
  if (isError) {
    const message = response.message || '错误';
    return Promise.reject({ message, type: 'code' });
  }
  return arguments[0];
}

function errorHandler({ message, type }, { alertInfoError, alertServerError }) {
  const ret = { message, alert: null };
  if (type === 'server' && alertServerError) {
    ret.alert = MessageBox(message);
  } else if (type === 'info' && alertInfoError) {
    ret.alert = MessageBox(message);
  }
  console.error(message);
  return ret;
}
/**
 * 职责链模式, 错误处理
 * @param  { Object} error      错误
 * @param  { Boolean} alertError 是否弹出错误
 */
export default function (response, { alertInfoError, alertServerError }) {
  return Promise.resolve(response)
    .then(infoError)
    .then(serverError)
    .then(codeError)
    .catch(data => errorHandler(data, { alertInfoError, alertServerError }));
}
