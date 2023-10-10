<template>
  <div
    class="q-pa-md scroll category-types-list"
  >
    <q-pull-to-refresh @refresh="refresh">
      <div
        class="q-mb-sm category-type row flex-center"
        @click="getAll"
      >
        All
      </div>
      <div
        v-for="({id, name}) in categoryTypes"
        :key="id"
        class="q-mb-sm category-type row flex-center text-center"
        @click="sortCategoriesByType(id)"
      >
        {{ name }}
      </div>
    </q-pull-to-refresh>
  </div>
</template>

<script lang="ts" setup>
import { useCategoryTypesStore } from 'src/stores/categoryTypes';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useCategoriesStore } from 'stores/categories';

const categoryTypesStore = useCategoryTypesStore();
const { categoryTypes } = storeToRefs(categoryTypesStore);

const categoryStore = useCategoriesStore();

onMounted(async () => {
  await categoryTypesStore.fetchAllCategoryTypes({ offsetLimit: { limit: 25 } });
});

const refresh = (done: () => void) => {
  done();
};

const getAll = () => {
  categoryStore.fetchCategories();
};

const sortCategoriesByType = (categoryTypeId: number) => {
  categoryStore.fetchCategories({ categoryTypeId });
};
</script>

<style lang="scss" scoped>
@import "src/css/quasar.variables";

.category-types-list {
  height: calc(92vh - 5px);
  border: 1px solid $main-red-color;
  border-top: none;
  border-bottom: none;
  max-width: 150px;
  width: 100vw;

  &::-webkit-scrollbar {
    width: 1px;
  }

  .category-type {
    padding: 5px 10px 0 10px;
    cursor: pointer;
    border: 1px solid $main-red-color;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    transition: $transition;

    &:hover {
      border-top: 1px solid $main-red-color;
      border-bottom: 1px solid $main-red-color;
      background-color: rgba(255, 0, 0, 0.2);
      border-radius: 5px;
    }
  }
}
</style>
