import { io, Socket } from 'socket.io-client';

import { Geo } from './usersClient';
import { CHAT_ENDPOINT_URL } from '../config';

export enum Event {
  UpdateUsers = 'update_users',
  NewMessage = 'new_message',
};

export type UserData = { geo: Geo };
export type UsersMap = Record<string, UserData>;

class ChatSocket {
  private readonly socket: Socket;

  constructor (url: string) {
    this.socket = io(url, { autoConnect: false });
  };

  async onUpdateUsers (cb: (usersMap: UsersMap) => void) {
    this.socket.on(Event.UpdateUsers, cb);
  }

  connect () {
    this.socket.connect();
  }

  disconnect () {
    this.socket.disconnect();
  }
}

const chatSocket = new ChatSocket(CHAT_ENDPOINT_URL);

export default chatSocket;
