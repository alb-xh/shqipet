import { isProduction } from '@shqipet/common/frontend';

export const API_ENDPOINT_URL = isProduction()
  ? `https://${process.env['DOMAIN']}/api`
  : 'http://localhost:3000/api';

export const WS_ENDPOINT_URL = isProduction()
  ? `https://${process.env['DOMAIN']}/ws`
  : 'http://localhost:5000/ws';

export const GOOGLE_CLIENT_ID = process.env['GOOGLE_CLIENT_ID'];
