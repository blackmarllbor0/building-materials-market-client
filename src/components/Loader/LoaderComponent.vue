<template>
  <div>
    <q-spinner-hourglass
      :color="color || 'red'"
      :size="`${size}em`"
    />
    <q-tooltip :offset="[0, 8]">
      {{ title }}
    </q-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const { size, title, color } = defineProps<{
  title?: string,
  size: number,
  color?: 'red' | 'black' | 'primary' | 'green',
}>();
</script>
