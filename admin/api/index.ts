import request from '../utils/request';

export function login(data) {
  return request({
    url: '/mock/user/login',
    method: 'post',
    data,
  });
}

export function fetchUserInfo() {
  return request({
    url: '/mock/user/info',
    method: 'get',
  });
}

export function fetchUserList(params) {
  return request({
    url: '/mock/user/list',
    method: 'get',
    params,
  });
}
