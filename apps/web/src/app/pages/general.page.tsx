import React from 'react';

import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';

const BackButton = () => (
  <Link to="/" style={{ padding: '10px' }}>
    <IconButton aria-label="back" size="medium" sx={{
      opacity: 0.9,
      backgroundColor: "white",
      '&:hover': {
        opacity: 1,
        backgroundColor: "white",
        boxShadow: '0 5px 15px rgba(145, 92, 182, .4)',
      }
    }}>
      <KeyboardBackspaceIcon sx={{ color: 'black' }} />
    </IconButton>
  </Link>
);

export const GeneralPage = (props) => {
  const {
    title,
    description = null,
    color = 'white'
  } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h1" style={{ color }}>
        {title}
      </Typography>
      {
        description && (
          <Typography variant="h6" style={{ color }}>
            {description}
          </Typography>
        )
      }
      <BackButton />
    </Box>
  );
}