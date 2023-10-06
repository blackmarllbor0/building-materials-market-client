<template>
  <div class="user-profile-info">
    <div class="status-wrapper row bi-align-start">
      <span>{{ userStatusName }}</span>
      <div
        class="status-injector cursor-pointer row flex-center text-white"
      >
        i
      </div>
    </div>

    <div class="name-wrapper row bi-align-start">
      <div class="text-h2">
        {{ currentUser.name }}
      </div>
      <div class="injector row flex-center text-white cursor-pointer">
        i
        <q-popup-proxy>
          <div class="text-subtitle1 q-pa-xs">
            Registered {{ moment(currentUser.createDate).format('MMMM Do YYYY, h:mm:ss a') }}
            <br>
            Updated {{ moment(currentUser.updateDate).format('MMMM Do YYYY, h:mm:ss a') }}
          </div>
        </q-popup-proxy>
      </div>
    </div>

    <a
      class="text-h6 text-weight-regular text-black email"
      :href="`https://${currentUser.email}`"
      target="_blank"
    >
      {{ currentUser.email }}
    </a>
    <div class="text-h6 text-weight-regular">
      {{ currentUser.phoneNumber }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from 'stores/users';
import { storeToRefs } from 'pinia';
import { useUserStatusStore } from 'stores/userStatus';
import { onMounted, ref } from 'vue';
import { useUserStatusRequests } from 'src/requests/userStatus';
import moment from 'moment';

const userStore = useUserStore();
const { currentUser } = storeToRefs(userStore);

const userStatusStore = useUserStatusStore();

const userStatusRequest = useUserStatusRequests();

const userStatusName = ref<string>('');

onMounted(async () => {
  await userStatusStore.fetchUserStatuses({ offsetLimit: { limit: 5 } });

  const { name } = await userStatusRequest.getById(currentUser.value.userStatusId);

  userStatusName.value = name[0].toUpperCase() + name.slice(1);
});
</script>

<style scoped lang="scss">
@import "src/css/quasar.variables";

.user-profile-info {
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
}
</style>
