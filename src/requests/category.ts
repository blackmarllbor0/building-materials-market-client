import { api, OffsetLimit } from 'boot/axios';
import { Category } from 'stores/categories';

export interface CategoryParams {
  offsetLimit?: OffsetLimit;
  categoryTypeId?: number;
}

const path = '/categories';

export const useCategoryRequests = () => ({
  async getAll(params?: CategoryParams) {
    const { data } = await api.get(path, {
      params: { ...params?.offsetLimit, ...params },
    });

    return data as Category[];
  },
  async getCategoryById(categoryId: number) {
    const { data } = await api.get(`${path}/${categoryId}`);

    return data as Category;
  },
  async getCategoryIdByName(categoryName: string) {
    const { data } = await api.get(path, { params: { categoryName } });
    const { id } = data[0];

    return id;
  },
});
