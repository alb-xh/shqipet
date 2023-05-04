import { useRef, useEffect, useContext } from 'react';

import { googleSignInPanel } from './styles';
import AppContext from '../common/app.context';
import usersClient from '../common/usersClient';
import chatSocket from '../common/chat.socket';

import { GOOGLE_CLIENT_ID } from '../config';

const googleButtonOptions = {
  shape: 'circle',
  theme: 'filled_blue',
  size: 'large',
  type: 'standard',
};

export default function GoogleSignIn () {
  const { setUser, setLoading, setLogin } = useContext(AppContext);
  const ref = useRef(null);

  const callback = async (res: any, error: any) => {
    if (error) {
      alert('Something went wrong sorry!');
    } else {
      setLoading(true);

      const user = await usersClient.signIn(res.credential);
      chatSocket.connect();

      setUser(user);
      setLogin(false);
      setLoading(false);
    }
  };

  useEffect(() => {
      if (ref.current) {
        const win = (window as any);
        win.google.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, callback });
        win.google.accounts.id.renderButton(ref.current, googleButtonOptions);
      }
  }, [ ref.current ]);


  return <div style={googleSignInPanel} ref={ref} />;
}
