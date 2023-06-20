const isProd = process.env['NODE_ENV'] === 'production';

export const API_ENDPOINT_URL = isProd
  ? `https://${process.env['DOMAIN']}/api`
  : 'http://localhost:3000/api';

export const CHAT_ENDPOINT_URL = isProd
  ? `https://${process.env['DOMAIN']}/chat`
  : 'http://localhost:5000/chat';

export const GOOGLE_CLIENT_ID = process.env['GOOGLE_CLIENT_ID'];
