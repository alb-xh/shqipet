import { Box, AvatarGroup, Avatar, IconButton, TextField, Tooltip } from "@mui/material"
import shortUniqId from 'short-unique-id';
import { useContext, useEffect } from "react";
import LinkIcon from '@mui/icons-material/Link';

import { appContext, useGoHome, useQueryParam } from "../../common";
import { Games, Path } from "../../constants";

const uid = new shortUniqId({ length: 10 });

const playerPerGame = {
  [Games.Chess]: 2,
};

export const Rooms = () => {
  const goHome = useGoHome();
  const id = useQueryParam('id');
  const game = useQueryParam('for');
  const { user } = useContext(appContext);

  const validGame = game && !!playerPerGame[game];
  const noAccess = !user || (!id && !validGame);

  console.log('user', user);
  console.log('id', id);
  console.log('game', game);
  console.log('validGame', validGame);
  console.log('noAccess', noAccess);

  const currentId = id || uid.randomUUID();
  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}${Path.Rooms}?id=${currentId}`)
  }

  useEffect(() => {
    if (noAccess) {
      goHome();
      return;
    }

  }, [ noAccess, goHome ]);

  if (noAccess) {
    return null;
  }

  return (
    <Box
      width='100%'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      marginTop='150px'
    >
      <AvatarGroup max={6}>
        {
          Array.from({ length: playerPerGame[game]  }).map((_, index) => (
            <Avatar key={index} alt="Remy Sharp" src="https://lh3.googleusercontent.com/a/AAcHTteGse2obkpmEoYu07EK-pQ7YFIXy1rD6i1wy3Zu2Q=s96-c" />
          ))
        }
      </AvatarGroup>

        <TextField
          id="outlined-basic"
          label="Room"
          variant="outlined"
          focused
          sx={{
            width: '150px',
            backgroundColor: '#1a73e80a',
            marginTop: '40px',
          }}
          inputProps={{ style: { color: "white" } }}
          autoComplete="off"
          value={currentId}
        />
        <Tooltip title="Copy room link" placement='right-end'>
          <IconButton
              size="large"
              color="primary"
              aria-label="share room"
              sx={{
                opacity: '0.8',
                '&:hover': {
                  opacity: '1',
                },
              }}
              onClick={handleCopy}
            >
            <LinkIcon />
          </IconButton>
        </Tooltip>
    </Box>
  )
}