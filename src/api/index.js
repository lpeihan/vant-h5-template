import request from '@/utils/request';

export function req(data) {
  return request({
    url: '/api/v1/portal-open/req',
    method: 'POST',
    data,
  });
}

export function addActivity(data) {
  return request({
    url: '/api/v1/portal-open/addActivity',
    method: 'POST',
    data,
  });
}

export function getActivityList(data) {
  return request({
    url: '/api/v1/portal-open/userActivity/list',
    method: 'POST',
    data,
  });
}

export function getUserBalance(data) {
  return request({
    url: '/api/v1/portal-open/userBalanceActivity',
    method: 'POST',
    data,
  });
}

export function getUserAsset(data) {
  return request({
    url: '/api/v1/portal-open/userAsset/query',
    method: 'POST',
    data,
  });
}

export function userAssetToOperate(data) {
  return request({
    url: '/api/v1/portal-open/userAsseToperate',
    method: 'POST',
    loading: true,
    data,
  });
}

export function getUserAssetList(data) {
  return request({
    url: '/api/v1/portal-open/userAssetHistory/list',
    method: 'POST',
    data,
  });
}

export function cancelAsset(data) {
  return request({
    url: '/api/v1/portal-open/cancleAsset',
    method: 'POST',
    data,
  });
}

export function fetchSystemConfigApi() {
  return request({
    url: '/api/v1/portal-open/sys/config',
    method: 'post',
  });
}
