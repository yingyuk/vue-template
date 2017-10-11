import store from 'store';
import expirePlugin from 'store/plugins/expire';
store.addPlugin(expirePlugin);

// 用户标识
export const getUser = function () {
  const user = store.get('vue_template_user');
  return user || {};
};

export const setUser = function (user, expiration) {
  store.set('vue_template_user', user, expiration);
};

export const clearUser = function () {
  setUser('');
};

export const isLogined = function () {
  return Boolean(getUser() && getUser().token);
};
