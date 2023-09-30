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
  state: (): Category[] => ([]),
  getters: {
    get: (state) => state,
  },
  actions: {
    async fetchCategories(offsetLimit?: OffsetLimit) {
      try {
        const { data } = await api.get<Category[]>(path, {
          params: offsetLimit,
        });
        this.$state = data;
      } catch (e) {
        console.log(e);
      }
    },
  },
});
