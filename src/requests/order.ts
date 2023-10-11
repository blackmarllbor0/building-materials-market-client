import { api, OffsetLimit } from 'boot/axios';
import { OrderPaymentTypeEnum } from 'src/stores/orderPaymentType';
import { Order } from 'stores/orders';
import { OrderStatusEnum } from 'stores/orderStatus';

export interface OrderBody {
  userId: number;
  orderPaymentTypeId: number;
  orderDetails?: {productId: number, quantity: number, price: number}[];
}

export interface DeliveryBody {
  orderId: number,
  addressFrom: string,
  approximateDate: Date,
  amount: number,
  addressTo: string
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
  async updatePaymentType(orderId: number, paymentType: OrderPaymentTypeEnum) {
    const { data } = await api.patch(`${path}/${orderId}`, { orderPaymentTypeId: paymentType });

    return data as Order;
  },
  async decorationOrder(orderId: number, deliveryBody?: DeliveryBody) {
    const { data } = await api.patch(`${path}/${orderId}`, {
      orderStatusId: OrderStatusEnum.decoration,
    });

    if (deliveryBody) {
      await api.post('/delivery', deliveryBody);
    }

    return data;
  },
});
