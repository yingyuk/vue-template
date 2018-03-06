import store from 'store';
import expirePlugin from 'store/plugins/expire';

// const isDev = process.env.NODE_ENV === 'development';

store.addPlugin(expirePlugin);

// 用户标识
const USERNAME = 'vue_template_user';

// log 日志
const LOGNAME = 'vue_template_log';

const is15Day = 1000 * 60 * 60 * 24 * 15;

// ##########
// 获取用户信息
/**
 * return Object
 */
export function getUser() {
  // if (isDev) {
  //   console.warn('开发环境下, 注意这个登录 token 也会过期');
  //   return 'xxx';
  // }
  return store.get(USERNAME) || {};
}

// 保存用户信息
export function setUser(user, expiration = +new Date() + is15Day) {
  store.set(USERNAME, user, expiration);
}
// 清除用户信息
export function clearUser() {
  setUser('');
}

// 用户已经登陆
export function isLogined() {
  const user = getUser();
  return Boolean(user && user.token);
}

// ###########
// 获取日志
export function getLog() {
  return store.get(LOGNAME) || [];
}

// 清除日志
export function cleanLog() {
  store.set(LOGNAME, []);
}

function setLog(log, expiration) {
  store.set(LOGNAME, log, expiration);
}

const is10Min = 1000 * 60 * 10;

function currentTime() {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  return `${date} ${time}`;
}

function isLongTimePast(past, current) {
  const is8s = 1000 * 8;
  return current - past > is8s;
}

export function saveLog(error = '', timestamp) {
  const expiration = timestamp || new Date().getTime() + is10Min;
  const oldtime = store.getExpiration(LOGNAME); // 过期时间
  const logArr = getLog();
  if (isLongTimePast(oldtime, expiration)) {
    logArr.push('========= ');
  }
  logArr.push(`${currentTime()} ${error}`);
  setLog(logArr, expiration);
}
