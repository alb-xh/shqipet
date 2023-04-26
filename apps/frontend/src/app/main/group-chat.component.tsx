import Avatar from '@mui/material/Avatar';
import { Button, Paper, TextField } from '@mui/material';
import { KeyboardEventHandler, useContext, useEffect, useState } from 'react';
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
import UserContext from '../common/user.context';

export interface Message {
  sender: string;
  text: string;
  avatar: string;
}

const messagesPanelId = v4();

const GroupChat = () => {
  const { user } = useContext(UserContext);
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
    if (newMessage && user) {
      const message = { sender: 'You', avatar: user.avatar, text: newMessage };

      setMessages([ ...messages, message ]);
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
              <Avatar sx={avatarStyle} src={message.avatar} alt={`${message.sender} avatar`} / >
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
