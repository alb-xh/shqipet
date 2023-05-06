import Avatar from '@mui/material/Avatar';
import { Box, Button, Paper, TextField } from '@mui/material';
import { KeyboardEventHandler, useContext, useEffect, useState } from 'react';

import {
  showButtonStyle,
  groupChatStyle,
  messagesPanelStyle,
  messageStyle,
  avatarStyle,
  messagesButtonPanelStyle,
  textFieldStyle,
  textFieldInputStyle,
  textFieldElementsStyle,
  messagesButtonStyle,
} from './styles';
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
      <Button variant="contained" sx={showButtonStyle} onClick={toggleVisibility}>
        Show
      </Button>
    );
  }

  return (
    <Paper sx={groupChatStyle}>
      <Box id={messagesPanelId} style={messagesPanelStyle}>
        {
          messages.map((message, i) => (
            <Box key={i} style={messageStyle}>
              <Avatar sx={avatarStyle}
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
      <Box style={messagesButtonPanelStyle}>
        <TextField
          label="Message"
          variant="outlined"
          autoComplete="off"
          size="small"
          style={textFieldStyle}
          sx={textFieldElementsStyle}
          InputLabelProps={{ style: textFieldInputStyle }}
          InputProps={{ style: textFieldInputStyle }}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleSubmit}
        />
        <Button variant="contained" style={messagesButtonStyle} onClick={handleSend} >
          Send
        </Button>
        <Button variant="contained" style={messagesButtonStyle} onClick={toggleVisibility}>
          Hide
        </Button>
      </Box>
    </Paper>
  );
};

export default GroupChat;
