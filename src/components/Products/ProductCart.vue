<template>
  <q-card class="my-card">
    <img
      src="https://inbusiness.kz/uploads/37/images/9A528Cf9.jpg"
      :alt="title"
    >

    <q-card-section>
      <div class="text-h6">
        {{ title }}
      </div>
      <div class="text-subtitle2">
        {{ categoryName }}
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      {{ description }}
      <p>{{ price }} tenge</p>

      <p>categoryId {{ categoryId }}</p>

      <default-btn
        class="row flex-center"
        bg-color="red"
        color="white"
        title="Add To Order"
        style="border-radius: 15px;"
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { Product } from 'src/stores/products';
import {
  defineProps, onMounted, ref, toRefs,
} from 'vue';
import DefaultBtn from 'src/components/Buttons/DefaultBtn.vue';
import { Category, useCategoriesStore } from 'src/stores/categories';

const { product } = defineProps<{
  product: Product
}>();

const {
  title, description, price, categoryId,
} = toRefs(product);

const categoryStore = useCategoriesStore();

const categoryName = ref<string>('');

onMounted(async () => {
  const { name } = await categoryStore.getCategoryById(categoryId.value) as Category;
  categoryName.value = name;
});

</script>

<style lang="scss" scoped>
@import "../../css/quasar.variables.scss";

.my-card {
  width: 100%;
  max-width: 18vw;
  padding: 15px;
  background-color: rgba($color: $main-red-color, $alpha: 0.2);
  cursor: pointer;
  border-radius: 15px;

  img {
    border-radius: 15px;
  }
}
</style>
