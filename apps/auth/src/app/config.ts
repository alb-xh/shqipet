export const config = () => ({
  port: 3000,
  origin: 'localhost',
  clientId: '330264053019-d7lg77hvhofhe5m5eqe2tlv5pomoardd.apps.googleusercontent.com',
  cookieName: 'auth',
  cookieOptions: {
    domain: 'localhost',
    path: '/auth',
    secure: false,
    httpOnly: true,
    sameSite: true,
  },
});
