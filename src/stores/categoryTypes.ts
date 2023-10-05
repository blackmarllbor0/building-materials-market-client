import { defineStore } from 'pinia';
import { CategoryTypeParams, useCategoryTypeRequest } from 'src/requests/categoryType';

export interface CategoryType {
  id: number;
  name: string;
  createDate: Date;
  updateDate: Date;
}

const categoryTypeRequest = useCategoryTypeRequest();

export const useCategoryTypesStore = defineStore('categoryTypes', {
  state: () => ({
    categoryTypes: [] as CategoryType[],
  }),
  actions: {
    async fetchAllCategoryTypes(params?: CategoryTypeParams) {
      this.categoryTypes = await categoryTypeRequest.getAll(params);
    },
  },
});
