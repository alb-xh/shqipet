export const AUTHOR_GITHUB_URL = 'https://github.com/alb-xh';

export enum Path {
  Root = '/',
  Games = '/games',
  Chess = '/games/chess',
  Chat = '/chat',
  Room = '/rooms/:id',
  Login = '/login',
  Logout = '/logout',
  Posts = '/posts',
  Profile = '/profile',
  Register = '/register',
  ResetPassword = '/reset-password',
};

export enum Games {
  Chess = 'chess',
  Murlan = 'murlan',
};

export const markerIcon = `<svg viewBox="-4 0 36 36">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="black" cx="14" cy="14" r="7"></circle>
  </svg>`;
