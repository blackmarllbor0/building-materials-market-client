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
          v-if="userIsAuth"
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

        <span
          v-if="logInError"
          class="text-red flex flex-center"
        >Oh... Incorrect credentials entered</span>

        <div
          class="row flex-center"
          style="gap: 1rem;"
        >
          <default-btn
            color="red"
            bg-color="white"
            padding="10px 50px"
            outline
            title="Log-in"
            @click="logIn"
          />

          <default-btn
            color="red"
            bg-color="white"
            padding="10px 50px"
            title="Register"
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
import { useRouter } from 'vue-router';
import DefaultBtn from 'components/Buttons/DefaultBtn.vue';
import { LogInBody } from 'src/requests/user';
import { isAxiosError } from 'axios';

const router = useRouter();

const userStore = useUserStore();
const { userIsAuth, currentUser } = storeToRefs(userStore);

const logInMethod = ref<'email' | 'phoneNumber'>('email');

const email = ref<string>(currentUser.value.email);
const phoneNumber = ref<string>(currentUser.value.phoneNumber);
const password = ref<string>('');

const isValidForms = ref<boolean[]>([]);

const logInError = ref<boolean>(false);

const logIn = async () => {
  isValidForms.value = [];

  if (logInMethod.value === 'email') {
    isValidForms.value.push(stringValidator(email.value, emailValidators));
  } else {
    isValidForms.value.push(stringValidator(phoneNumber.value, phoneNumberValidators));
  }

  isValidForms.value.push(stringValidator(password.value, passwordValidators));

  if (!isValidForms.value.filter((isValid) => !isValid).length) {
    const body: LogInBody = { password: password.value };
    if (logInMethod.value === 'email') {
      body.email = email.value;
    } else {
      body.phoneNumber = phoneNumber.value;
    }

    try {
      await userStore.loginUser(body);

      await router.push('/products');
    } catch (error) {
      if (isAxiosError(error) && error.status !== 500) {
        logInError.value = true;
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
