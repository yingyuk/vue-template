import store from 'store';
import expirePlugin from 'store/plugins/expire';

store.addPlugin(expirePlugin);

// 用户标识
const USERNAME = 'vue_template_user';

// log 日志
const LOGNAME = 'vue_template_log';

// ##########
// 获取用户信息
export function getUser() {
  const user = store.get(USERNAME);
  return user || {};
}

// 保存用户信息
export function setUser(user, expiration) {
  store.set(USERNAME, user, expiration);
}
// 清除用户信息
export function clearUser() {
  setUser('');
}
// 用户已经登陆
export function isLogined() {
  return Boolean(getUser() && getUser().token);
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
