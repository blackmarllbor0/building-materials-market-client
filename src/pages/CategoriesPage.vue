<template>
  <q-page class="q-px-xl">
    <h3
      v-for="({ name, id}) in getAll"
      :key="id"
    >
      {{ name }}
    </h3>
  </q-page>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useCategoriesStore } from 'src/stores/categories';
import { storeToRefs } from 'pinia';

const categoriesStore = useCategoriesStore();
const { getAll } = storeToRefs(categoriesStore);

onMounted(async () => categoriesStore.fetchCategories());

</script>
