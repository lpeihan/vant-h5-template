import axios from 'axios';
import { showToast } from 'vant';

import { loading } from '@/components';
import { CODE_SUCCESS } from '@/utils/constants';

let loadCount = 0;

const request = axios.create({
  timeout: 20000,

  loading: false,
});

request.interceptors.request.use(
  (config) => {
    if (config.loading && ++loadCount > 0) {
      loading.open();
    }

    return config;
  },
  (err) => {
    Promise.reject(err);
  },
);

request.interceptors.response.use(
  (res) => {
    const { config, data } = res;

    if (config.loading && --loadCount <= 0) {
      loading.close();
    }

    if (data.code === CODE_SUCCESS) {
      return data;
    }

    showToast(data.message);

    return Promise.reject(data);
  },
  (err) => {
    const { config } = err;

    if (config.loading && --loadCount <= 0) {
      loading.close();
    }

    showToast(err.message);

    return Promise.reject(err);
  },
);

export default request;
