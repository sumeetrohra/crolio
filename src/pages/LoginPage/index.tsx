import { Box, Button, Grid, Link as MUILink, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { verifyEmail, verifyPassword } from '../../utils/auth';
import OnBoardingLayout from '../../components/composite/onBoarding/OnBoardingLayout';
import { login } from '../../api/auth';
import { getAuthRedirectUrl } from '../../Router';
import { useHistory, Link } from 'react-router-dom';
import { FORGOT_PASSWORD_URL, SIGN_UP_URL } from '../../constants/auth';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (verifyEmail(email) && verifyPassword(password)) {
      setLoading(true);
      login(email, password)
        .then((user) => {
          const nextUrl = getAuthRedirectUrl(user);
          if (nextUrl) {
            history.push(nextUrl);
          } else {
            // TODO: update app urls with constants
            history.push('/', { replace: true });
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
    <OnBoardingLayout>
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
              <MUILink component={Link} to={FORGOT_PASSWORD_URL}>
                Forgot password?
              </MUILink>
            </Grid>
            <Grid item>
              <MUILink component={Link} to={SIGN_UP_URL}>
                {'Dont have an account? Sign Up'}
              </MUILink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </OnBoardingLayout>
  );
};

export default LoginPage;
