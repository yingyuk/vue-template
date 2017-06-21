import axios from 'axios';

const instance = axios.create({
  // baseURL: '/',
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
