import axios from 'axios';

const instance = axios.create({});

instance.interceptors.response.use(
  response => {
    if (response.data.iRet !== 1) {
      console.warn('API 返回错误码', response.data.status, response.data.msg);
      return Promise.reject(response);
    }
    return response.data;
  },
  error => Promise.reject(error.response || error)
);

export default instance;
