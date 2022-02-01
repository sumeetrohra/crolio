import { Box, Button, Grid, Link as MUILink, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { verifyPassword, verifyEmail } from '../../utils/auth';
import { Link, useHistory } from 'react-router-dom';
import { FORGOT_PASSWORD_URL, LOGIN_URL, VERIFY_EMAIL_URL } from '../../constants/auth';
import OnBoardingLayout from '../../components/composite/onBoarding/OnBoardingLayout';
import { sendVerificationEmail, signUp } from '../../api/auth';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (verifyEmail(email) && verifyPassword(password) && password === confirmPassword) {
      setLoading(true);
      signUp(email, password)
        .then((user) =>
          sendVerificationEmail(user).then(() => {
            history.push(VERIFY_EMAIL_URL, { replace: true });
          }),
        )
        .catch(() => setError('Email already in use'))
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
          Sign up
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={
              (!!confirmPassword && !verifyPassword(confirmPassword)) ||
              (!!confirmPassword && confirmPassword !== password)
            }
            helperText={
              confirmPassword && !verifyPassword(confirmPassword)
                ? 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
                : confirmPassword && confirmPassword !== password
                ? 'Passwords don"t match'
                : ''
            }
          />
          {error && (
            <Typography variant="subtitle1" component="p">
              {error}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
            {loading ? <CircularProgress /> : 'Sign Up'}
          </Button>
          <Grid container>
            <Grid item xs>
              <MUILink component={Link} to={FORGOT_PASSWORD_URL}>
                Forgot password?
              </MUILink>
            </Grid>
            <Grid item>
              <MUILink component={Link} to={LOGIN_URL}>
                {'Already have an account? Click to login'}
              </MUILink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </OnBoardingLayout>
  );
};

export default SignUpPage;
