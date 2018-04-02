import { setUser, isLogined } from 'src/assets/scripts/local-storage';
import { isiOS, isWechat } from 'src/assets/scripts/util';
import request from 'src/http/index';
import router from 'src/router';

function wechatRedirect(route) {
  const { name, params, query, hash } = route;
  const newQuery = Object.assign({}, query); // 复制一份, 避免改动了 路由的数据
  delete newQuery.wechat_code;
  delete newQuery.scope;
  const { href } = router.resolve({ name, params, query: newQuery, hash });
  const { origin } = window.location;
  const backUrl = decodeURIComponent(origin + href);
  // snsapi_base: 静默登录, 不需要用户同意, 可以拿到用户的 token, 不能拿到用户的个人信息
  // snsapi_userinfo: 需要用户同意, 可以拿到用户的 token, 能拿到用户的个人信息
  // window.location.href = `//wechat.halobear.com/token?scope=snsapi_base&back=${backUrl}`;
  window.location.href = `//wechat.halobear.com/token?scope=snsapi_userinfo&back=${backUrl}`;
}

export function deleteUrlWechatCode(route) {
  const { name, params, query, hash } = route;
  const newQuery = Object.assign({}, query);
  delete newQuery.wechat_code;
  delete newQuery.scope;
  if (isiOS && isWechat) {
    const { href } = router.resolve({ name, params, query: newQuery, hash });
    // 微信 iOS, url 需要 location.href 才能更新
    window.location.href = href;
    return;
  }
  router.replace({ name, params, query: newQuery, hash });
}

export async function fetchWechatToken({ wechat_code: wechatCode }) {
  const { data: { token } } = await request({
    url: '/api/authorization',
    method: 'POST',
    data: {
      token: wechatCode,
    },
    transformRequest(obj) {
      return Object.entries(obj)
        .map(([key, value]) => {
          const isObj = typeof value === 'object';
          const encodeKey = encodeURIComponent(key);
          let newValue = value;
          if (isObj) {
            newValue = JSON.stringify(value);
          }
          const encodeValue = encodeURIComponent(newValue);
          return `${encodeKey}=${encodeValue}`;
        })
        .join('&');
    },
  });
  setUser({ token });
}

export function wechatLogin(force, route) {
  return new Promise((resolve, reject) => {
    if (!isWechat) {
      return reject(new Error('非微信浏览器'));
    }
    if (force) {
      // 强制重新登录
      setUser('');
    }
    if (isLogined()) {
      return resolve();
    }
    wechatRedirect(route);
    return reject(new Error('微信登录失效, 重新登录'));
  });
}
