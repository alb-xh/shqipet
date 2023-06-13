import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Path } from '../../constants';
import { userClient, Loading, appContext } from '../../common';

export const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(appContext);

  useEffect(() => {
    userClient.logOut()
      .then(() => {
        setUser(null);
        navigate(Path.Root);
      });
  }, [ navigate, setUser ])

  return (<Loading />);
}
