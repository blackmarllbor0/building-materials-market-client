<template>
  <q-input
    v-model="login"
    filled
    label="Your Email Address"
    lazy-rules
    :rules="emailValidators"
    color="white"
    class="log-in"
    fill-mask
    hint="name@service.domen"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { emailValidators } from 'src/validators/email';

const login = ref<string>('');
</script>
