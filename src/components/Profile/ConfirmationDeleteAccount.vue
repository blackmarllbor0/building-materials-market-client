<template>
  <q-dialog
    v-model="show"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card
      class="bg-teal text-white bg-red-8"
      style="width: auto"
    >
      <q-card-section class="bg-red-8">
        <div class="text-h6">
          Are you sure you want to delete your account?
        </div>
      </q-card-section>

      <q-card-actions
        align="right"
        class="bg-white text-teal"
      >
        <q-btn
          flat
          label="No"
          class="bg-red-8 text-white"
          @click="setShow"
        />
        <q-btn
          flat
          label="Yes"
          class="bg-red-8 text-white"
          @click="confirm"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="isDelete"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card
      class="bg-teal text-white bg-red-8"
      style="width: auto"
    >
      <q-card-section class="bg-red-8">
        <div class="text-h6">
          Enter your password to continue
        </div>
      </q-card-section>

      <q-card-section class="bg-red-3 text-white">
        <password-input
          v-model="password"
          class="text-white"
        />
      </q-card-section>

      <q-card-actions
        align="right"
        class="bg-white text-teal"
      >
        <q-btn
          flat
          label="Cancel"
          class="bg-red-8 text-white"
          @click="cancel"
        />
        <q-btn
          flat
          label="Delete account"
          class="bg-red-8 text-white"
          @click="deleteAccount"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import PasswordInput from 'components/Auth/PasswordInput.vue';
import { stringValidator } from 'src/validators/stringValidator';
import { passwordValidators } from 'src/validators/password';
import { useUserStore } from 'stores/users';
import { isAxiosError } from 'axios';
import { useRouter } from 'vue-router';

const props = defineProps<{show: boolean, setShow:() => void}>();
const { show, setShow } = toRefs(props);

const userStore = useUserStore();

const router = useRouter();

const isDelete = ref<boolean>(false);

const password = ref<string>('');

const isValidForms = ref<boolean[]>([]);
const passwordError = ref<boolean>(false);

const confirm = () => {
  props.setShow();
  isDelete.value = true;
};

const cancel = () => {
  isDelete.value = false;
};

const deleteAccount = async () => {
  isValidForms.value.push(stringValidator(password.value, passwordValidators));

  if (!isValidForms.value.filter((isValid) => !isValid).length) {
    try {
      await userStore.deleteUser(password.value);

      await router.push('/log-in');

      isDelete.value = false;
    } catch (error) {
      if (isAxiosError(error)) {
        switch (error.response?.status) {
          case 400:
            passwordError.value = true;
            break;
          case 401:
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
