import { useRef, useEffect, useContext } from 'react';
import { googleSignInPanel } from './styles';
import UserContext from '../common/user.context';
import { GOOGLE_CLIENT_ID } from '../constants';

const googleButtonOptions = {
  shape: 'circle',
  theme: 'filled_blue',
  size: 'large',
  type: 'standard',
};

export default function GoogleSignIn () {
  const { setUser } = useContext(UserContext);
  const ref = useRef(null);

  const callback = async (res: any, error: any) => {
    if (error) {
      alert('Something went wrong sorry!');
    } else {
      console.log(res);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setUser({ name: 'John', lastName: 'Doe' });
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
