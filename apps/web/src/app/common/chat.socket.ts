import { io } from 'socket.io-client';

import { CHAT_ENDPOINT_URL } from '../config';

const { origin, pathname } = new URL(CHAT_ENDPOINT_URL);
const chatSocket = io(origin, { autoConnect: false, path: pathname });

export default chatSocket;
