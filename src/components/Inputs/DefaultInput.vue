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
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const {
  labelColor, color,
} = defineProps<{
  labelColor?: string,
  color?: string,
  label?: string,
  width?: string,
  fontSize?: string,
}>();

const inputValue = ref<string>('');
</script>
