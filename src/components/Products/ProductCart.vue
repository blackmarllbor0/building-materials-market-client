<template>
  <q-card class="my-card">
    <img
      src="https://inbusiness.kz/uploads/37/images/9A528Cf9.jpg"
      :alt="title"
    >

    <q-card-section>
      <div class="text-h6 text-center">
        {{ title }}
      </div>
      <div class="text-subtitle2 text-center">
        {{ description }}
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none row justify-between buy-block">
      <div class='text-h4'>{{ price }}$</div>
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
import { useCategoryRequests } from 'src/requests/category';

const { product } = defineProps<{
  product: Product
}>();

const {
  title, description, price, categoryId,
} = toRefs(product);

const categoryRequest = useCategoryRequests();

const categoryName = ref<string>('');

onMounted(async () => {
  const { name } = await categoryRequest.getCategoryById(categoryId.value);
  categoryName.value = name;
});

</script>

<style lang="scss" scoped>
@import "../../css/quasar.variables.scss";

.my-card {
  width: 100%;
  max-width: 18vw;
  padding: 15px;
  cursor: pointer;
  border-radius: 15px;

  flex-basis: calc(33.33% - 10px);
  box-sizing: border-box;

  img {
    border-radius: 15px;
  }
}
</style>
