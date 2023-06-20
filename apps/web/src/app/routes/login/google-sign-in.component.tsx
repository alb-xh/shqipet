import { useRef, useEffect } from 'react';
import { Box } from '@mui/material';

import { GOOGLE_CLIENT_ID } from '../../config';
import { isSmallDevice } from '../../helpers';
import { useAlerts, useGoHome, useUser, apiClient } from '../../common';

export const GoogleSignIn = () => {
  const ref = useRef(null);
  const goHome = useGoHome();

  const { user, setUser } = useUser();
  const { unexpectedAlert } = useAlerts();

  useEffect(() => {
    if (user) {
      goHome();
      return;
    }

    if (!ref.current) {
      return;
    }

    const handleError = () => {
      unexpectedAlert();
      setUser(null);
    }

    const callback = (res, error) => {
      if (error) {
        handleError();
        return;
      }

      return apiClient.signIn(res.credential)
        .then(setUser)
        .catch(handleError);
    };

    const w = (window as any);
    w.google.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, callback });
    w.google.accounts.id.renderButton(ref.current, {
      shape: 'circle',
      theme: 'filled_blue',
      type: 'standard',
      size: isSmallDevice() ? 'medium' : 'large',
    });

  }, [ ref.current, user, setUser, unexpectedAlert ]);

  if (!user) {
    return (
      <Box className='google-sign-in-panel' ref={ref} />
    )
  }

  return null;
}
