const isDev = process.env.NODE_ENV === 'development';

function serverError(response = {}) {
  const { status } = response;
  const isServerError = status !== 200;
  if (isServerError) {
    const codeStrategy = {
      400: '400 错误的请求!',
      401: '401 登录信息失效!',
      403: '403 禁止访问!',
      404: '404 没有找到服务!',
      405: '405 错误的请求方法!',
      408: '408 请求超时!',
      409: '409 发生冲突!',
      414: '414 请求数据量太大!',
      422: '422 数据错误!',
      500: '500 服务器错误!',
      501: '501 服务器不支持!',
      502: '502 错误的连接!',
      503: '503 服务器暂停服务!',
      504: '504 连接超时!',
    };
    let message = codeStrategy[status] || `${status || '未知'} 错误`;
    if (isDev) {
      console.error(response);
      message = JSON.stringify(response);
    }
    if (status === 401) {
      // goLogin(); // APP 重新登录
      // wechatLogin(); // 微信授权
    }
    return Promise.reject(message);
  }
  return response;
}

function infoError(response = {}) {
  const { data = {} } = response;
  const { iRet, info } = data;
  const isUserError = iRet !== 1 && info;
  if (isUserError) {
    return Promise.reject(info);
  }
  return response;
}

function codeError(response) {
  const isError = Boolean(response);
  if (isError) {
    const message = response.message || '错误';
    return Promise.reject(message);
  }
  return response;
}

/**
 * 职责链模式, 错误处理
 * @param  { Object} error      错误
 * @param  { Boolean} alertError 是否弹出错误
 */
export default response =>
  Promise.resolve(response)
    .then(infoError)
    .then(serverError)
    .then(codeError)
    .catch(message => message);
