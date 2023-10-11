import { defineStore } from 'pinia';
import { OrderPaymentTypeParams, useOrderPaymentTypeRequest } from 'src/requests/orderPaymentType';

export enum OrderPaymentTypeEnum {
  cash = 1,
  visa = 2,
  masterCard = 3,
}

export interface OrderPaymentType {
  id: number;
  name: string;
  createDate: Date;
  updateDate: Date;
}

const orderPaymentTypeRequest = useOrderPaymentTypeRequest();

export const useOrderPaymentTypesStore = defineStore('order-payment-types', {
  state: () => ({
    orderPaymentTypes: [] as OrderPaymentType[],
  }),
  actions: {
    async fetchAll(params?: OrderPaymentTypeParams) {
      this.orderPaymentTypes = await orderPaymentTypeRequest.getAll(params);
    },
  },
});
