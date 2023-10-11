<template>
  <q-btn
    :icon="matShoppingBasket"
    color="none"
    dense
    fab-mini
    unelevated
    :label="orderDetailsCount"
    @click="open('right')"
  />

  <q-dialog
    v-model="dialog"
    :position="position"
  >
    <div
      class="column"
    >
      <q-pull-to-refresh
        style="max-height: 600px;"
      >
        <shopping-basket-card
          v-for="({id, productId, quantity, positionNumber}) in sortByPositionNumber"
          :id="id"
          :key="id"
          :product-id="productId"
          :quantity="quantity"
          :position-number="positionNumber"
        />

        <q-btn-group style="background-color: red;">
          <default-btn
            bg-color="red"
            color="white"
            :title="`Place an order - ${getTotalPrice}$`"
            style="width: auto"
            @click="registerOrder"
          />

          <default-btn
            bg-color="red"
            color="white"
            :title="`Clear Basket`"
            style="width: auto;"
            @click="deleteAllOrderDetails"
          />
        </q-btn-group>
      </q-pull-to-refresh>
    </div>
  </q-dialog>
</template>

<script lang="ts" setup>
import { matShoppingBasket } from '@quasar/extras/material-icons';
import { useOrderDetailsStore } from 'stores/orderDetails';
import {
  onMounted, ref, watch,
} from 'vue';
import { storeToRefs } from 'pinia';
import { isAxiosError } from 'axios';
import { useUserStore } from 'stores/users';
import { useOrderStore } from 'stores/orders';
import { useRouter } from 'vue-router';
import DefaultBtn from '../Buttons/DefaultBtn.vue';
import ShoppingBasketCard from './ShoppingBasketCard.vue';

const router = useRouter();

const orderDetailsStore = useOrderDetailsStore();
const { getCount, sortByPositionNumber, getTotalPrice } = storeToRefs(orderDetailsStore);

const userStore = useUserStore();
const { userIsAuth } = storeToRefs(userStore);

const orderStore = useOrderStore();
const { orders, currentOrder } = storeToRefs(orderStore);

const dialog = ref<boolean>(false);
const position = ref<'top' | 'right'>('right');

const orderDetailsCount = ref<string>('');

const open = (pos: 'top' | 'right') => {
  if (userIsAuth.value && getCount.value > 0) {
    position.value = pos;
    dialog.value = true;
  } else {
    router.push('/log-in');
  }
};

onMounted(async () => {
  try {
    if (userIsAuth.value) {
      await orderStore.getCurrentOrder();

      await orderDetailsStore.fetchAll(currentOrder.value.id);

      orderDetailsCount.value = getCount.value.toString();
    }
  } catch (error) {
    if (userIsAuth.value) {
      orderDetailsCount.value = '0';
    }

    if (isAxiosError(error)) {
      console.error(error);
    }
  }
});

const deleteAllOrderDetails = () => {
  sortByPositionNumber.value.forEach(async ({ id }) => {
    await orderDetailsStore.deleteById(currentOrder.value.id, id);
  });

  dialog.value = false;
  orderDetailsCount.value = '0';
};

const registerOrder = () => {
  router.push('/order-register');
};

watch(() => orders.value.length, () => {
  orderDetailsStore.fetchAll(orders.value[0].id);
});

watch(() => userIsAuth.value, async (value) => {
  if (value) {
    await orderDetailsStore.fetchAll(currentOrder.value.id);

    orderDetailsCount.value = getCount.value.toString();
  } else {
    orderDetailsCount.value = '';
  }
});

watch(() => getCount.value, (value) => {
  if (value === 0) {
    dialog.value = false;
  }

  orderDetailsCount.value = value.toString();
});
</script>

<style lang="scss" scoped>
@import "src/css/app";

.order-detail {
  gap: 1rem;
}

button {
  @include link(18px);
}
</style>
