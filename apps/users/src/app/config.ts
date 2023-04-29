export const config = () => ({
  port: 3000,
  origin: 'localhost',
  clientId: '330264053019-d7lg77hvhofhe5m5eqe2tlv5pomoardd.apps.googleusercontent.com',
  cookieName: 'me',
  cookieOptions: {
    domain: 'localhost',
    path: '/users',
    secure: false,
    httpOnly: true,
    sameSite: true,
  },
});
