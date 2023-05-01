import { useContext } from 'react';
import Earth from './earth.component';
import GroupChat from './group-chat.component';

import { pageStyle } from './styles';
import UserContext from '../common/user.context';

function MainPage() {
  const { user } = useContext(UserContext);

  return (
    <div style={pageStyle}>
      <Earth />
      { user ? <GroupChat /> : null }
    </div>
  );
}

export default MainPage;


