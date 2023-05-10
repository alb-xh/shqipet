import Avatar from '@mui/material/Avatar';
import { Box, Button, Paper, TextField } from '@mui/material';
import { KeyboardEventHandler, useContext, useEffect, useState } from 'react';

import AppContext from '../common/app.context';

const messagesPanelId = 'message-panel';

const GroupChat = () => {
  const { user, messages, sendMessage, setAlert } = useContext(AppContext);
  const [isVisible, setIsVisible] = useState(false);
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

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  if (!isVisible) {
    return (
      <Button className="show-button" variant="contained" onClick={toggleVisibility}>
        Show
      </Button>
    );
  }

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
                <Box dangerouslySetInnerHTML={{__html: message.text }} />
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
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleSubmit}
        />
        <Button variant="contained" className='messages-button' onClick={handleSend} >
          Send
        </Button>
        <Button variant="contained" className='messages-button' onClick={toggleVisibility}>
          Hide
        </Button>
      </Box>
    </Paper>
  );
};

export default GroupChat;
