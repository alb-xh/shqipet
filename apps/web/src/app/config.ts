const isProd = process.env['NODE_ENV'] === 'production';

export const USERS_ENDPOINT_URL = isProd
  ? `https://${process.env['DOMAIN']}/users`
  : 'http://localhost:3000/users';

export const CHAT_ENDPOINT_URL = isProd
  ? `https://${process.env['DOMAIN']}/chat`
  : 'http://localhost:5000/chat';

export const GOOGLE_CLIENT_ID = process.env['GOOGLE_CLIENT_ID'];
