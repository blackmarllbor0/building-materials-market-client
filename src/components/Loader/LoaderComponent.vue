<template>
  <div>
    <q-spinner-hourglass
      color="red"
      :size="`${size}em`"
    />
    <q-tooltip :offset="[0, 8]">
      {{ title }}
    </q-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const { size, title } = defineProps<{title: string, size: number}>();
</script>
