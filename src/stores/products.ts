/* eslint-disable consistent-return */
import { defineStore } from 'pinia';
import { api, OffsetLimit } from 'src/boot/axios';

export interface Product {
  id: number;
  companyId: number;
  categoryId: number;
  quantity: number;
  price: number;
  rating: number;
  isDeleted: number;
  linkToImage: string;
  title: string;
  description: string;
}

const path = '/products';

interface Params {
  offsetLimit?: OffsetLimit,
  categoryId?: number | undefined,
}

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
  }),
  actions: {
    async fetchAllProducts(params?: Params) {
      try {
        const { data } = await api.get<Product[]>(path, {
          params: { ...params?.offsetLimit, ...params },
        });

        this.products = data;
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    },
    async lazyFetchProducts(params: Params) {
      try {
        const { data } = await api.get<Product[]>(path, {
          params: {
            ...params.offsetLimit, ...params,
          },
        });

        return data;
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    },
  },
});
