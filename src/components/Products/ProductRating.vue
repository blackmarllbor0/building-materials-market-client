<template>
  <q-rating
    v-model="start"
    max="5"
    :size="props.size || '2em'"
    :color="props.color || 'yellow'"
    icon="star_border"
    icon-selected="star"
    icon-half="star_half"
    no-dimming
    :readonly="props.readonly"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const start = ref<number>(0);

const props = defineProps<{
  size?: string,
  color?: string,
  readonly?: boolean,
}>();

</script>
