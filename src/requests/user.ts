import { api } from 'boot/axios';
import { User } from 'stores/users';

export interface RegisterBody {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface LogInBody {
  email?: string;
  phoneNumber?: string;
  password: string;
}

const userPath = '/users';
const authPath = '/auth';

export const useUserRequest = () => ({
  async register(body: RegisterBody) {
    const { data } = await api.post(userPath, body);

    return data as User;
  },
  async login(body: LogInBody) {
    const { data } = await api.post(`${authPath}/log-in`, body);

    return data as User;
  },
  async auth() {
    const { data } = await api.get(authPath);

    return data as User;
  },
  async logOut() {
    await api.get(`${authPath}/log-out`);
  },
});
