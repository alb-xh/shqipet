import { useRef, useEffect, useContext } from 'react';
import axios from 'axios';

import { googleSignInPanel } from './styles';
import UserContext from '../common/user.context';
import { GOOGLE_CLIENT_ID, USER_INFO_ENDPOINT_URL } from '../constants';

const googleButtonOptions = {
  shape: 'circle',
  theme: 'filled_blue',
  size: 'large',
  type: 'standard',
};

export default function GoogleSignIn () {
  const { setUser, setLoading } = useContext(UserContext);
  const ref = useRef(null);

  const callback = async (res: any, error: any) => {
    if (error) {
      alert('Something went wrong sorry!');
    } else {
      setLoading(true);

      const { data } = await axios.request({
        method: 'POST',
        url: USER_INFO_ENDPOINT_URL,
        data: { token: res.credential },
        withCredentials: true,
      });

      setLoading(false);
      setUser(data);
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
