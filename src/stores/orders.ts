import { OrderBody, OrderParams, useOrderRequest } from 'src/requests/order';
import { defineStore } from 'pinia';

export interface Order {
  id: number;
  userId: number;
  orderStatusId: number;
  orderPaymentTypeId: number;
  orderNumber: number;
  createDate: Date;
  updateDate: Date;
}

const orderRequest = useOrderRequest();

export const useOrderStore = defineStore('orders', {
  state: () => ({
    orders: [] as Order[],
  }),
  actions: {
    async addNewOrder(body: OrderBody) {
      const newOrder = await orderRequest.createOrder(body);

      this.orders.push(newOrder);
    },
    async fetchAll(params: OrderParams) {
      this.orders = await orderRequest.getAll(params);
    },
  },
});
