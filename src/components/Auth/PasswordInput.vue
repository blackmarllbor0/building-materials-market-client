<template>
  <q-input
    v-model="password"
    filled
    label="Your Password"
    lazy-rules
    type="password"
    color="white"
    :rules="passwordValidators"
    hint="Example: mrCmTF%Lz^Y*k#o@prjL2O"
    class="password"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { passwordValidators } from 'src/validators/password';

const password = ref<string>('');
</script>
