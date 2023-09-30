import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'about-us',
        name: 'About',
        component: () => import('pages/AboutUs.vue'),
      },
    ],
  },
  {
    path: '*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
