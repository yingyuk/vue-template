/* global window */
/* eslint-disable no-restricted-syntax */
function padLeftZero(str) {
  // 填充0
  // 场景: 03 月
  return `00${str}`.substr(str.length);
}

export function formatDate(date, format) {
  const time = new Date(date);
  let reply = format;
  if (!time) {
    throw new Error('require a right time');
  }
  if (/(y+)/.test(reply)) {
    // 年份替换
    reply = reply.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
  }
  // 定义 时间替换 格式
  const obj = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (const key of Object.keys(obj)) {
    if (new RegExp(`(${key})`).test(reply)) {
      // 得到匹配值
      let result = `${obj[key]}`;
      // 空位补零
      result = RegExp.$1.length === 1 ? result : padLeftZero(result);
      // 替换结果
      reply = reply.replace(RegExp.$1, result);
    }
  }
  return reply;
}

/**
 * 解析url参数
 * @return Object {id:12334}
 */
export function urlParse() {
  const url = window.location.search || '?id=12345';
  const obj = {};
  const reg = /[?&][^?&]+=[^?&]]+/g;
  const arr = url.match(reg);
  // ['?id=123454','&a=b']

  if (arr) {
    arr.forEach((item) => {
      const tempArr = item.substring(1).split('=');
      const key = decodeURIComponent(tempArr[0]);
      const val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
}
