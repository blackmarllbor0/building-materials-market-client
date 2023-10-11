import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/products', component: () => import('pages/IndexPage.vue') },
      { path: '/about-us', component: () => import('pages/AboutUs.vue') },
      { path: '/categories', component: () => import('pages/CategoriesPage.vue') },
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
        children: [
          {
            path: '',
            component: () => import('pages/User/ProfilePage.vue'),
          },
          {
            path: 'change',
            component: () => import('pages/User/ChangeUserData.vue'),
          },
        ],
      },

    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
