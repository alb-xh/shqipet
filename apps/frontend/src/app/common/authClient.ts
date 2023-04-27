import axios from 'axios';

import { AUTH_ENDPOINT_URL } from '../constants';

export interface User {
  avatar: string,
  name: string,
}

class AuthClient {
  constructor (private readonly authEndpoint: string) {};

  async signIn (token: string): Promise<User> {
    const { data } = await axios.post(this.authEndpoint, { token }, { withCredentials: true });
    return data;
  }

  async getMe (): Promise<User> {
    const { data } = await axios.get(this.authEndpoint, { withCredentials: true })
    return data;
  }

  async logOut (): Promise<void> {
    await axios.delete(this.authEndpoint, { withCredentials: true });
  }
}

const authClient = new AuthClient(AUTH_ENDPOINT_URL);

export default authClient;
