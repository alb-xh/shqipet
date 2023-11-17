import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockResetIcon from '@mui/icons-material/LockReset';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useUsernameField } from '../../common/hooks/fields/use-username.field-hook';
import { UseResetPasswordCodeFieldHook } from '../../common/hooks/fields/use-reset-password-code.field-hook';
import { usePasswordField } from '../../common/hooks/fields/use-password.field-hook';

export const ResetPassword = () => {
  const usernameField = useUsernameField();
  const passwordField = usePasswordField();
  const resetPasswordCodeField = UseResetPasswordCodeFieldHook();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    usernameField.validate(data);
    passwordField.validate(data);
    resetPasswordCodeField.validate(data);

    if (usernameField.error || passwordField.error || resetPasswordCodeField.error) {
      return;
    }

    console.log([ usernameField.value, passwordField, resetPasswordCodeField.value ]);
  };

  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockResetIcon />
          </Avatar>
          <Typography color="white" component="h1" variant="h5">
            Reset password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              id={usernameField.name}
              name={usernameField.name}
              error={!!usernameField.error}
              helperText={usernameField.error}
              label="Username"
              autoComplete="username"
              variant="filled"
              margin="normal"
              sx={{
                backgroundColor: 'white',
                '& .MuiFormHelperText-root': {
                  backgroundColor: 'black',
                  margin: '0px',
                  padding: '2px 0px 0px 10px',
                }
              }}
              fullWidth
              autoFocus
            />
            <TextField
              id={passwordField.name}
              name={passwordField.name}
              error={!!passwordField.error}
              helperText={passwordField.error}
              label="New Password"
              type="password"
              autoComplete="password"
              variant="filled"
              margin="normal"
              sx={{
                backgroundColor: 'white',
                '& .MuiFormHelperText-root': {
                  backgroundColor: 'black',
                  margin: '0px',
                  padding: '2px 0px 0px 10px',
                }
              }}
              fullWidth
            />
            <TextField
              id={resetPasswordCodeField.name}
              name={resetPasswordCodeField.name}
              error={!!resetPasswordCodeField.error}
              helperText={resetPasswordCodeField.error}
              label="Reset password code"
              variant="filled"
              margin="normal"
              sx={{
                backgroundColor: 'white',
                '& .MuiFormHelperText-root': {
                  backgroundColor: 'black',
                  margin: '0px',
                  padding: '2px 0px 0px 10px',
                }
              }}
              fullWidth
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset password
            </Button>
          </Box>
        </Box>
      </Container>
  );
}