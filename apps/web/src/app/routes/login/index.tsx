import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser, useRedirect } from '../../common';
import { LoginForm } from './login-form.component';

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

  return <LoginForm />;
}
