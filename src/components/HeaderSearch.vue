<template>
  <q-form class="row">
    <q-input
      v-model="undefined"
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

<script lang="ts">
import { defineComponent } from 'vue';
import { matSearch } from '@quasar/extras/material-icons';

export default defineComponent({
  name: 'HeaderSearchComponent',

  setup() {
    return {
      matSearch,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../css/app.scss";
.q-input {
    width: 550px;
    font-size: 17px;
}

.q-btn {
    @include link(15px);
}
</style>
