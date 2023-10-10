<template>
  <q-card class="my-card column justify-between">
    <img
      src="https://inbusiness.kz/uploads/37/images/9A528Cf9.jpg"
      :alt="title"
    >

    <q-card-section>
      <div class="text-h6 text-center">
        {{ title }}
      </div>
      <div class="text-subtitle2 text-center">
        {{ description }}
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="row flex-center q-mb-lg">
        <div class="text-h6 p-mb-xl">
          Quantity: {{ quantity }}
        </div>

        <product-rating
          v-model="rating"
          :readonly="true"
        />
      </div>

      <div class="row justify-between buy-block">
        <div class="text-h4">
          {{ price }}$
        </div>
        <default-btn
          class="row flex-center"
          bg-color="red"
          color="white"
          title="Add To Order"
          style="border-radius: 15px"
          @click="addProductToOrder"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { Product } from 'src/stores/products';
import {
  defineProps, onMounted, ref, toRefs,
} from 'vue';
import DefaultBtn from 'src/components/Buttons/DefaultBtn.vue';
import { useCategoryRequests } from 'src/requests/category';
import ProductRating from 'components/Products/ProductRating.vue';
import { useOrderStore } from 'stores/orders';
import { useUserStore } from 'stores/users';
import { storeToRefs } from 'pinia';
import { OrderPaymentTypeEnum } from 'stores/orderPaymentType';
import { useOrderDetailsStore } from 'src/stores/orderDetails';
import { isAxiosError } from 'axios';
import { useOrderRequest } from 'src/requests/order';
import { OrderStatusEnum } from 'src/stores/orderStatus';

const { product } = defineProps<{
  product: Product;
}>();

const {
  title, description, price, categoryId, rating, quantity, id,
} = toRefs(product);

const categoryRequest = useCategoryRequests();

const orderRequest = useOrderRequest();

const orderStore = useOrderStore();

const userStore = useUserStore();
const { currentUser } = storeToRefs(userStore);

const orderDetailStore = useOrderDetailsStore();

const categoryName = ref<string>('');

onMounted(async () => {
  const { name } = await categoryRequest.getCategoryById(categoryId.value);
  categoryName.value = name;
});

const addProductToOrder = async () => {
  try {
    const order = await orderRequest.getByOrderStatus(
      OrderStatusEnum.created,
      currentUser.value.id,
    );

    await orderDetailStore.addOrderDetail({
      productId: id.value,
      quantity: 1,
      orderId: order.id,
      price: price.value,
    });
  } catch {
    try {
      await orderStore.addNewOrder({
        userId: currentUser.value.id,
        orderPaymentTypeId: OrderPaymentTypeEnum.cash,
        orderDetails: [{
          productId: id.value,
          quantity: 1,
          price: price.value,
        }],
      });
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';

.my-card {
  width: 100%;
  max-width: 18vw;
  padding: 15px;
  cursor: pointer;
  border-radius: 15px;

  gap: 1.5rem;

  img {
    border-radius: 15px;
  }
}
</style>
