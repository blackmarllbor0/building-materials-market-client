<template>
  <router-view />
</template>

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
