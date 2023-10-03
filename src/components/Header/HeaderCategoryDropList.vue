<template>
  <q-select
    v-model="category"
    borderless
    :options="categories"
    label="Categories"
    label-color="white"
    @update:model-value="choiceCategory"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useCategoriesStore } from 'src/stores/categories';
import { useProductsStore } from 'src/stores/products';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const productsStore = useProductsStore();

const categoryStore = useCategoriesStore();
const { getCategoriesNames } = storeToRefs(categoryStore);

const router = useRouter();

const category = ref<string>('');
const categories = ref<string[]>([]);

onMounted(async () => {
  await categoryStore.fetchCategories({ limit: 5 }).then(() => {
    categories.value = ['Show All Categories', ...getCategoriesNames.value];
  });
});

const choiceCategory = async (updatedCategory: string) => {
  if (updatedCategory === 'Show All Categories') {
    router.push('/categories');
  } else {
    // const categoryId = await categoryStore.getCategoryIdByName(updatedCategory);
    // await productsStore.fetchProducts(undefined, categoryId);
    router.push('/home');
  }
};
</script>

<style lang="scss">
@import "../../css/app.scss";

.q-select {
  width: 280px;

  @include link(15px);

  span, .q-icon {
    color: #fff;
  }

  span {
    font-size: 14px;
    padding-top: 5px;
    color: #000;
  }

  .q-field__label  {
    font-size: 18px;
  }

  .q-icon {
    font-size: 30px;
  }

}
</style>
