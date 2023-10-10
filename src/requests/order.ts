import { api, OffsetLimit } from 'boot/axios';
import { Order } from 'stores/orders';
import { OrderStatusEnum } from 'stores/orderStatus';

export interface OrderBody {
  userId: number;
  orderPaymentTypeId: number;
  orderDetails?: {productId: number, quantity: number, price: number}[];
}

export interface OrderParams {
  userId?: number;
  orderStatusId?: number;
  offsetLimit?: OffsetLimit;
}

const path = '/orders';

export const useOrderRequest = () => ({
  async createOrder(body: OrderBody) {
    const { data } = await api.post(path, body);

    return data as Order;
  },
  async getAll({ offsetLimit, ...params }: OrderParams) {
    const { data } = await api.get(path, {
      params: { ...offsetLimit, ...params },
    });

    return data as Order[];
  },
  async getByOrderStatus(status: OrderStatusEnum, userId: number) {
    const orders = await this.getAll({ orderStatusId: status, userId });
    return orders[0];
  },
});
