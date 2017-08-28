import store from 'store';
import expirePlugin from 'store/plugins/expire';
store.addPlugin(expirePlugin);

// 用户标识
export const getUser = function () {
  const user = store.get('performance_user_token');
  return user || {};
};

export const setUser = function (token, expiration) {
  store.set('performance_user_token', token, expiration);
};

export const clearUser = function () {
  setUser('');
};

export const isLogined = function () {
  return Boolean(getUser() && getUser().token);
};
