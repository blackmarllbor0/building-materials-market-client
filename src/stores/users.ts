import { defineStore } from 'pinia';
import {
  LogInBody, RegisterBody, UpdateUserBody, useUserRequest,
} from 'src/requests/user';

export interface User {
  id: number;
  userRoleId: number;
  userStatusId: number;
  name: string;
  email: string;
  phoneNumber: string;
  createDate: Date;
  updateDate: Date;
}

const userRequest = useUserRequest();

export const useUserStore = defineStore('users', {
  state: () => ({
    currentUser: { } as User,
  }),
  getters: {
    userIsAuth: ({ currentUser }) => !!Object.keys(currentUser).length,
  },
  actions: {
    async register(body: RegisterBody) {
      this.currentUser = await userRequest.register(body);
    },
    async loginUser(body: LogInBody) {
      this.currentUser = await userRequest.login(body);
    },
    async authUser() {
      this.currentUser = await userRequest.auth();
    },
    async logOut() {
      await userRequest.logOut();

      this.currentUser = {} as User;
    },
    async updateUser(body: UpdateUserBody) {
      this.currentUser = await userRequest.updateUser(this.currentUser.id, body);
    },
    async deleteUser(oldPassword: string) {
      await userRequest.deleteUser(this.currentUser.id, oldPassword);

      await this.logOut();

      this.currentUser = {} as User;
    },
  },
});
