<template>
  <div class="categories-list row flex-center">
    <search-input
      v-model="inputValue"
      color="red"
      btn-color="red"
      label-color="black"
      label="Search Categories"
      width="800px"
      font-size="17px"
      style="background-color: white; z-index: 2"
      @submit="searchProductsByCategory"
    />
    <div class="q-pa-xl q-gutter-xl row items-center justify-evenly categories-list">
      <default-btn
        v-for="({id, categoryTypeId}) in categories"
        :key="id"
        color="black"
        bg-color="white"
        :title="`Category Type Id - ${categoryTypeId}`"
        @click="searchProductsByCategory"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCategoriesStore } from 'stores/categories';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import SearchInput from 'components/Inputs/SearchInput.vue';
import { useRouter } from 'vue-router';
import { useCategoryRequests } from 'src/requests/category';
import DefaultBtn from 'components/Buttons/DefaultBtn.vue';

const categoriesStore = useCategoriesStore();
const { categories } = storeToRefs(categoriesStore);

const categoryRequest = useCategoryRequests();

const router = useRouter();

onMounted(async () => {
  await categoriesStore.fetchCategories({ offsetLimit: { limit: 4 * 10 } });
});

const inputValue = ref<string>('');

const searchProductsByCategory = async () => {
  try {
    const categoryId = await categoryRequest.getCategoryIdByName(inputValue.value);

    await router.push(`/products?categoryId=${categoryId}`);
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="scss" scoped>
@import "src/css/app";

.categories-list {
  max-height: 88vh;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 1px;
  }

  button {
    @include link(15px);
    border: 1px solid $main-red-color;
    text-decoration: none !important;
    z-index: 1;

    max-width: 150px;
    width: 100%;
  }
}

</style>
