<template>
  <q-header
    elevated
    class="app-header q-pa-md"
  >
    <q-toolbar>
      <router-link
        to="/home"
        class="logo"
      >
        <q-toolbar-title class="text-bold">
          Builder Materials Market
        </q-toolbar-title>
      </router-link>

      <q-space />

      <router-link
        to="/home"
        exact-active-class="active"
      >
        Home
      </router-link>
      <router-link
        to="/about-us"
        exact-active-class="active"
      >
        About Us
      </router-link>

      <header-category-list />

      <header-search />

      <q-space />

      <q-btn
        :icon="matDrafts"
        color="none"
        dense
        fab-mini
        unelevated
        @click="crate1000Categories"
      />

      <shopping-basket />

      <q-btn
        :icon="matLogin"
        to="/log-in"
        color="none"
        dense
        fab-mini
        unelevated
      />
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" setup>
import { matLogin, matDrafts } from '@quasar/extras/material-icons';
import ShoppingBasket from 'src/components/Orders/ShoppingBasket.vue';
import { api } from 'src/boot/axios';
import HeaderSearch from './HeaderSearch.vue';
import HeaderCategoryList from './HeaderCategoryDropList.vue';

// const crate1000Categories = async () => {
//   // eslint-disable-next-line no-plusplus
//   for (let i = 0; i < 1000; i++) {
//     // eslint-disable-next-line no-await-in-loop
//     await api.post('/categories', {
//       name: Math.floor(Math.random() * (1000 - 1) + 1).toString(),
//     });
//   }
// };
</script>

<style scoped lang="scss">
@import "../../css//app.scss";
@import "../../css/quasar.variables.scss";

.app-header {
  background-color: $main-red-color;
  .logo {
    text-decoration: none;
    border: none;
  }

  a {
    @include link(18px);
  }
}
 </style>
