<template>
  <div
    class="q-pa-xl q-gutter-xl row items-center justify-evenly"
  >
    <q-card
      v-for="(i) in 6"
      :key="i"
      flat
      bordered
      class="my-card"
    >
      <q-skeleton
        height="200px"
        square
        animation="fade"
      />

      <q-card-section>
        <q-skeleton
          type="text"
          class="text-subtitle2"
          animation="fade"
        />
        <q-skeleton
          type="text"
          width="50%"
          class="text-subtitle2"
          animation="fade"
        />
      </q-card-section>
    </q-card>

    <clicked-message
      v-model="show"
      heading="Products not found"
      btn-text="Go Home"
      msg=""
      :click-event="goBack"
      color="white"
      btn-color="red"
      card-color="red"
    />
  </div>
</template>

<script setup lang="ts">
import ClickedMessage from 'components/Dialogs/ClickedMessage.vue';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const show = computed(() => !!route.query.categoryId);

const goBack = () => {
  router.push('/products');
};
</script>
<style scoped lang="scss">
@import "../../css/quasar.variables.scss";

.my-card {
  width: 100%;
  max-width: 18vw;
  padding: 15px;
  background-color: rgba($color: $main-red-color, $alpha: 0.2);
  cursor: pointer;
  border-radius: 15px;
}
</style>
