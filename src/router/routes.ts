import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    meta: {
      auth: true,
    },
    component: () => import('../views/home/Home.vue'),
  },
  {
    path: '/mining',
    name: 'mining',
    meta: {
      auth: true,
    },
    component: () => import('../views/mining/Mining.vue'),
  },
  {
    path: '/service',
    name: 'service',
    meta: {
      auth: true,
    },
    component: () => import('../views/service/Service.vue'),
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      auth: true,
    },
    component: () => import('../views/user/User.vue'),
  },
];

export default routes;
