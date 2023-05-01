import axios from 'axios';

import { USERS_ENDPOINT_URL } from '../config';

export interface User {
  avatar: string,
  name: string,
  geo: {
    name?: string,
    code?: string,
    city?: string,
    lat?: number,
    lng?: number,
  }
}

class UsersClient {
  private readonly meEndpoint: string;
  constructor (usersEndpoint: string) {
    this.meEndpoint = `${usersEndpoint}/me`;
  };

  async signIn (token: string): Promise<User> {
    const { data } = await axios.post(this.meEndpoint, { token }, { withCredentials: true });
    return data;
  }

  async getMe (): Promise<User> {
    const { data } = await axios.get(this.meEndpoint, { withCredentials: true })
    return data;
  }

  async logOut (): Promise<void> {
    await axios.delete(this.meEndpoint, { withCredentials: true });
  }
}

const usersClient = new UsersClient(USERS_ENDPOINT_URL);

export default usersClient;
