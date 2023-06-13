import { useEffect, useState, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Path } from '../../constants';
import { appContext, userClient, Loading } from '../../common';

import { GoogleSignIn } from './google-sign-in.component';

export const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, setUser } = useContext(appContext);

  const redirect = searchParams.has('redirect');

  if (user) {
    navigate(Path.Root);
    return null;
  }

  if (user === undefined) {
    userClient.getMe()
      .then((userInfo) => {
        setUser(userInfo);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        if (redirect) {
          navigate(Path.Root);
        }
      })

    return <Loading />;
  }

  if (redirect) {
    return null;
  }

  return (
    <GoogleSignIn />
  );
}
