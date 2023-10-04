import { defineStore } from 'pinia';
import { api, OffsetLimit } from 'src/boot/axios';

export interface CategoryType {
  id: number;
  name: string;
  createDate: Date;
  updateDate: Date;
}

const path = 'category-types';

interface Params {
  offsetLimit?: OffsetLimit,
  categoryTypeName?: string,
  categoryTypeId?: number,
}

export const useCategoryTypesStore = defineStore('categoryTypes', {
  state: () => ({
    categoryTypes: [] as CategoryType[],
  }),
  actions: {
    async fetchAllCategoryTypes(params?: Params) {
      try {
        const { data } = await api.get(path, {
          params: { ...params.offsetLimit, ...params },
        });

        this.categoryTypes = data;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
