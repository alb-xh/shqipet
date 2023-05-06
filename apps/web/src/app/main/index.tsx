import { Box } from '@mui/material';

import Earth from './earth.component';
import GroupChat from './group-chat.component';

import { pageStyle } from './styles';

function MainPage() {
  return (
    <Box style={pageStyle}>
      <Earth />
      <GroupChat />
    </Box>
  );
}

export default MainPage;


