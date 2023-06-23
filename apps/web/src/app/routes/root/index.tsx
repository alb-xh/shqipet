import { Box } from '@mui/material';
import { useMatch } from 'react-router-dom';

import { Path } from '../../constants';
import { RootLayout } from './layout';
import { Earth } from './earth.component';
import { GroupChat } from './group-chat.component';;

const Root = () => {
  const openChat = useMatch(Path.Chat);

  return (
    <Box className="main">
      <Earth/>
      { openChat && <GroupChat />}
    </Box>
  )
};

export { Root, RootLayout };
