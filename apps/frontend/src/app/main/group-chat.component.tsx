import Avatar from '@mui/material/Avatar';
import { Button, Paper, TextField } from '@mui/material';
import { KeyboardEventHandler, useEffect, useState } from 'react';
import { v4 } from 'uuid';

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

export interface Message {
  sender: string;
  text: string;
}

const messagesPanelId = v4();

const GroupChat = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    const div = document.getElementById(messagesPanelId);
    if (div) {
      div.scrollTop = div.scrollHeight;
    }
  }, [ messages ]);

  const handleSend = () => {
    if (newMessage) {
      setMessages([...messages, { sender: 'You', text: newMessage }]);
      setNewMessage('');
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
      <div id={messagesPanelId} style={messagesPanelStyle}>
        {
          (messages).map((message, i) => (
            <div key={i} style={messageStyle}>
              <Avatar sx={avatarStyle}>{message.sender.charAt(0)}</Avatar>
              <div>
                <div>{message.sender}</div>
                <div>{message.text}</div>
              </div>
            </div>
          ))
        }
      </div>
      <div style={messagesButtonPanelStyle}>
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
      </div>
    </Paper>
  );
};

export default GroupChat;
