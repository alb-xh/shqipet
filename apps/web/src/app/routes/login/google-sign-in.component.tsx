import { useRef, useEffect, useContext } from 'react';

import AppContext from '../../common/app.context';
import usersClient from '../../common/usersClient';

import { GOOGLE_CLIENT_ID } from '../../config';
import { Box } from '@mui/material';
import { isSmallDevice } from '../../helpers';

export const GoogleSignIn = () => {
  const { setUser, setLoading, setLogin, setAlert } = useContext(AppContext);
  const ref = useRef(null);

  const callback = async (res: any, error: any) => {
    if (error) {
      setAlert({ severity: 'error',  text: 'Something went wrong!' });
    } else {
      setLoading(true);

      const user = await usersClient.signIn(res.credential);

      setUser(user);
      setLogin(false);
      setLoading(false);
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
