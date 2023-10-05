<template>
  <q-btn
    :icon="matShoppingBasket"
    color="none"
    dense
    fab-mini
    unelevated
    @click="showBasketProducts"
  />
</template>

<script lang="ts" setup>
import { matShoppingBasket } from '@quasar/extras/material-icons';
import { api } from 'src/boot/axios';

const showBasketProducts = async () => {
  try {
    await api.get('/orders');
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="scss" scoped>
@import "src/css/app";

button {
  @include link(18px);
}
</style>
