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
    activeSortCategory: '',
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
        const { data } = await api.get<Category[]>(path, {
          params: offsetLimit,
        });

        this.categories = data;
      } catch (e) {
        if (e instanceof Error) {
          console.error(e.message);
        }
      }
    },
    setActiveSearchCategory(activeCategory: string) {
      this.activeSortCategory = activeCategory;
    },
  },
});
