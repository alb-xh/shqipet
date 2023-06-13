import Avatar from '@mui/material/Avatar';
import { Box, Button, Paper, TextField } from '@mui/material';
import { KeyboardEventHandler, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Path } from '../../constants';
import { appContext } from '../../common/app.context';

const messagesPanelId = 'message-panel';

export const GroupChat = () => {
  const navigate = useNavigate();

  const { user, messages, sendMessage, setAlert } = useContext(appContext);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    const panel = document.getElementById(messagesPanelId);
    if (panel) {
      panel.scrollTop = panel.scrollHeight;
    }
  }, [ messages ]);

  const handleSend = () => {
    if (newMessage) {
      if (!user) {
        setAlert({ text: 'You must login first', severity: 'warning' });
      } else {
        sendMessage({ user, text: newMessage });
        setNewMessage('');
      }
    }
  };

  const handleSubmit: KeyboardEventHandler = (e) => {
    if (e?.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleHide = () => {
    navigate(Path.Root);
  };

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
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleSubmit}
        />
        <Button variant="contained" className='messages-button send-button' onClick={handleSend} >
          Send
        </Button>
        <Button variant="contained" className='messages-button hide-button' onClick={handleHide}>
          Hide
        </Button>
      </Box>
    </Paper>
  );
};
