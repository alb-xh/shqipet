import { Box, AvatarGroup, Avatar, IconButton, TextField, Tooltip } from "@mui/material"
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LinkIcon from '@mui/icons-material/Link';

import { useAlerts, useGoHome, useRoom, useUser } from "../../common";
import { Path } from "../../constants";

const isRoomId = (id: string) =>  id.length === 10;

export const Rooms = () => {
  const goHome = useGoHome();
  const navigate = useNavigate();
  const { mustLoginAlert } = useAlerts();
  const { user } = useUser();
  const { id } = useParams();
  const { room, joinRoom } = useRoom();

  const noAccess = !user || !isRoomId(id);
  const joining = !room || !room || room.id !== id;
  const roomIsReady = room && room.members.length === room.size;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}${Path.Room.replace(':id', room.id)}`)
  };

  useEffect(() => {
    if (noAccess) {
      mustLoginAlert();
      goHome();

      return;
    }

    if (joining) {
      joinRoom({ id, user });
      return;
    }

    if (roomIsReady) {
      navigate(`${Path.Games}/${room.title}`);
      return;
    }
  }, [ id, user, noAccess, joining, roomIsReady ]);

  if (noAccess || joining) {
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
          room && Array.from({ length: room.size }).map((_, i) => (
            <Avatar
              key={i}
              alt={room.members[i]?.name || 'user'}
              src={room.members[i]?.avatar}
            />
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
          value={id}
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