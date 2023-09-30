<template>
  <q-header
    elevated
    class="app-header q-pa-md"
  >
    <q-toolbar>
      <router-link
        to="/"
        class="logo"
      >
        <q-toolbar-title class="text-bold">
          Builder Materials Market
        </q-toolbar-title>
      </router-link>

      <q-space />

      <router-link
        to="/"
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
        :icon="matShoppingBasket"
        color="none"
        dense
        fab-mini
        unelevated
        to="/"
      />

      <q-btn
        :icon="matShoppingBasket"
        color="none"
        dense
        fab-mini
        unelevated
        to="/"
      />

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
<script lang="ts">
import { defineComponent } from 'vue';
import { matLogin, matShoppingBasket, matDrafts } from '@quasar/extras/material-icons';
import HeaderSearch from './HeaderSearch.vue';
import HeaderCategoryList from './HeaderCategoryList.vue';

export default defineComponent({
  name: 'HeaderComponent',

  components: {
    HeaderSearch,
    HeaderCategoryList,
  },

  setup() {
    return {
      matLogin,
      matShoppingBasket,
      matDrafts,
    };
  },
});
</script>

<style scoped lang="scss">
@import "../css//app.scss";
@import "../css/quasar.variables.scss";

.app-header {
  background-color: $main-red-color;
  .logo {
    text-decoration: none;
    border: none;

    .q-toolbar-title {
      font-size: 125px !important;
    }
  }

  a {
    @include link(15px);
  }
}
 </style>
