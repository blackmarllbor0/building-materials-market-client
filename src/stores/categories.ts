import { defineStore } from 'pinia';
import { api, OffsetLimit } from 'src/boot/axios';

export interface Category {
    id: number;
    name: string;
    // createDate: Date;
    // updateDate: Date;
}

const path = '/categories';

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [] as Category[],
  }),
  getters: {
    getAll: (state) => state.categories,
    getCategoriesNames: ({ categories }) => categories.map(({ name }) => name),
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
  },
});
