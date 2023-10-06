<template>
  <q-page class="q-px-xl">
    <div class="q-pa-md change-block absolute-center">
      <q-form
        class="q-gutter-md register-form column"
      >
        <span>Name:</span>
        <q-input
          v-model="name"
          filled
          label="New Name (Optional)"
          lazy-rules
          :rules="name.length ? nameValidators : []"
          color="white"
          fill-mask
          hint="Tony Stark"
        />

        <span>Email:</span>
        <EmailInput
          v-model="email"
          label="New Email (Optional)"
          :rules="email.length ? emailValidators : []"
        />

        <span>Phone Number:</span>
        <phone-input
          v-model="phoneNumber"
          label="New Phone Number (Optional)"
          :rules="phoneNumber.length ? phoneNumberValidators : []"
        />

        <span>New Password:</span>
        <password-input
          v-model="password"
          label="New Passwrod (Optional)"
          :rules="password.length ? passwordValidators : []"
        />

        <span>Old Password:</span>
        <password-input
          v-model="oldPassword"
          label="Old password (Required)"
        />

        <div
          class="row flex-center"
          style="gap: 1rem;"
        >
          <span
            v-if="passwordError"
            class="user-already-exist-msg"
          >Oh... Incorrect password entered</span>

          <span
            v-if="changeError"
            class="user-already-exist-msg"
          >Ups... User with this data already exist</span>

          <default-btn
            title="Change"
            outline
            color="red"
            bg-color="white"
            @click="changeUserData"
          />

          <default-btn
            title="Go Profile"
            outline
            color="red"
            bg-color="white"
            to="/profile"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { nameValidators } from 'src/validators/name';
import DefaultBtn from 'components/Buttons/DefaultBtn.vue';
import PasswordInput from 'components/Auth/PasswordInput.vue';
import PhoneInput from 'components/Auth/PhoneInput.vue';
import EmailInput from 'components/Auth/EmailInput.vue';
import { ref } from 'vue';
import { emailValidators } from 'src/validators/email';
import { phoneNumberValidators } from 'src/validators/phoneNumber';
import { passwordValidators } from 'src/validators/password';
import { stringValidator } from 'src/validators/stringValidator';
import { isAxiosError } from 'axios';
import { useUserStore } from 'stores/users';
import { useRouter } from 'vue-router';
import { UpdateUserBody } from 'src/requests/user';

const router = useRouter();

const userStore = useUserStore();

const name = ref<string>('');
const email = ref<string>('');
const phoneNumber = ref<string>('+7 ');
const password = ref<string>('');
const oldPassword = ref<string>('');

const isValidForms = ref<boolean[]>([]);
const changeError = ref<boolean>(false);
const passwordError = ref<boolean>(false);

const changeUserData = async () => {
  isValidForms.value = [];

  const body = { oldPassword: oldPassword.value } as UpdateUserBody;
  isValidForms.value.push(stringValidator(oldPassword.value, passwordValidators));

  if (name.value.length > 1) {
    isValidForms.value.push(stringValidator(name.value, nameValidators));
    body.name = name.value;
  }

  if (email.value.length > 1) {
    isValidForms.value.push(stringValidator(email.value, emailValidators));
    body.email = email.value;
  }

  if (phoneNumber.value.length > 3) {
    isValidForms.value.push(stringValidator(phoneNumber.value, phoneNumberValidators));
    body.phoneNumber = phoneNumber.value;
  }

  if (password.value.length > 1) {
    isValidForms.value.push(stringValidator(password.value, passwordValidators));
    body.password = password.value;
  }

  if (!isValidForms.value.filter((isValid) => !isValid).length) {
    try {
      await userStore.updateUser(body);
      await router.push('/profile');
    } catch (error) {
      if (isAxiosError(error)) {
        switch (error.response?.status) {
          case 409:
            changeError.value = true;
            break;
          case 400:
            passwordError.value = true;
            break;
          default:
            console.error(error);
            break;
        }
      } else {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../css/quasar.variables.scss";
.change-block {
  padding: 25px;
  margin-top: 25px;
  border: 1px solid #000;
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
