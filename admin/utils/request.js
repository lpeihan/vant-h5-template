import { message } from 'ant-design-vue';
import axios from 'axios';

import { getToken } from '../utils/auth';
import { CODE_SUCCESS } from '../utils/constants';

const request = axios.create({
  timeout: 20000,
});

request.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    Promise.reject(err);
  },
);

request.interceptors.response.use(
  (res) => {
    const { data } = res;

    if (data.code === CODE_SUCCESS) {
      return data;
    }

    message.error(data.message);

    return Promise.reject(data);
  },
  (err) => {
    message.error(err.message);

    return Promise.reject(err);
  },
);

export default request;
