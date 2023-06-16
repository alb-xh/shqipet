import { Loading, useLogout } from '../../common';

export const Logout = () => {
  useLogout();
  return (<Loading />);
}
