<template>
  <q-page class="q-px-xl">
    <div class="categories ">
      <category-types-list />
      <categories-list />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import CategoryTypesList from 'components/Categories/CategoryTypesList.vue';
import CategoriesList from 'components/Categories/CategoriesList.vue';
</script>

<style lang="scss" scoped>
.q-page {
  overflow: hidden !important;
  padding: 0 250px !important;
}

.categories {
  display: flex !important;
}
</style>
