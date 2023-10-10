<template>
  <q-card
    class="order-detail row justify-between"
    style="width: auto; align-content: center;"
  >
    <q-card-section
      class="row items-center no-wrap card-info"
      style="flex: 1;"
    >
      <span>
        {{ positionNumber }}.
        {{ product.title }}
      </span>
    </q-card-section>

    <q-card-section>
      <div class="q-ml-sm quantity">
        <span @click="increment">+</span>
        {{ quantity }}
        <span @click="decrement">-</span>
      </div>
    </q-card-section>

    <q-card-actions class="q-pr-md">
      <span>{{ product.price }}$</span>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useOrderRequest } from 'src/requests/order';
import { useProductsRequests } from 'src/requests/products';
import { useOrderDetailsStore } from 'src/stores/orderDetails';
import { OrderStatusEnum } from 'src/stores/orderStatus';
import { Product } from 'src/stores/products';
import { useUserStore } from 'src/stores/users';
import {
  defineProps, onMounted, ref, toRefs,
} from 'vue';

const props = defineProps<{
  productId: number,
  quantity: number,
  positionNumber: number,
  id: number,
}>();

const {
  productId, positionNumber, quantity, id,
} = toRefs(props);

const product = ref<Product>({} as Product);
const orderId = ref<number>(0);

const userStore = useUserStore();
const { currentUser } = storeToRefs(userStore);

const productRequest = useProductsRequests();
const orderRequest = useOrderRequest();

const { incrementQuantity, decrementQuantity } = useOrderDetailsStore();

onMounted(async () => {
  product.value = await productRequest.getById(productId.value);
  const order = await orderRequest.getByOrderStatus(
    OrderStatusEnum.created,
    currentUser.value.id,
  );

  orderId.value = order.id;
});

const increment = async () => {
  await incrementQuantity(orderId.value, id.value, quantity.value);
};

const decrement = async () => {
  await decrementQuantity(orderId.value, id.value, quantity.value);
};
</script>

<style lang="scss" scoped>
.quantity {
  user-select: none;

  span {
    cursor: pointer;
  }
}
</style>
