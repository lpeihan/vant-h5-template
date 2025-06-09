import { defineStore } from 'pinia';

import { fetchUserInfo, login } from '../api';
import router from '../router';
import { clearToken, setToken } from '../utils/auth';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userInfo: null,
    };
  },
  actions: {
    async fetchUserInfo() {
      const res = await fetchUserInfo();

      this.userInfo = res.data;
    },
    async login(data) {
      const res = await login(data);

      setToken(res.data.token);

      await this.fetchUserInfo();
    },
    logout() {
      clearToken();
      this.userInfo = null;

      router.push('/user/login');
    },
  },
});
