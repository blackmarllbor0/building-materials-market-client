<template>
  <div class="profile row justify-between">
    <user-profile-info />
    <profile-setting-btns />
  </div>
</template>

<script setup lang="ts">
import UserProfileInfo from 'components/Profile/UserProfileInfo.vue';
import ProfileSettingBtns from 'components/Profile/ProfileSettingBtns.vue';
</script>

<style lang="scss">
.profile {
  padding-top: 50px;
  align-items: start;
}
</style>
