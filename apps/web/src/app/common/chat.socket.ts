import { io, Socket } from 'socket.io-client';

import { Geo } from './usersClient';
import { CHAT_ENDPOINT_URL } from '../config';

export enum Event {
  AddUser = 'add_user',
  RemoveUser = 'remove_user',
  UpdateUsers = 'update_users',
  NewMessage = 'new_message',
};

export type UserData = { geo: Geo };
export type UsersMap = Record<string, UserData>;

class ChatSocket {
  private readonly socket: Socket;

  constructor (url: string) {
    const { origin, pathname } = new URL(url);
    this.socket = io(origin, { autoConnect: false, path: pathname });
  };

  async onUpdateUsers (cb: (usersMap: UsersMap) => void) {
    this.socket.on(Event.UpdateUsers, cb);
  }

  isConnected (): boolean {
    return this.socket.connected;
  }

  connect (user: UserData) {
    this.socket.connect();
    this.socket.emit(Event.AddUser, user);
  }

  disconnect () {
    this.socket.emit(Event.RemoveUser);
    this.socket.disconnect();
  }
}

const chatSocket = new ChatSocket(CHAT_ENDPOINT_URL);

export default chatSocket;
