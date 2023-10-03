<template>
  <q-input
    v-model="phoneNumber"
    filled
    label="Your Phone Number"
    lazy-rules
    :rules="phoneNumberValidators"
    color="white"
    class="log-in"
    mask="+7 (###) ### ## ##"
    fill-mask
    hint="+7 (###) ### ## ##"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { phoneNumberValidators } from 'src/validators/phoneNumber';

const phoneNumber = ref<string>('+7');
</script>

<style lang="scss" scoped>
input {
  background-color: rgba(0, 0, 0, 0,);
}
</style>
