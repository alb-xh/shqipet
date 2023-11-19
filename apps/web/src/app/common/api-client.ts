import axios from 'axios';
import { CreateUser, PublicUser } from '@shqipet/common';

import { API_ENDPOINT_URL } from '../config';

class ApiClient {
  constructor (private readonly baseUrl: string) {};

  get usersEndpoint (): string {
    return `${this.baseUrl}/users`;
  }

  get meEndpoint (): string {
    return `${this.baseUrl}/me`;
  }

  async createUser (createUserDto: CreateUser): Promise<PublicUser> {
    const { data } = await axios.post(this.usersEndpoint, createUserDto, { withCredentials: true });
    return data;
  }

  async getMe (): Promise<PublicUser> {
    const { data } = await axios.get(this.meEndpoint, { withCredentials: true })
    return data;
  }

  async signIn (token: string): Promise<PublicUser> {
    const { data } = await axios.post(this.meEndpoint, { token }, { withCredentials: true });
    return data;
  }

  async signOut (): Promise<void> {
    await axios.post(`${this.meEndpoint}/sign-out`, null, { withCredentials: true });
  }
}

export const apiClient = new ApiClient(API_ENDPOINT_URL);
