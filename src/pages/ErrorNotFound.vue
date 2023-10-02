<template>
  <div
    class="fullscreen bg-red text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div
        class="text-h2"
        style="opacity:.4"
      >
        Oops. Nothing here...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="red"
        unelevated
        label="Go Back"
        no-caps
        @click="goBack"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>
