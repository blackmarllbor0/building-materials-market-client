import { api, OffsetLimit } from 'boot/axios';
import { CategoryType } from 'stores/categoryTypes';

export interface CategoryTypeParams {
  offsetLimit?: OffsetLimit,
  categoryTypeName?: string,
  categoryTypeId?: number,
}

const path = '/category-types';

export const useCategoryTypeRequest = () => ({
  async getAll(params?: CategoryTypeParams) {
    const { data } = await api.get(path, {
      params: { ...params?.offsetLimit, ...params },
    });

    return data as CategoryType[];
  },
});
