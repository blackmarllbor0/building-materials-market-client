import { api, OffsetLimit } from 'boot/axios';
import { UserStatus } from 'stores/userStatus';

export interface UserStatusParams {
  offsetLimit: OffsetLimit;
  userStatusId: number;
}

const path = 'user-statuses';
export const useUserStatusRequests = () => ({
  async getAll(params?: UserStatusParams) {
    const { data } = await api.get(path, {
      params: { ...params?.offsetLimit, ...params },
    });

    return data as UserStatus[];
  },
  async getById(id: number) {
    const { data } = await api.get(`${path}/${id}`);
    return data as UserStatus;
  },
});
