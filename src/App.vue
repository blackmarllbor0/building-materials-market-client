<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useUserStore } from 'stores/users';

export default defineComponent({
  name: 'App',

  setup() {
    const userStore = useUserStore();

    onMounted(async () => {
      await userStore.authUser();
    });
  },
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
