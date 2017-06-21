import axios from 'axios';

const instance = axios.create({
    // 在服务器端, 默认是请求 80 端口,
    // 可以将baseURL设置成 网址
  baseURL: 'http://localhost:3000',
});

instance.interceptors.response.use((response) => {
  if (response.data.iRet !== 1) {
    console.warn('API 返回错误码', response.data.status, response.data.msg);
  }
  return response.data;
}, (error) => {
  console.warn('API 连接错误', Error);
  return Promise.reject(error);
});

export default instance;
