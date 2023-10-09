import { api, OffsetLimit } from 'boot/axios';
import { OrderDetail } from 'stores/orders';

export interface OrderDetailsParams {
  offsetLimit?: OffsetLimit;
}

export const useOrderDetailsRequest = () => ({
  async getAll(orderId: number, params?: OrderDetailsParams) {
    const { data } = await api.get(`/orders/${orderId}/order-details`, { params });

    return data as OrderDetail[];
  },
});
