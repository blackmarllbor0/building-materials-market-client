import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/home', component: () => import('pages/IndexPage.vue') },
      { path: '/about-us', component: () => import('pages/AboutUs.vue') },
      { path: '/categories', component: () => import('pages/CategoriesPage.vue') },
      { path: '/log-in', component: () => import('pages/Auth/LogInPage.vue') },
      { path: '/register', component: () => import('pages/Auth/RegisterPage.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
