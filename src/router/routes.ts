import { RouteRecordRaw } from 'vue-router';
import homeRouter from './home';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@views/Home/index.vue'),
    redirect: '/user',
    children: homeRouter
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@views/Login/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@views/404.vue')
  }
];

export default routes;
