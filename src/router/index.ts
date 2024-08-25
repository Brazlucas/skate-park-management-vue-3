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
    meta: { requiresAuth: false },
    component: () => import('../modules/Auth/components/form/login-form.component.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: { requiresAuth: false },
    component: () => import('../modules/Auth/Register/components/form/register-form.component.vue'),
  },
  {
    path: '/home',
    name: 'home',
    meta: { requiresAuth: true },
    component: Home,
  },
  {
    path: '/rentals',
    name: 'rental-list',
    meta: { requiresAuth: true },
    component: () => import('../modules/Rental/components/list/rental-list.component.vue'),
  },
  {
    path: '/skate-parks',
    name: 'skate-park-list',
    meta: { requiresAuth: true },
    component: () => import('../modules/SkatePark/components/list/skate-park-list.component.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
