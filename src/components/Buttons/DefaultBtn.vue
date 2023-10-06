<template>
  <q-btn
    :label="title"
    :style="`background: ${bgColor}; color: ${color}; width: auto`"
  />
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const { color, title, bgColor } = defineProps<{title: string, color: string, bgColor: string}>();
</script>
