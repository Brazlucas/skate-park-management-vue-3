import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router';

import Home from '../modules/Home/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: () => import('../modules/Auth/components/form/login-form.component.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../modules/Auth/Register/components/register-form.component.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/rentals',
    name: 'rental-list',
    component: () => import('../modules/Rental/components/list/rental-list.component.vue'),
  },
  {
    path: '/skate-parks',
    name: 'skate-park-list',
    component: () => import('../modules/SkatePark/components/list/skate-park-list.component.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
