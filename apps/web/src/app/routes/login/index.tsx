import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { Link } from 'react-router-dom';

import { Path } from '../../constants';
import { useUsernameField } from '../../common/hooks/fields/use-username.field-hook';
import { usePasswordField } from '../../common/hooks/fields/use-password.field-hook';

export const Login = () => {
  const usernameField = useUsernameField();
  const passwordField = usePasswordField()

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    usernameField.validate(data);
    passwordField.validate(data);

    if (usernameField.error || passwordField.error) {
      return;
    }

    console.log([ usernameField.value, passwordField ]);
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography color="white" component="h1" variant="h5">
            Sign in
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
              label="Password"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to={Path.ResetPassword} style={{ color: '#f1f1f1' }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to={Path.Register} style={{ color: '#f1f1f1' }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}