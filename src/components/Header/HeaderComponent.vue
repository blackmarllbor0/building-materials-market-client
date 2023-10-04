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

      <router-link
        to="/categories"
        exact-active-class="active"
      >
        Categories
      </router-link>

      <q-space />

      <search-input
        label="Search"
        btn-color="none"
        color="white"
        label-color="white"
        width="400px"
        font-size="17px"
      />

      <q-space />

      <q-btn
        :icon="matDrafts"
        color="none"
        dense
        fab-mini
        unelevated
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
import { matDrafts, matLogin } from '@quasar/extras/material-icons';
import ShoppingBasket from 'src/components/Orders/ShoppingBasket.vue';
import SearchInput from 'components/Inputs/SearchInput.vue';
</script>

<style scoped lang="scss">
@import "src/css/app";
@import "src/css/quasar.variables.scss";

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
