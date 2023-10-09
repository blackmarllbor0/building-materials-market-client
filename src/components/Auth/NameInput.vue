<template>
  <q-input
    v-model="name"
    filled
    label="Your Name"
    lazy-rules
    :rules="nameValidators"
    color="white"
    input-class="name"
    fill-mask
    hint="Tony Stark"
    input-style="z-index: 1000"
  />
</template>

<script setup lang="ts">
import { nameValidators } from 'src/validators/name';
import { ref } from 'vue';

const name = ref<string>('');
</script>
