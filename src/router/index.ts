import { route } from 'quasar/wrappers';
import {
  createRouter,
  createWebHistory, NavigationGuardNext, RouteLocationNormalized,
} from 'vue-router';

import { useUserStore } from 'stores/users';
import { useOrderStore } from 'src/stores/orders';
import { useOrderDetailsStore } from 'src/stores/orderDetails';
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
    const orderStore = useOrderStore();
    const orderDetailsStore = useOrderDetailsStore();

    const isAuth = to.meta.requiresAuth;
    const isOrderDetailsLength = to.meta.orderDetailsLength;

    try {
      await userStore.authUser();

      switch (isAuth) {
        case false:
          next('/products');
          break;

        case true:
          if (isOrderDetailsLength === true) {
            try {
              await orderStore.getCurrentOrder();
              await orderDetailsStore.fetchAll(orderStore.currentOrder.id);
            } catch {
              next('/products');
              break;
            }
          }

          next();
          break;

        default:
          next();
          break;
      }
    } catch {
      if (isAuth) {
        next('/log-in');
      } else {
        next();
      }
    }
  });

  return router;
});
