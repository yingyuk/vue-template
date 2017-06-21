/**
 * 自定义错误
 * @param {string} message 错误信息
 */
function MyError(message) {
  this.type = 'user';
  this.message = message || 'Error';
  this.stack = (new Error()).stack;
}
MyError.prototype = Object.create(Error.prototype);
MyError.prototype.constructor = MyError;

export default MyError;
