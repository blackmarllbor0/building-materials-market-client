<template>
  <q-btn
    v-if="userIsAuth"
    :icon="matAccountCircle"
    color="none"
    dense
    fab-mini
    unelevated
    class="user-profile"
  >
    <q-menu
      max-width="400px"
      transition-show="slide-left"
      transition-hide="slide-right"
      style="width: 100vw"
      class="row flex-center"
    >
      <div class="row no-wrap q-pa-md wid">
        <div class="column">
          <div class="text-h6 q-mb-md row flex-center">
            Settings
          </div>
          <default-btn
            title="account management"
            color="red"
            bg-color="white"
            style="border-radius: 15px"
            to="/profile"
          />
          <default-btn
            v-if="userRoleId === 2"
            title="admin panel"
            color="red"
            bg-color="white"
            style="border-radius: 15px"
          />
          <default-btn
            title="orders"
            color="red"
            bg-color="white"
            style="border-radius: 15px"
          />
        </div>

        <q-separator
          vertical
          inset
          class="q-mx-lg"
        />

        <div class="column items-center">
          <q-avatar size="72px">
            <img
              src="src/assets/profile-icon-png-898.png"
              alt="User Account"
            >
          </q-avatar>

          <div class="text-subtitle1 q-mt-md q-mb-xs">
            {{ name }}
          </div>

          <default-btn
            title="Log out"
            color="red"
            bg-color="white"
            style="border-radius: 15px; width: 150px"
            @click="logOut"
          />
        </div>
      </div>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { matAccountCircle } from '@quasar/extras/material-icons';
import { useUserStore } from 'stores/users';
import { storeToRefs } from 'pinia';
import DefaultBtn from 'components/Buttons/DefaultBtn.vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const { userIsAuth, currentUser: { value: { name, userRoleId } } } = storeToRefs(userStore);

const router = useRouter();

const logOut = async () => {
  await userStore.logOut();

  await router.push('/products');
};
</script>

<style lang="scss">
@import "src/css/app.scss";
@import "src/css/quasar.variables";

.user-profile {
  @include link(15px);
}

a.user-profile-options {
  text-decoration: none;
  padding: 10px 15px;
  transition: $transition;

  &:hover {
    background: lighten(#000, 90);
    border-radius: 15px;
  }
}

.q-btn:before {
  box-shadow: none !important;
}
</style>
