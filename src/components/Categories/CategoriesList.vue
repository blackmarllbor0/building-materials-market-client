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
      style="background-color: white"
      @submit="searchProductsByCategory"
    />
    <div class="q-pa-xl q-gutter-xl row items-center justify-evenly categories-list">
      <router-link
        v-for="({id, categoryTypeId}) in categories"
        :key="id"
        :to="`home?categoryId=${id}`"
      >
        category-type-id {{ categoryTypeId }}
      </router-link>
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

    await router.push(`/home?categoryId=${categoryId}`);
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

  a {
    @include link(15px);
    border: 1px solid $main-red-color;
    text-decoration: none !important;
    color: #000;

    max-width: 150px;
    width: 100%;
  }
}

</style>
