/* eslint-disable consistent-return */
import { defineStore } from 'pinia';
import { api, OffsetLimit } from 'src/boot/axios';

export interface Category {
  id: number;
  name: string;
  createDate: Date;
  updateDate: Date;
}

const path = '/categories';

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
    async fetchCategories(offsetLimit?: OffsetLimit) {
      try {
        const { data } = await api.get<Category[]>(path, { params: offsetLimit });
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
