import request from 'src/http/index';
import titleMixin from 'src/mixins/title';

const mixin = {
  methods: {
    /**
     * 代理 HTTP 请求;
     * @param  {Function}  func      http 请求函数
     * @param  {Boolean} loading    是否显示 loading 弹窗
     * @param  {Boolean} alertError 是否弹出捕获的错误
     * @return {Promise}            resolve(res); res 是 http 请求的结果
     */
    $http: request,
  },
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options;
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to,
      })
        .then(next)
        .catch(next);
    } else {
      next();
    }
  },
};

Object.assign(mixin, titleMixin);

export default mixin;
