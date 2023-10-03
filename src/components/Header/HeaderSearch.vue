<template>
  <q-form
    class="row"
    @submit.prevent="false"
  >
    <q-input
      v-model="inputValue"
      rounded
      color="white"
      label-color="white"
      label="Search"
    />

    <q-btn
      :icon="matSearch"
      type="submit"
      color="none"
      dense
      fab-mini
      unelevated
    />
  </q-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { matSearch } from '@quasar/extras/material-icons';

const inputValue = ref<string>('');
</script>

<style lang="scss" scoped>
@import '../../css/app.scss';
.q-input {
  width: 400px;
  font-size: 17px;
}

.q-btn {
  @include link(10px);
}
</style>
