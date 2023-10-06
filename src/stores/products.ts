import { defineStore } from 'pinia';
import { ProductsParams, useProductsRequests } from 'src/requests/products';

export interface Product {
  id: number;
  companyId: number;
  categoryId: number;
  quantity: number;
  price: number;
  rating: number;
  isDeleted: number;
  linkToImage: string;
  title: string;
  description: string;
}

const productsRequest = useProductsRequests();

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
  }),
  actions: {
    async fetchAllProducts(params: ProductsParams) {
      this.products = await productsRequest.getAll(params);
    },
  },
});
