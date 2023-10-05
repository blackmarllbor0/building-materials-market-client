<template>
  <q-infinite-scroll
    :offset="250"
    @load="infiniteScroll"
  >
    <div
      v-if="products.length"
      class="q-pa-xl q-gutter-xl row items-center justify-evenly"
    >
      <product-cart
        v-for="(product) in products"
        :key="product.id"
        :product="product"
      />
    </div>
    <template #loading>
      <loader-component
        v-if="products.length"
        title="Loading Products"
        :size="5"
        class="row justify-center q-my-md"
      />
    </template>
  </q-infinite-scroll>

  <loader-component
    v-if="isLoaded"
    title="Loading Products"
    :size="10"
    class="fixed-center"
  />

  <products-list-skeleton v-if="!isLoaded && !products.length" />
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { Product } from 'src/stores/products';
import LoaderComponent from 'src/components/Loader/LoaderComponent.vue';
import { useRoute } from 'vue-router';
import ProductsListSkeleton from 'components/Products/ProductsListSkeleton.vue';
import { useProductsRequests } from 'src/requests/products';
import ProductCart from './ProductCart.vue';

const route = useRoute();

const productRequest = useProductsRequests();

const products = ref<Product[]>([]);
const limit = ref<number>(12);
const offset = ref<number>(0);

const isLoaded = ref<boolean>(true);

onMounted(() => {
  isLoaded.value = true;
  products.value = [];
  offset.value = 0;
  limit.value = 12;
});

watch(() => route.query, async () => {
  if (route.path === '/home') {
    offset.value = 0;
    limit.value = 12;
    products.value = await productRequest.getAll({
      offsetLimit: {
        offset: offset.value,
        limit: limit.value,
      },
    });
  }
});

const infiniteScroll = async (index: number, done: (stop: boolean) => void) => {
  const loaderProducts = await productRequest.getAll({
    offsetLimit: {
      offset: offset.value,
      limit: limit.value,
    },
    categoryId: route.query && route.query.categoryId ? +route.query.categoryId : undefined,
  });

  isLoaded.value = false;

  if (loaderProducts && loaderProducts.length) {
    products.value.push(...loaderProducts as Product[]);
    offset.value = limit.value + 1;
    limit.value += 12;
    done(false);
    return;
  }

  done(true);
};
</script>
