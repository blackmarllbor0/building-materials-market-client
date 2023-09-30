import { route } from 'quasar/wrappers';
import {
  createRouter,
  createWebHistory,
} from 'vue-router';

import routes from './routes';

export default route(() => {
  const Router = createRouter({
    scrollBehavior: (to) => (to.hash ? { el: to.hash } : { top: 0, left: 0 }),
    routes,

    history: createWebHistory(process.env.VUE_ROUTER_BASE),
  });

  return Router;
});
