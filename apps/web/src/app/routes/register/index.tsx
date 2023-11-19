import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useUsernameField } from '../../common/hooks/fields/use-username.field-hook';
import { usePasswordField } from '../../common/hooks/fields/use-password.field-hook';
import { useConfirmPasswordField } from '../../common/hooks/fields/use-confirm-password.field-hook';
import { useFirstNameField } from '../../common/hooks/fields/use-first-name.field-hook';
import { useLastNameField } from '../../common/hooks/fields/use-last-name.field-hook';
import { apiClient, useAppContext } from '../../common';
import { Path } from '../../constants';
import { useSubmit } from '../../common/hooks/fields/use-submit.field-hook';

export const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useAppContext();

  const firstNameField = useFirstNameField();
  const lastNameField = useLastNameField();
  const usernameField = useUsernameField();
  const passwordField = usePasswordField();
  const confirmPasswordField = useConfirmPasswordField(passwordField.name);
  const onSubmit = useSubmit(
    [
      firstNameField,
      lastNameField,
      usernameField,
      passwordField,
      confirmPasswordField,
    ],
    async() => {
      const user = await apiClient.createUser({
        firstName: firstNameField.value,
        lastName: lastNameField.value,
        username: usernameField.value,
        password: passwordField.value,
      });

      setUser(user);
      navigate(Path.Root);
    },
  );

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
            <AppRegistrationIcon />
          </Avatar>
          <Typography color="white" component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              id={firstNameField.name}
              name={firstNameField.name}
              error={!!firstNameField.error}
              helperText={firstNameField.error}
              label="First name"
              autoComplete="first-name"
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
              id={lastNameField.name}
              name={lastNameField.name}
              error={!!lastNameField.error}
              helperText={lastNameField.error}
              label="Last name"
              autoComplete="last-name"
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
            <TextField
              id={confirmPasswordField.name}
              name={confirmPasswordField.name}
              error={!!confirmPasswordField.error}
              helperText={confirmPasswordField.error}
              label="Confirm password"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
  );
}