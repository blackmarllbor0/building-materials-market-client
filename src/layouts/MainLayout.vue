<template>
  <q-layout view="lHh Lpr lFf">
    <header-component />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import HeaderComponent from 'src/components/Header/HeaderComponent.vue';
</script>
