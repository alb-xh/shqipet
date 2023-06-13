import { io } from 'socket.io-client';

import { CHAT_ENDPOINT_URL } from '../config';

const { origin, pathname } = new URL(CHAT_ENDPOINT_URL);

export const chatSocket = io(origin, { path: pathname, autoConnect: false, withCredentials: true });
