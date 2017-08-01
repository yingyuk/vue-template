import axios from 'axios';

const instance = axios.create({
  // baseURL: '/',
});

instance.interceptors.response.use((response) => {
  if (response.data.iRet !== 1) {
    return Promise.reject(response);
  }
  return response.data;
}, error =>
   Promise.reject(error.response));

export default instance;
