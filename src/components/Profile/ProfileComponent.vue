<template>
  <div class="profile row justify-between">
    <user-profile-info />

    <default-btn
      title="Log out"
      color="white"
      bg-color="red"
      style="border-radius: 15px; width: 150px"
      padding="10px 25px"
      @click="logOut"
    />
  </div>
</template>

<script setup lang="ts">
import UserProfileInfo from 'components/Profile/UserProfileInfo.vue';
import DefaultBtn from 'components/Buttons/DefaultBtn.vue';
import { useUserStore } from 'stores/users';
import { useRouter } from 'vue-router';

const router = useRouter();

const userStore = useUserStore();

const logOut = async () => {
  await userStore.logOut();

  await router.push('/home');
};
</script>

<style scoped lang="scss">
.profile {
  padding-top: 50px;
  align-items: start;
}
</style>
