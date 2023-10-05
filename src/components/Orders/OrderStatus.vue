<template>
  <q-btn
    :icon="matDrafts"
    color="none"
    dense
    fab-mini
    unelevated
  />
</template>

<script setup lang="ts">
import { matDrafts } from '@quasar/extras/material-icons';
</script>

<style scoped lang="scss">
@import "src/css/app";

button {
  @include link(15px);
}
</style>
