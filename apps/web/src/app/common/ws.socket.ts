import { io } from 'socket.io-client';

import { WS_ENDPOINT_URL } from '../config';

const { origin, pathname } = new URL(WS_ENDPOINT_URL);

export const wsSocket = io(origin, { path: pathname, autoConnect: false, withCredentials: true });
