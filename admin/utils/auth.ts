import { useUserStore } from '../store/user';
import storage from '../utils/storage';

const TOKEN = 'token';

export function hasRole(roles) {
  const userStore = useUserStore();

  if (isLogin()) {
    return userStore.userInfo.roles.some((role) => roles?.includes(role));
  }

  return false;
}

export function isLogin() {
  return !!getToken();
}

export function getToken() {
  return storage.getItem(TOKEN);
}

export function setToken(token) {
  storage.setItem(TOKEN, token);
}

export function clearToken() {
  storage.removeItem(TOKEN);
}
