import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser, useRedirect } from '../../common';
import { GoogleSignIn } from './google-sign-in.component';

export const Login = () => {
  const navigate = useNavigate();
  const to = useRedirect();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      navigate(to);
    }
  }, [ user, navigate, to ]);

  if (user) {
    return null;
  }

  return <GoogleSignIn />;
}
