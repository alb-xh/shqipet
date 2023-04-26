import { useRef, useEffect } from 'react';
import { googleSignInPanel } from './styles';

const client_id = '330264053019-d7lg77hvhofhe5m5eqe2tlv5pomoardd.apps.googleusercontent.com';
const userKey = 'user';

const googleButtonOptions = {
  shape: 'circle',
  theme: 'filled_blue',
  size: 'large',
  type: 'standard',
};

const callback = async (res: any, error: any) => {
  if (error) {
    alert('Something went wrong sorry!');
  } else {
    console.log(res);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    localStorage.setItem(userKey, JSON.stringify({ name: 'John', lastName: 'Doe' }));
    window.location.reload();
  }
};

const win = (window as any);

export default function GoogleSignIn () {
  const ref = useRef(null);

  useEffect(() => {
      if (ref.current) {
        win.google.accounts.id.initialize({ client_id, callback });
        win.google.accounts.id.renderButton(ref.current, googleButtonOptions);
      }
  }, [ ref.current ]);


  return <div style={googleSignInPanel} ref={ref} />;
}
