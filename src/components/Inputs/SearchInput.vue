<template>
  <q-form
    class="row"
    @submit.prevent="false"
  >
    <q-input
      v-model="inputValue"
      rounded
      :color="color"
      :label-color="labelColor"
      :label="label"
      :style="`width: ${width}; font-size: ${fontSize}`"
    />

    <q-btn
      :icon="matSearch"
      type="submit"
      :color="btnColor"
      dense
      fab-mini
      unelevated
    />
  </q-form>
</template>

<script setup lang="ts">
import { matSearch } from '@quasar/extras/material-icons';
import { ref } from 'vue';

const {
  labelColor, btnColor, color,
} = defineProps<{
  btnColor?: string,
  labelColor?: string,
  color?: string,
  label?: string,
  width?: string,
  fontSize?: string,
}>();

const inputValue = ref<string>('');
</script>

<style scoped lang="scss">
@import '../../css/app.scss';

.q-btn {
  @include link(10px);
}
</style>
