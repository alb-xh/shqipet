import axios from 'axios';

import { USERS_ENDPOINT_URL } from '../constants';

export interface User {
  avatar: string,
  name: string,
}

class UsersClient {
  constructor (private readonly usersEndpoint: string) {};

  async signIn (token: string): Promise<User> {
    const { data } = await axios.post(this.usersEndpoint, { token }, { withCredentials: true });
    return data;
  }

  async getMe (): Promise<User> {
    const { data } = await axios.get(this.usersEndpoint, { withCredentials: true })
    return data;
  }

  async logOut (): Promise<void> {
    await axios.delete(this.usersEndpoint, { withCredentials: true });
  }
}

const usersClient = new UsersClient(USERS_ENDPOINT_URL);

export default usersClient;
