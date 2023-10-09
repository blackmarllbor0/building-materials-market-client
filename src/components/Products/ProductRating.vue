<script setup lang="ts">
import { ref } from 'vue';

const rating = ref<number>(1);

const { size } = defineProps<{ size: string }>();
</script>

<template>
  <q-rating
    v-model="rating"
    max="5"
    :size="size"
    color="yellow"
    icon="star_border"
    icon-selected="star"
    no-dimming
    readonly
  />
</template>

<style scoped lang="scss">

</style>
