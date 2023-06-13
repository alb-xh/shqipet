import * as React from 'react';
import { Box, BottomNavigation, BottomNavigationAction, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom"

import BookIcon from '@mui/icons-material/Book';
import GamesIcon from '@mui/icons-material/Games';
import ChatIcon from '@mui/icons-material/Chat';
import LoginIcon from '@mui/icons-material/Login';
import PolicyIcon from '@mui/icons-material/Policy';
import HomeIcon from '@mui/icons-material/Home';

import { AUTHOR_GITHUB_URL, Path } from '../../constants';

const NavigationItem = ({ label, icon, to }) => {
  const navigate = useNavigate();

  return (
    <Tooltip title={label} placement="top">
      <BottomNavigationAction
        icon={icon}
        sx={{
          opacity: 0.7,
          color: "#1976d2",
          '&:hover': {
            opacity: 1,
            color: "#1976d2",
          }
        }}
        onClick={() => {
          if (to.startsWith('http')) {
            window.open(to, '_blank');
          } else {
            navigate(to);
          }
        }}
      />
    </Tooltip>
  )
}

export const Footer = () => {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{
      width: '100%',
      position: 'fixed',
      bottom: 0,
    }}>
      <BottomNavigation
        sx={{ backgroundColor: '#f9f9f933', color: 'white' }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          console.log(newValue);
        }}
      >
        <NavigationItem
          label="Author"
          icon={<BookIcon />}
          to={AUTHOR_GITHUB_URL}
        />
        <NavigationItem
          label="Home"
          icon={<HomeIcon />}
          to={Path.Root}
        />
        <NavigationItem
          label="Games"
          icon={<GamesIcon />}
          to={Path.Games}
        />
        <NavigationItem
          label="Chat"
          icon={<ChatIcon />}
          to={Path.Chat}
        />
        <NavigationItem
          label="Login"
          icon={<LoginIcon />}
          to={Path.Login}
        />
        <NavigationItem
          label="Privacy Policy"
          icon={<PolicyIcon />}
          to={Path.PrivacyPolicy}
        />
      </BottomNavigation>
    </Box>
  );
}