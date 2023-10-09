<template>
  <q-page class="q-px-xl">
    <div class="q-pa-md absolute-center register-block">
      <q-form
        class="q-gutter-md register-form column"
      >
        <span>Name:</span>
        <name-input v-model="name" />

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
          <span
            v-if="registerError"
            class="user-already-exist-msg"
          >Ups... User with this data already exist</span>

          <default-btn
            title="Register"
            outline
            color="red"
            bg-color="white"
            class="register-btn"
            @click="registerNewUser"
          />

          <default-btn
            title="Log In"
            to="/log-in"
            color="red"
            bg-color="white"
            outline
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
import { useRouter } from 'vue-router';
import { stringValidator } from 'src/validators/stringValidator';
import { nameValidators } from 'src/validators/name';
import { emailValidators } from 'src/validators/email';
import { phoneNumberValidators } from 'src/validators/phoneNumber';
import { passwordValidators } from 'src/validators/password';
import { isAxiosError } from 'axios';
import { useUserStore } from 'src/stores/users';
import DefaultBtn from 'components/Buttons/DefaultBtn.vue';
import NameInput from 'components/Auth/NameInput.vue';

const userStore = useUserStore();

const router = useRouter();

const name = ref<string>('');
const email = ref<string>('');
const phoneNumber = ref<string>('+7 ');
const password = ref<string>('');

const isValidForms = ref<boolean[]>([]);
const registerError = ref<boolean>(false);

const registerNewUser = async () => {
  isValidForms.value = [];

  isValidForms.value.push(stringValidator(name.value, nameValidators));
  isValidForms.value.push(stringValidator(email.value, emailValidators));
  isValidForms.value.push(stringValidator(phoneNumber.value, phoneNumberValidators));
  isValidForms.value.push(stringValidator(password.value, passwordValidators));

  if (!isValidForms.value.filter((isValid) => !isValid).length) {
    try {
      await userStore.register({
        name: name.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        password: password.value,
      });
      await router.push('/log-in');
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 409) {
        registerError.value = true;
      } else {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../css/quasar.variables.scss";
.register-block {
  padding: 25px;
  border: 1px solid #000;
  border-radius: 15px;
  width: 450px;

  button, a {
    padding: 10px 50px;
  }

  .register-form {
    margin: 15px 0;

    span {
      font-size: 20px;
    }
  }

  .user-already-exist-msg {
    color: $main-red-color;
    font-size: 15px !important;
  }
}
</style>
