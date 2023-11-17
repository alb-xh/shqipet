import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export const LoginForm = () => {
  const [ usernameError, setUsernameError ] = React.useState('');
  const [ passwordError, setPasswordError ] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');

    let usernameError, passwordError;

    if (!username) {
      usernameError = 'Username is required';
    } else if (username.length < 4) {
      usernameError = 'Username must be at least 4 characters'
    } else if (username.length > 50) {
      usernameError = 'Username must be less than 50 characters'
    } else {
      usernameError = '';
    }

    if (!password) {
      passwordError = 'Password is required';
    } else if (password.length < 8) {
      passwordError = 'Password must be at least 8 characters'
    } else if (password.length > 50) {
      passwordError = 'Password must be less than 50 characters'
    } else {
      passwordError = '';
    }

    setUsernameError(usernameError);
    setPasswordError(passwordError);

    if (usernameError || passwordError) {
      return;
    }

    console.log({ username, password });
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
              id="username"
              name="username"
              label="Username"
              autoComplete="username"
              variant="filled"
              margin="normal"
              error={!!usernameError}
              helperText={usernameError}
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
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="password"
              variant="filled"
              margin="normal"
              error={!!passwordError}
              helperText={passwordError}
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
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}