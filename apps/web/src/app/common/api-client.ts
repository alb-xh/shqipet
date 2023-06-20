import axios from 'axios';
import { UserInfo } from '@shqipet/common';

import { API_ENDPOINT_URL } from '../config';

class ApiClient {
  private readonly meEndpoint: string;
  constructor (apiEndpoint: string) {
    this.meEndpoint = `${apiEndpoint}/users/me`;
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

export const apiClient = new ApiClient(API_ENDPOINT_URL);
