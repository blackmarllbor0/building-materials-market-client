<template>
  <q-card
    class="order-detail row justify-between"
    style="width: auto; align-content: center;"
  >
    <q-card-section>
      <img
        v-if="product.linkToImages"
        width="15px"
      >
    </q-card-section>

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
import { useProductsRequests } from 'src/requests/products';
import { useOrderDetailsStore } from 'src/stores/orderDetails';
import { useOrderStore } from 'src/stores/orders';
import { Product } from 'src/stores/products';
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

const orderStore = useOrderStore();
const { currentOrder } = storeToRefs(orderStore);

const productRequest = useProductsRequests();

const {
  incrementQuantity, decrementQuantity, deleteById,
} = useOrderDetailsStore();

onMounted(async () => {
  product.value = await productRequest.getById(productId.value);
});

const increment = async () => {
  if (product.value.quantity > quantity.value) {
    await incrementQuantity(currentOrder.value.id, id.value, quantity.value);
  }
};

const decrement = async () => {
  if (quantity.value > 1) {
    await decrementQuantity(currentOrder.value.id, id.value, quantity.value);
  } else {
    await deleteById(currentOrder.value.id, id.value);
  }
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
