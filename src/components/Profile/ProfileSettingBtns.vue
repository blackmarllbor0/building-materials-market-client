<template>
  <default-btn
    title="Log out"
    color="white"
    bg-color="red"
    padding="10px 25px"
    @click="logOut"
  />
  <default-btn
    title="Change Date"
    color="white"
    bg-color="red"
    padding="10px 25px"
    to="/profile/change"
  />
  <default-btn
    title="Delete account"
    color="white"
    bg-color="red"
    padding="10px 25px"
    @click="deleteAccount"
  />

  <confirmation-delete-account
    :show="confirmationOnDeleteAccount"
    :set-show="deleteAccount"
  />
</template>

<script setup lang="ts">
import DefaultBtn from 'components/Buttons/DefaultBtn.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/users';
import { ref } from 'vue';
import ConfirmationDeleteAccount from 'components/Profile/ConfirmationDeleteAccount.vue';

const router = useRouter();

const userStore = useUserStore();

const confirmationOnDeleteAccount = ref<boolean>(false);

const logOut = async () => {
  await userStore.logOut();

  await router.push('/products');
};

const deleteAccount = async () => {
  confirmationOnDeleteAccount.value = !confirmationOnDeleteAccount.value;
};
</script>

<style scoped lang="scss">
@import "src/css/quasar.variables";

button, a {
  border-radius: 15px;
  transition: $transition;

  &:hover {
    background-color: #000 !important;
  }
}
</style>
