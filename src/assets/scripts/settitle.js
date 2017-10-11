/**
 * 设置title，解决微信改不了title的bug
 *
 */
import { isiOS, isWechat } from 'src/assets/scripts/util';

const isServer = process.env.VUE_ENV === 'server';
export default function setTitle(title) {
  if (isServer) {
    return;
  }
  document.title = title;
  let userAgent = window.navigator.userAgent.toLowerCase();
  let iniOS = isiOS();
  let inWechat = isWechat();
  if (iniOS && inWechat) {
    let iframe = document.createElement('iframe');
    iframe.src = '//www.baidu.com/favicon.ico';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframe.onload = function () {
      setTimeout(function () {
        iframe.remove();
      }, 0)
    }
  }
}
