<template>
  <q-page class="q-px-xl">
    <div class="q-pa-md fixed-center log-in-block">
      <q-btn-toggle
        v-model="logInMethod"
        toggle-color="red"
        :options="[
          {label: 'Log-in With Email', value: 'email'},
          {label: 'Log-in With Phone Number', value: 'phoneNumber'},
        ]"
        size="md"
        padding="15px"
      />

      <q-form
        class="q-gutter-md log-in-form"
      >
        <email-input v-if="logInMethod==='email'" />

        <phone-input v-if="logInMethod === 'phoneNumber'" />

        <password-input />

        <div
          class="row flex-center"
          style="gap: 1rem;"
        >
          <q-btn
            style="color: red"
            padding="10px 50px"
            label="Log-in"
            outline
          />

          <q-btn
            style="color: red"
            padding="10px 50px"
            label="Register"
            outline
            to="/register"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import EmailInput from 'src/components/Auth/EmailInput.vue';
import PhoneInput from 'src/components/Auth/PhoneInput.vue';
import PasswordInput from 'src/components/Auth/PasswordInput.vue';
import { ref } from 'vue';

const logInMethod = ref<'email' | 'phoneNumber'>('email');
</script>

<style lang="scss">
@import "../../css/quasar.variables.scss";

.log-in-block {
  padding: 25px;
  border: 1px solid #000;
  border-radius: 15px;

  .log-in-form {
    margin: 15px 0;
  }
}
</style>
