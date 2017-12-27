import axios from 'axios';

const instance = axios.create({
  baseURL: '/dev-prefix',
});

export default instance;
