import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/products', component: () => import('pages/IndexPage.vue') },
      { path: '/about-us', component: () => import('pages/AboutUs.vue') },
      { path: '/categories', component: () => import('pages/CategoriesPage.vue') },
      // { path: '/'}
      {
        path: '/log-in',
        meta: { requiresAuth: false },
        component: () => import('pages/Auth/LogInPage.vue'),
      },
      {
        path: '/register',
        meta: { requiresAuth: false },
        component: () => import('pages/Auth/RegisterPage.vue'),
      },
      {
        path: '/profile',
        meta: { requiresAuth: true },
        component: () => import('pages/ProfilePage.vue'),
      },
      {
        path: '/profile/change',
        meta: { requiresAuth: true },
        component: () => import('pages/User/ChangeUserData.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
