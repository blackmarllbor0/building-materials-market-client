import { api, OffsetLimit } from 'boot/axios';
import { OrderDetail } from 'stores/orderDetails';

export interface OrderDetailsParams {
  offsetLimit?: OffsetLimit;
}

export interface OrderDetailBody {
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
}

export const useOrderDetailsRequest = () => ({
  async getAll(orderId: number, params?: OrderDetailsParams) {
    const { data } = await api.get(`/orders/${orderId}/order-details`, { params });

    return data as OrderDetail[];
  },
  async createNewOrderDetail({ orderId, ...body }: OrderDetailBody) {
    const { data } = await api.post(`/orders/${orderId}/order-details`, body);

    return data;
  },
  async incrementQuantity(orderId: number, orderDetailId: number, prevValue: number) {
    const { data } = await api.patch(
      `/orders/${orderId}/order-details/${orderDetailId}`,
      { quantity: prevValue + 1 },
    );

    return data;
  },
  async decrementQuantity(orderId: number, orderDetailId: number, prevValue: number) {
    const { data } = await api.patch(
      `/orders/${orderId}/order-details/${orderDetailId}`,
      { quantity: prevValue - 1 },
    );

    return data;
  },
  async deleteById(orderId: number, orderDetailId: number) {
    await api.delete(`/orders/${orderId}/order-details/${orderDetailId}`);
  },
});
