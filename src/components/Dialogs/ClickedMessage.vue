<template>
  <q-dialog
    v-model="show"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card
      class="bg-teal text-white"
      style="width: 300px"
    >
      <q-card-section :style="`background-color: ${cardColor}`">
        <div class="text-h6">
          {{ heading }}
        </div>
      </q-card-section>

      <q-card-section
        class="q-pt-none"
        :style="`background-color: ${cardColor}`"
      >
        {{ msg }}
      </q-card-section>

      <q-card-actions
        align="right"
        class="bg-white text-teal"
      >
        <q-btn
          flat
          :label="btnText"
          :style="`background-color: ${btnColor}; color: ${color}`"
          @click="clickEvent"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const { msg, heading, btnText } = defineProps<{
  heading: string,
  msg: string,
  btnText: string,
  btnColor: string,
  cardColor: string,
  color: string,
  clickEvent:(evt: unknown, go: unknown) => void
}>();

const show = ref<boolean>(false);
</script>

<style scoped lang="scss">

</style>
