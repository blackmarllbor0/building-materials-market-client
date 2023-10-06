import { route } from 'quasar/wrappers';
import {
  createRouter,
  createWebHistory, NavigationGuardNext, RouteLocationNormalized,
} from 'vue-router';

import { useUserStore } from 'stores/users';
import routes from './routes';

export default route(() => {
  const router = createRouter({
    scrollBehavior: (to) => (to.hash ? { el: to.hash } : { top: 0, left: 0 }),
    routes,

    history: createWebHistory(process.env.VUE_ROUTER_BASE),
  });

  router.beforeEach(async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => {
    const userStore = useUserStore();

    try {
      await userStore.authUser();

      if (to.meta.requiresAuth === false) {
        next('/products');
      } else {
        next();
      }
    } catch {
      if (to.meta.requiresAuth) {
        next('/log-in');
      } else {
        next();
      }
    }
  });

  return router;
});
