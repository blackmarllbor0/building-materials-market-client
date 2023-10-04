/* eslint-disable consistent-return */
import { defineStore } from 'pinia';
import { api, OffsetLimit } from 'src/boot/axios';

export interface Category {
  id: number;
  name: string;
  categoryTypeId: number;
  createDate: Date;
  updateDate: Date;
}

const path = '/categories';

interface CategoryParams {
  offsetLimit?: OffsetLimit;
  categoryTypeId?: number;
}

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [] as Category[],
  }),
  getters: {
    getAll: ({ categories }) => categories,
    getCategoriesNames: ({ categories }) => categories.length
      ? categories.map(({ name }) => name)
      : ['Categories Not Found'],
    getCategoriesCount: ({ categories: { length } }) => length || 0,
  },
  actions: {
    async fetchCategories(params?: CategoryParams) {
      try {
        const { data } = await api.get<Category[]>(path, {
          params: {
            ...params?.offsetLimit,
            ...params,
          },
        });
        this.categories = data;
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    },
    async getCategoryById(id: number) {
      try {
        const { data } = await api.get<Category>(`${path}/${id}`);
        return data;
      } catch (error) {
        console.error(error);
      }
    },
    async getCategoryIdByName(name: string) {
      try {
        const { data } = await api.get<Category[]>(path, { params: { categoryName: name } });
        const { id } = data[0];

        return id;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
