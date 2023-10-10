import { defineStore } from 'pinia';
import { OrderDetailBody, useOrderDetailsRequest } from 'src/requests/orderDetails';

export interface OrderDetail {
  id: number;
  orderId: number;
  productId: number;
  positionNumber: number;
  price: number;
  quantity: number;
  createDate: Date;
  updateDate: Date;
}

const orderDetailRequest = useOrderDetailsRequest();

export const useOrderDetailsStore = defineStore('orderDetails', {
  state: () => ({
    orderDetails: [] as OrderDetail[],
  }),
  getters: {
    getCount: ({ orderDetails }) => orderDetails.reduce((prev, next) => prev + next.quantity, 0),
    sortByPositionNumber: ({ orderDetails }) => (
      orderDetails.sort((o, t) => o.positionNumber - t.positionNumber)
    ),
    getTotalPrice: ({ orderDetails }) => (
      orderDetails.map(({ price, quantity }) => price * quantity)
        .reduce((prev, next) => prev + next, 0)
    ),
  },
  actions: {
    async addOrderDetail(body: OrderDetailBody) {
      const orderDetail = await orderDetailRequest.createNewOrderDetail(body);

      this.orderDetails.push(orderDetail);
    },
    async fetchAll(orderId: number) {
      this.orderDetails = await orderDetailRequest.getAll(orderId);
    },
    async incrementQuantity(orderId: number, orderDetailId: number, prevValue: number) {
      await orderDetailRequest.incrementQuantity(orderId, orderDetailId, prevValue);

      await this.fetchAll(orderId);
    },
    async decrementQuantity(orderId: number, orderDetailId: number, prevValue: number) {
      await orderDetailRequest.decrementQuantity(orderId, orderDetailId, prevValue);

      await this.fetchAll(orderId);
    },
  },
});
