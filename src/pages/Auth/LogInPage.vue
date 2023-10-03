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
        <span
          v-if="isRegistered"
          class="user-registered row flex-center"
        >Successfully Registration</span>

        <email-input
          v-if="logInMethod==='email'"
          v-model="email"
        />

        <phone-input
          v-if="logInMethod === 'phoneNumber'"
          v-model="phoneNumber"
        />

        <password-input v-model="password" />

        <div
          class="row flex-center"
          style="gap: 1rem;"
        >
          <q-btn
            style="color: red"
            padding="10px 50px"
            label="Log-in"
            outline
            @click="logIn"
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
import { useUserStore } from 'src/stores/users';
import { storeToRefs } from 'pinia';
import { stringValidator } from 'src/validators/stringValidator';
import { emailValidators } from 'src/validators/email';
import { phoneNumberValidators } from 'src/validators/phoneNumber';
import { passwordValidators } from 'src/validators/password';
import { api } from 'src/boot/axios';
import { isAxiosError } from 'axios';

const userStore = useUserStore();
const { isRegistered } = storeToRefs(userStore);

const logInMethod = ref<'email' | 'phoneNumber'>('email');
const email = ref<string>('3100194@gmail.com');
const phoneNumber = ref<string>('');
const password = ref<string>('Blackmarllbor_0');

const isValidForms = ref<boolean[]>([]);

// We reset the registration status to false
// in any case so as not to display the registration message.
setTimeout(() => {
  userStore.setUserRegisterStatus(false);
}, 3000);

const logIn = async () => {
  isValidForms.value = [];

  if (logInMethod.value === 'email') {
    isValidForms.value.push(stringValidator(email.value, emailValidators));
  } else {
    isValidForms.value.push(stringValidator(phoneNumber.value, phoneNumberValidators));
  }

  isValidForms.value.push(stringValidator(password.value, passwordValidators));

  if (!isValidForms.value.filter((isValid) => !isValid).length) {
    const body: {[key: string]: string} = { password: password.value };
    if (logInMethod.value === 'email') {
      body.email = email.value;
    } else {
      body.phoneNumber = phoneNumber.value;
    }
    try {
      const res = await api.post('/auth/log-in', body);
      const cookieName = 'Authorization';
      const cookie = (res.headers['set-cookie'] as string[])
        .find((c) => c.includes(cookieName))
        ?.match(new RegExp(`^${cookieName}=(.+?);`))
        ?.[1];
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
      }
    }
  }
};
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

  .user-registered {
    font-size: 20px;
    color: rgb(111, 178, 11);
  }
}
</style>
