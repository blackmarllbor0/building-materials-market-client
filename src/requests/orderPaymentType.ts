import { OffsetLimit, api } from 'src/boot/axios';
import { OrderPaymentType } from 'src/stores/orderPaymentType';

export interface OrderPaymentTypeParams {
  offsetLimit?: OffsetLimit
}

const path = '/order-payment-types';

export const useOrderPaymentTypeRequest = () => ({
  async getAll(params?: OrderPaymentTypeParams) {
    const { data } = await api.get(path, { params });

    return data as OrderPaymentType[];
  },
  async getById(id: number) {
    const { data } = await api.get(`${path}/${id}`);

    return data as OrderPaymentType;
  },
});
