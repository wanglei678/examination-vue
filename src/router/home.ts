import { RouteRecordRaw } from 'vue-router';

const homeRouter: Array<RouteRecordRaw> = [
  {
    path: '/user',
    name: 'user',
    component: () => import('@views/User/index.vue')
  },
  {
    path: '/videos',
    name: 'videos',
    component: () => import('@views/Videos/index.vue')
  },
  {
    path: '/questionsEasy',
    name: 'questionsEasy',
    component: () => import('@views/Questions/index.vue')
  },
  {
    path: '/questionsMiddle',
    name: 'questionsMiddle',
    component: () => import('@views/Questions/index.vue')
  },
  {
    path: '/questionsHard',
    name: 'questionsHard',
    component: () => import('@views/Questions/index.vue')
  },
  {
    path: '/easyOperate',
    name: 'easyOperate',
    component: () => import('@views/Operare/EasyOperate/index.vue')
  },
  {
    path: '/middleMonitorOperate',
    name: 'middleMonitorOperate',
    component: () => import('@views/Operare/MiddleMonitorOperate/index.vue')
  },
  {
    path: '/middleMaintenanceOperate',
    name: 'middleMaintenanceOperate',
    component: () => import('@views/Operare/MiddleMaintenanceOperate/index.vue')
  },
  {
    path: '/base',
    name: 'base',
    component: () => import('@views/Questions/index.vue')
  },
];

export default homeRouter;
