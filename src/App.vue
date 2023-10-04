<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style lang="scss">
@import "./css/quasar.variables.scss";

html {
  scroll-behavior: smooth;

  body {
    &::-webkit-scrollbar {
      width: 0;
    }

    .q-page {
      padding: 0 250px 25px 250px;
    }
  }
}
</style>
