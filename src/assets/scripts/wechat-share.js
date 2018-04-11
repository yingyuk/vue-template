import axios from 'axios';

import { isWechat } from 'src/assets/scripts/util';

import shareImage from 'src/assets/fileloaderassets/share.png';

const isServer = process.env.VUE_ENV === 'server';

// 使用方法
/* import wechatShare from 'src/assets/scripts/wechat-share.js';

beforeMount() {
  wechatShare({
    title: '分享标题',
    imgUrl: 'https://xxxx.png',
    desc: '分享内容',
    link: window.location.href,
  });
} */

const debug = false;
const jsApiList = ['onMenuShareAppMessage', 'onMenuShareTimeline'];

const defaultData = {
  title: '默认分享标题', // 分享标题
  desc: '默认分享内容', // 分享描述
  link: isServer ? '' : window.location.origin, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  imgUrl: isServer ? '' : window.location.origin + shareImage, // 分享图标
  type: 'link', // 分享类型,music、video 或 link，不填默认为link
  dataUrl: '', // 如果 type 是 music 或 video，则要提供数据链接，默认为空
  success() {}, // 用户确认分享后执行的回调函数
  cancel() {}, // 用户取消分享后执行的回调函数
};

function loadSDK() {
  return new Promise((resolve, reject) => {
    const loaded = typeof wx !== 'undefined';
    if (loaded) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = '//res.wx.qq.com/open/js/jweixin-1.2.0.js';
    script.onload = resolve;
    script.onerror = reject;
    document.head.append(script);
  });
}

// 获取微信签名
async function getWechatConfig() {
  const { origin, pathname, search } = window.location;
  const encodeURL = encodeURIComponent(origin + pathname + search);
  const { data } = await axios({
    method: 'get',
    // 不写 http, https 协议
    url: '//wechat.halobear.com/token/getWechat',
    params: {
      url: encodeURL,
    },
  });
  /* const data = {
    appId: 'wxb43a4c82b5203c21',
    nonceStr: 'yhFuI31bnRZkW6gj',
    timestamp: 1523355137,
    url: 'http://wechat.halobear.com/token/getWechat',
    signature: '496285e039a3b743b4e702a8279f157341be223f',
  }; */
  return Object.assign(data, {
    debug,
    jsApiList, // 必填，需要使用的JS接口列表
  });
  /* {
    // 若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    // 开启调试模式, 调用的所有 api 的返回值会在客户端 alert 出来
    debug: true,
    appId: '', // 必填，公众号的唯一标识
    timestamp: '', // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '', // 必填，签名
    jsApiList: [], // 必填，需要使用的JS接口列表
  } */
}

// 微信分享
export default function wechatShare(shareDate) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!isWechat) {
        // 非微信浏览器 或者 服务器渲染时, 都会走这步
        resolve('非微信浏览器');
        return;
      }
      // 同时获取 微信签名, 和 微信 JS-SDK
      const [wechatConfig] = await Promise.all([getWechatConfig(), loadSDK()]);

      wx.config(wechatConfig);

      const shareConfig = Object.assign(
        {},
        defaultData,
        shareDate || {
          link: window.location.href,
        }
      );

      const { title, link, imgUrl, success, cancel, desc, type, dataUrl } = shareConfig;

      const timeLineConfig = {
        title, // 分享标题
        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success, // 用户确认分享后执行的回调函数
      };

      const appMsgConfig = {
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        type, // 分享类型,music、video 或 link，不填默认为link
        dataUrl, // 如果 type 是 music 或 video，则要提供数据链接，默认为空
        success, // 用户确认分享后执行的回调函数
        cancel, // 用户取消分享后执行的回调函数
      };
      wx.ready(() => {
        wx.onMenuShareTimeline(timeLineConfig);
        wx.onMenuShareAppMessage(appMsgConfig); // 分享给朋友
      });
    } catch (error) {
      reject(error);
    }
  });
}
