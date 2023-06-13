import { useRef, useEffect, useContext } from 'react';

import { appContext } from '../../common/app.context';
import { userClient } from '../../common/user.client';

import { GOOGLE_CLIENT_ID } from '../../config';
import { Box } from '@mui/material';
import { isSmallDevice } from '../../helpers';

export const GoogleSignIn = () => {
  const ref = useRef(null);

  const { setUser, setAlert } = useContext(appContext);

  const callback = async (res: any, error: any) => {
    if (error) {
      setAlert({ severity: 'error',  text: 'Something went wrong!' });
      setUser(null);
    } else {
      try {
        const user = await userClient.signIn(res.credential)
        setUser(user);
      } catch {
        setAlert({ severity: 'error',  text: 'Something went wrong!' });
        setUser(null);
      }
    }
  };

  useEffect(() => {
      if (ref.current) {
        const win = (window as any);
        win.google.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, callback });
        win.google.accounts.id.renderButton(ref.current, {
          shape: 'circle',
          theme: 'filled_blue',
          type: 'standard',
          size: isSmallDevice() ? 'medium' : 'large',
        });
      }
  }, [ ref.current ]);

  return (
    <Box className='google-sign-in-panel' ref={ref} />
  )
}
