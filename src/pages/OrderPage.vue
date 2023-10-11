<template>
  <q-page class="q-px-xl">
    <div class="order q-pa-xl">
      <div
        class="row justify-between"
        style="align-items: center;"
      >
        <div>
          <div class="text-h3">
            Order ID: {{ currentOrder.orderNumber }}
          </div>
          <div class="text-subtitle2">
            Order Date: {{ moment(currentOrder.createDate).format('MMMM Do YYYY') }}
          </div>
          <div class="text-subtitle2">
            Total Quantity: {{ getCount }}
          </div>
        </div>

        <dropdown-btns
          :list="orderPaymentTypes.map(({id, name}) => ({id, name, click: setOrderPayment}))"
          :label="paymentType"
          color="red"
        />
      </div>

      <hr class="q-mt-xl q-mb-xl">

      <div>
        <shopping-basket-card
          v-for="({id, productId, quantity, positionNumber}) in sortByPositionNumber"
          :id="id"
          :key="id"
          :product-id="productId"
          :quantity="quantity"
          :position-number="positionNumber"
        />
      </div>

      <hr class="q-mt-xl q-mb-xl">

      <div>
        <q-checkbox
          v-model="isDelivery"
          val="red"
          label="Arrange Delivery?"
          color="red"
          style="user-select: none;"
        />

        <q-input
          v-model="deliveryAddress"
          rounded
          color="red"
          label="Delivery Address"
          style="width: 100%;"
          :disable="!isDelivery"
        />

        <div class="text-subtitle1 float-right q-mt-sm">
          Delivery Price: {{ deliveryPrice }}$
        </div>
      </div>

      <hr class="q-mt-xl q-mb-xl">

      <div
        class="row justify-between"
        style="align-items: center;"
      >
        <default-btn
          bg-color="white"
          color="red"
          title="Register Order"
          style="font-size: 25px;"
          @click="decorationOrder"
        />

        <div class="text-h4">
          Total Price: {{ totalPrice }}$
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import moment from 'moment';
import { storeToRefs } from 'pinia';
import { useOrderStore } from 'src/stores/orders';
import DropdownBtns from 'src/components/Buttons/DropdownBtns.vue';
import { useOrderPaymentTypesStore } from 'src/stores/orderPaymentType';
import {
  computed, onMounted, ref, watch,
} from 'vue';
import { useOrderPaymentTypeRequest } from 'src/requests/orderPaymentType';
import { useOrderDetailsStore } from 'src/stores/orderDetails';
import ShoppingBasketCard from 'src/components/Orders/ShoppingBasketCard.vue';
import DefaultBtn from 'src/components/Buttons/DefaultBtn.vue';
import { DeliveryBody } from 'src/requests/order';
import { useRouter } from 'vue-router';

const router = useRouter();

const orderStore = useOrderStore();
const { currentOrder } = storeToRefs(orderStore);

const orderPaymentTypesStore = useOrderPaymentTypesStore();
const { orderPaymentTypes } = storeToRefs(orderPaymentTypesStore);

const orderDetailsStore = useOrderDetailsStore();
const { sortByPositionNumber, getTotalPrice, getCount } = storeToRefs(orderDetailsStore);

const orderPaymentTypeRequest = useOrderPaymentTypeRequest();

const paymentType = ref<string>('');
const isDelivery = ref<boolean>(true);
const deliveryPrice = ref<number>(49);
const deliveryAddress = ref<string>('');

const totalPrice = computed(() => (
  isDelivery.value ? getTotalPrice.value + deliveryPrice.value : getTotalPrice.value
));

onMounted(async () => {
  await orderPaymentTypesStore.fetchAll();

  paymentType.value = (await orderPaymentTypeRequest.getById(currentOrder.value.id)).name;
});

const setOrderPayment = async (id: number) => {
  await orderStore.updatePaymentType(id);
};

const decorationOrder = async () => {
  let delivery: DeliveryBody;

  if (isDelivery.value) {
    delivery = {
      addressTo: deliveryAddress.value,
      addressFrom: 'Order Pickup Point (Starting Point)',
      amount: deliveryPrice.value,
      orderId: currentOrder.value.id,
      approximateDate: moment(new Date())
        .add(3, 'days')
        .locale('kz').toDate(),
    };

    await orderStore.decorationOrder(delivery);

    orderDetailsStore.orderDetails = [];

    await router.push('/products');

    return;
  }

  await orderStore.decorationOrder();

  orderDetailsStore.orderDetails = [];

  await router.push('/products');
};

watch(() => currentOrder.value, async (order) => {
  paymentType.value = (await orderPaymentTypeRequest.getById(order.orderPaymentTypeId)).name;
});
</script>
