export const USERS_ENDPOINT_URL = process.env['DOMAIN'] === 'localhost'
  ? `http://localhost:${process.env['USERS_PORT']}/${process.env['USERS_PREFIX']}`
  : `https://${process.env['DOMAIN']}/${process.env['USERS_PREFIX']}`;

export const GOOGLE_CLIENT_ID = process.env['GOOGLE_CLIENT_ID'];
