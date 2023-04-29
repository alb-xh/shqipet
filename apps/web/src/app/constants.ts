const protocol = process.env['SECURE'] === 'true' ? 'https' : 'http';
const domain = process.env['DOMAIN'] === 'localhost'
  ? `localhost:${process.env['USERS_PORT']}`
  : process.env['DOMAIN'];

const domainUrl = `${protocol}://${domain}`;

export const USERS_ENDPOINT_URL = `${domainUrl}/${process.env['USERS_PREFIX']}`;
export const GOOGLE_CLIENT_ID = process.env['GOOGLE_CLIENT_ID'];
