import { CSSProperties } from "react";

export const showButtonStyle: CSSProperties = {
  position: 'fixed',
  bottom: 16,
  right: 16,
};

export const groupChatStyle: CSSProperties = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  width: 600,
  display: 'flex',
  flexDirection: 'column',
  height: 700,
  backgroundColor: 'hsla(0,0%,13%,1)',
};

export const messagesPanelStyle: CSSProperties = {
  overflowY: 'auto',
  maxHeight: 600,
  width: 600,
};

export const messageStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  margin: 15,
  color: 'white'
};

export const avatarStyle: CSSProperties = { marginRight: 2 };

export const messagesButtonPanelStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  position: "absolute",
  bottom: 10,
  left: 12,
};

export const textFieldStyle: CSSProperties = {
  flex: 1,
  width: 420,
};

export const textFieldInputStyle: CSSProperties = { color: 'white' };

export const textFieldElementsStyle = {
  "& .MuiOutlinedInput-root": {
    "& > fieldset": { borderColor: "#ff000042" },
    '&:hover fieldset': {
      borderColor: '#ff0000ba',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ff0000ba',
    },
  },
};

export const messagesButtonStyle: CSSProperties = { marginLeft: 8 };

export const pageStyle: CSSProperties = {
  height: '80vh',
  position: 'relative',
};
