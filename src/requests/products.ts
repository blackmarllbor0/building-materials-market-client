import { api, OffsetLimit } from 'boot/axios';
import { Product } from 'stores/products';

export interface ProductsParams {
  offsetLimit?: OffsetLimit,
  categoryId?: number | undefined,
}

const path = '/products';
export const useProductsRequests = () => ({
  async getAll(params?: ProductsParams) {
    const { data } = await api.get(path, {
      params: { ...params?.offsetLimit, ...params },
    });

    return data as Product[];
  },
});
