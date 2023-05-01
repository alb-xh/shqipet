import Earth from './earth.component';
import GroupChat from './group-chat.component';

import { pageStyle } from './styles';

function MainPage() {
  return (
    <div style={pageStyle}>
      <Earth />
      <GroupChat />
    </div>
  );
}

export default MainPage;


