import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { login } from '../../../../api/auth';
import { verifyEmail, verifyPassword } from '../../../../utils/auth';
import CircularProgress from '@mui/material/CircularProgress';
import { AuthStates } from '../../../../pages/AuthenticationPage';

interface ILoginPage {
  setAuthState: Dispatch<SetStateAction<AuthStates>>;
}

const LoginPage: React.FC<ILoginPage> = (props) => {
  const { setAuthState } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (verifyEmail(email) && verifyPassword(password)) {
      setLoading(true);
      login(email, password)
        .then((user) => {
          if (!user.user.emailVerified) {
            setAuthState(AuthStates.VERIFY_EMAIL);
          }
        })
        .catch((err) => {
          setError('Email or password incorrect');
          console.log(err);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <Box
      sx={{
        my: 8,
        mt: 0,
        mx: 4,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography component="h1" variant="h3">
        Login
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!email && !verifyEmail(email)}
          helperText={email && !verifyEmail(email) ? 'Invalid email' : ''}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!password && !verifyPassword(password)}
          helperText={
            password && !verifyPassword(password)
              ? 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
              : ''
          }
        />
        {error && (
          <Typography variant="subtitle1" component="p">
            {error}
          </Typography>
        )}
        <Button type="submit" fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
          {loading ? <CircularProgress /> : 'Login'}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link variant="body2" onClick={() => setAuthState(AuthStates.SIGN_UP)}>
              {'Dont have an account? Sign Up'}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LoginPage;
