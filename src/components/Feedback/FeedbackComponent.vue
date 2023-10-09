<template>
  <div class="feedback">
    <div
      class="rating fixed-bottom"
      style="padding: 0 250px 25px 250px;"
    >
      <div class="text-h4 q-mb-xs">
        Rating
      </div>
      <div
        class=" row items-center"
        style="gap: 1rem;"
      >
        <product-rating
          v-model="product.rating"
          size="2.5em"
        />
        <div class="text-h5">
          {{ product.rating }}
        </div>
      </div>
    </div>

    <div class="feedbacks">
      <feedback-cart
        v-for="(feedback) in feedbacks"
        :key="feedback.id"
        :feedback="feedback"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductRating from 'components/Products/ProductRating.vue';
import { Product } from 'stores/products';
import { onMounted, ref, toRefs } from 'vue';
import { Feedback } from 'stores/feedbacks';
import FeedbackCart from 'components/Feedback/FeedbackCart.vue';
import { useFeedbackRequest } from 'src/requests/feedback';

const props = defineProps<{product: Product}>();
const { product } = toRefs(props);

const feedbackRequest = useFeedbackRequest();

const feedbacks = ref<Feedback[]>([]);

onMounted(async () => {
  feedbacks.value = await feedbackRequest.getAll({ offsetLimit: { limit: 15 } });
});
</script>

<style scoped lang="scss">

</style>
