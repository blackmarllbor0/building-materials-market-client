<template>
  <q-form
    v-model="inputValue"
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
      :disable="disable || false"
    />
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const {
  labelColor, color, disable,
} = defineProps<{
  labelColor?: string,
  color?: string,
  label?: string,
  width?: string,
  fontSize?: string,
  disable?: boolean,
}>();

const inputValue = ref<string>('');
</script>
