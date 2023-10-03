import { defineStore } from 'pinia';

export interface User {
  id: number;
  categoryId: number;
  userStatusId: number;
  name: string;
  email: string;
  createDate: Date;
  updateDate: Date;
}

export const useUserStore = defineStore('users', {
  state: () => ({
    isRegistered: false,
  }),
  actions: {
    setUserRegisterStatus(status: boolean) {
      this.isRegistered = status;
    },
  },
});
