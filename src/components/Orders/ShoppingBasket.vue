<template>
  <q-btn
    :icon="matShoppingBasket"
    color="none"
    dense
    fab-mini
    unelevated
    :label="getCount"
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

        <default-btn
          bg-color="red"
          color="white"
          :title="`Place an order - ${getTotalPrice}$`"
          style="width: auto;"
        />
      </q-pull-to-refresh>
    </div>
  </q-dialog>
</template>

<script lang="ts" setup>
import { matShoppingBasket } from '@quasar/extras/material-icons';
import { useOrderRequest } from 'src/requests/order';
import { useOrderDetailsStore } from 'stores/orderDetails';
import { onMounted, ref, watch } from 'vue';
import { OrderStatusEnum } from 'stores/orderStatus';
import { storeToRefs } from 'pinia';
import { isAxiosError } from 'axios';
import { useUserStore } from 'stores/users';
import { useOrderStore } from 'stores/orders';
import DefaultBtn from '../Buttons/DefaultBtn.vue';
import ShoppingBasketCard from './ShoppingBasketCard.vue';

const orderRequest = useOrderRequest();

const orderDetailsStore = useOrderDetailsStore();
const { getCount, sortByPositionNumber, getTotalPrice } = storeToRefs(orderDetailsStore);

const userStore = useUserStore();
const { currentUser } = storeToRefs(userStore);

const orderStore = useOrderStore();
const { orders } = storeToRefs(orderStore);

const dialog = ref<boolean>(false);
const position = ref<'top' | 'right'>('right');

const open = (pos: 'top' | 'right') => {
  position.value = pos;
  dialog.value = true;
};

onMounted(async () => {
  try {
    const currentOrder = await orderRequest.getByOrderStatus(
      OrderStatusEnum.created,
      currentUser.value.id,
    );

    await orderDetailsStore.fetchAll(currentOrder.id);
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error);
    }
  }
});

watch(() => orderStore.orders.length, () => {
  orderDetailsStore.fetchAll(orders.value[0].id);
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
