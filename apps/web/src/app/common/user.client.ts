import axios from 'axios';
import { UserInfo } from '@shqipet/common';

import { USERS_ENDPOINT_URL } from '../config';

class UserClient {
  private readonly meEndpoint: string;
  constructor (usersEndpoint: string) {
    this.meEndpoint = `${usersEndpoint}/me`;
  };

  async signIn (token: string): Promise<UserInfo> {
    const { data } = await axios.post(this.meEndpoint, { token }, { withCredentials: true });
    return data;
  }

  async getMe (): Promise<UserInfo> {
    const { data } = await axios.get(this.meEndpoint, { withCredentials: true })
    return data;
  }

  async logOut (): Promise<void> {
    await axios.delete(this.meEndpoint, { withCredentials: true });
  }
}

export const userClient = new UserClient(USERS_ENDPOINT_URL);
