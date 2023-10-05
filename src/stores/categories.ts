import { defineStore } from 'pinia';
import { CategoryParams, useCategoryRequests } from 'src/requests/category';

export interface Category {
  id: number;
  name: string;
  categoryTypeId: number;
  createDate: Date;
  updateDate: Date;
}

const categoryRequest = useCategoryRequests();

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
      this.categories = await categoryRequest.getAll(params);
    },
  },
});
