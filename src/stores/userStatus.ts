import { defineStore } from 'pinia';
import { UserStatusParams, useUserStatusRequests } from 'src/requests/userStatus';

export interface UserStatus {
  id: number;
  name: string;
  createDate: Date;
  updateDate: Date;
}

const userStatusRequest = useUserStatusRequests();

export const useUserStatusStore = defineStore('userStatuses', {
  state: () => ({
    userStatuses: [] as UserStatus[],
  }),
  actions: {
    async fetchUserStatuses(params: UserStatusParams) {
      this.userStatuses = await userStatusRequest.getAll(params);
    },
  },
});
