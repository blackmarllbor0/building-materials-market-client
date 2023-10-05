<template>
  <div class="user-profile-info">
    <div class="status-wrapper row bi-align-start">
      <span>Online</span>
      <div class="status-injector cursor-pointer row flex-center text-white">
        i
      </div>
    </div>

    <div class="name-wrapper row bi-align-start">
      <div class="text-h2">
        {{ name }}
      </div>
      <div class="injector row flex-center text-white cursor-pointer">
        i
      </div>
    </div>

    <a
      class="text-h6 text-weight-regular text-black email"
      :href="`https://${email}`"
      target="_blank"
    >
      {{ email }}
    </a>
    <div class="text-h6 text-weight-regular">
      {{ phoneNumber }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from 'stores/users';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { currentUser: { value: { name, email, phoneNumber } } } = storeToRefs(userStore);
</script>

<style scoped lang="scss">
@import "src/css/quasar.variables";

.status-injector,
.injector {
  border-radius: 50%;
  margin-left: 10px;

  transition: $transition;
}

.status-injector {
  background-color: #16FF02;
  width: 8px;
  height: 8px;

  &:hover {
    width: 12px;
    height: 12px;
  }
}

.injector {
  background-color: red;
  width: 16px;
  height: 16px;

  &:hover {
    width: 20px;
    height: 20px;
  }
}

.email {
  text-decoration: underline;
}
</style>
