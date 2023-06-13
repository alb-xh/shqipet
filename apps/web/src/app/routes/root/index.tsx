import { Box } from '@mui/material';
import { useContext } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';

import { appContext } from '../../common/app.context';
import { Path } from '../../constants';
import { RootLayout } from './layout';
import { Earth } from './earth.component';
import { GroupChat } from './group-chat.component';

const Root = () => {
  const navigate = useNavigate();
  const openChat = useMatch(Path.Chat);
  const { user } = useContext(appContext);

  if (user === undefined) {
    navigate(Path.Login + '?redirect=true');

    return null;
  }

  return (
    <Box className="main">
      <Earth/>
      { openChat && <GroupChat />}
    </Box>
  )
};

export { Root, RootLayout };
