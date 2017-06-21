import {
  MessageBox,
} from 'mint-ui';
var codeStrategy = {
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
  505: '不支持的HTTP版本!',
};
/**
 * 错误处理
 * @param  {object} error 错误
 * @return {string}       错误信息
 */
function errorHandler(error, alertError) {
  let msg = 'Error';
  if (error && typeof error === 'object') {
    // 服务器错误
    const isServerError = error.response && error.response.status && error.response.status !== 200;
    // 用户操作错误 (iRet !== 1);
    const isUserError = error.response && error.response.data && error.response.data.iRet !== 1 && error.response.data.info;


    if (isUserError) {
      msg = error.response.data.info;
    } else if (isServerError) {
      const status = error.response.status;
      msg = codeStrategy[status] || '服务器错误!';
    } else {
      msg = error.message;
      console.error('代码错误', error.message, error); // 代码错误不打印出来;
    }
  }

  // 这里有个未解决的问题, MessageBox 打印出来是个 function, 但是 typeof MessageBox 却是 undefined;
  // console.info('MessageBox', MessageBox);
  // console.info(MessageBox instanceof Function);
  // console.info('typeof MessageBox', typeof MessageBox);
  if (alertError === true) {
    // if (typeof MessageBox === 'function') {
    return MessageBox(msg);
    // }
  }
}

export default errorHandler;
