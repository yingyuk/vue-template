import proxyRequest from '../assets/scripts/proxy.request.js';

export default {
  methods: {
    /**
     * 代理 HTTP 请求;
     * @param  {Function}  func      http 请求函数
     * @param  {Boolean} loading    是否显示 loading 弹窗
     * @param  {Boolean} alertError 是否弹出捕获的错误
     * @return {Promise}            resolve(res); res 是 http 请求的结果
     */
    fetch: proxyRequest,
  },
};
