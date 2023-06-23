import Avatar from '@mui/material/Avatar';
import { Box, Button, Paper, TextField } from '@mui/material';
import { useEffect } from 'react';

import { useMessages, useGoHome } from '../../common';

const messagesPanelId = 'message-panel';

export const GroupChat = () => {
  const goHome = useGoHome();

  const {
    messages,
    message,
    send,
    type,
    submit,
  } = useMessages();

  useEffect(() => {
    const panel = document.getElementById(messagesPanelId);

    if (panel) {
      panel.scrollTop = panel.scrollHeight;
    }

  }, [ messages ]);

  return (
    <Paper className='group-chat'>
      <Box id={messagesPanelId} className="messages-panel">
        {
          messages.map((message, i) => (
            <Box key={i} className="message">
              <Avatar
                className='avatar'
                src={message.user.avatar}
                alt={`${message.user.name} avatar`}
              />
              <Box>
                <Box>{message.user.name}</Box>
                <Box
                  component="span"
                  dangerouslySetInnerHTML={{__html: message.text }}
                />
              </Box>
            </Box>
          ))
        }
      </Box>
      <Box className="messages-button-panel" >
        <TextField
          className='text-field'
          label="Message"
          variant="outlined"
          autoComplete="off"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& > fieldset": { borderColor: "#ff000042" },
              '&:hover fieldset': {
                borderColor: '#ff0000ba',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#ff0000ba',
              },
            },
          }}
          InputLabelProps={{ id: "message-label" }}
          InputProps={{ id: 'message-box'}}
          value={message}
          onChange={type}
          onKeyDown={submit}
        />
        <Button variant="contained" className='messages-button send-button' onClick={send} >
          Send
        </Button>
        <Button variant="contained" className='messages-button hide-button' onClick={goHome}>
          Hide
        </Button>
      </Box>
    </Paper>
  );
};
