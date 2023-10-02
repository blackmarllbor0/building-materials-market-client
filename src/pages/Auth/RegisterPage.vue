<template>
  <q-page class="q-px-xl">
    <div class="q-pa-md fixed-center register-block">
      <q-form
        class="q-gutter-md register-form column"
      >
        <span>Name:</span>
        <q-input
          v-model="name"
          filled
          label="Your Name"
          lazy-rules
          :rules="nameValidators"
          color="white"
          fill-mask
          hint="Tony Stark"
        />

        <span>Email:</span>
        <EmailInput v-model="email" />

        <span>Phone Number:</span>
        <phone-input v-model="phoneNumber" />

        <span>Password:</span>
        <password-input v-model="password" />

        <div
          class="row flex-center"
          style="gap: 1rem;"
        >
          <q-btn
            style="color: red"
            padding="10px 50px"
            label="Register"
            outline
            @click="registerNewUser"
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
import { api } from 'src/boot/axios';
import { stringValidator } from 'src/validators/stringValidator';
import { nameValidators } from 'src/validators/name';
import { emailValidators } from 'src/validators/email';
import { phoneNumberValidators } from 'src/validators/phoneNumber';
import { passwordValidators } from 'src/validators/password';

const name = ref<string>('');
const email = ref<string>('');
const phoneNumber = ref<string>('+7 ');
const password = ref<string>('');

const isValidForms = ref<boolean[]>([]);

const registerNewUser = async () => {
  isValidForms.value = [];

  isValidForms.value.push(stringValidator(name.value, nameValidators));
  isValidForms.value.push(stringValidator(email.value, emailValidators));
  isValidForms.value.push(stringValidator(phoneNumber.value, phoneNumberValidators));
  isValidForms.value.push(stringValidator(password.value, passwordValidators));

  if (!isValidForms.value.filter((isValid) => !isValid).length) {
    await api.post('/user', {
      name: name.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
      password: password.value,
    });
  }
};
</script>

<style scoped lang="scss">
.register-block {
  padding: 25px;
  border: 1px solid #000;
  border-radius: 15px;
  width: 450px;

  .register-form {
    margin: 15px 0;

    span {
      font-size: 20px;
    }
  }
}
</style>
