import { setUser, getUser, isLogined } from 'src/assets/scripts/local-storage';
import { isiOS, isWechat } from 'src/assets/scripts/util';
import proxyRequest from 'src/api/proxy-request.js';
import router from 'src/router';

function wechatRedirect() {
  let { name, params, query, hash } = router.currentRoute;
  delete query.wechat_code;
  delete query.scope;
  const { href } = router.resolve({ name, params, query, hash });
  let { origin } = window.location;
  // snsapi_base: 静默登录, 不需要用户同意, 可以拿到用户的 token, 不能拿到用户的个人信息
  // snsapi_userinfo: 需要用户同意, 可以拿到用户的 token, 能拿到用户的个人信息
  window.location.href = `//wechat.halobear.com/token?scope=snsapi_base&back=${decodeURIComponent(origin + href)}`;
}

export function deleteUrlWechatCode(route) {
  let iniOS = isiOS();
  let inWechat = isWechat();
  let { name, params, query, hash } = route;
  delete query.wechat_code;
  delete query.scope;
  const { href } = router.resolve({ name, params, query, hash });
  if (iniOS && inWechat) {
    // 微信 iOS, url 需要 location.href 才能更新
    window.location.href = href;
    return;
  }
  router.replace({ name, params, query, hash });
}

export async function fetchWechatToken({ wechat_code }) {
  let { data: { token } } = await proxyRequest({
    url: '/wechat/authorization',
    method: "POST",
    data: {
      token: wechat_code,
    },
    transformRequest(obj) {
      const str = [];
      for (const p in obj) {
        const isObj = typeof obj[p] === 'object';
        if (isObj) {
          str.push(`${encodeURIComponent(p)}=${encodeURIComponent(JSON.stringify(obj[p]))}`);
        } else {
          str.push(`${p}=${obj[p]}`);
        }
      }
      return str.join('&');
    },
    //   transformRequest: [function (data, headers) {
    //     return $.param(data);
    // }]
  });
  setUser({ token });
}

export function wechatLogin(force) {
  if (force) { // 强制重新登录
    setUser('');
  }
  if (isLogined()) {
    return;
  }
  wechatRedirect();
}

// import { deleteUrlWechatCode, wechatLogin, fetchWechatToken } from 'src/assets/scripts/wechat-login';
