import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { signUp, sendVerificationEmail } from '../../../../api/auth';
import { verifyEmail, verifyPassword } from '../../../../utils/auth';
import CircularProgress from '@mui/material/CircularProgress';
import { AuthStates } from '../../../../pages/AuthenticationPage';

interface ISignUpPage {
  setAuthState: Dispatch<SetStateAction<AuthStates>>;
}

const SignUpPage: React.FC<ISignUpPage> = (props) => {
  const { setAuthState } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (verifyEmail(email) && verifyPassword(password) && password === confirmPassword) {
      setLoading(true);
      signUp(email, password)
        .then((user) =>
          sendVerificationEmail(user.user).then(() => {
            setAuthState(AuthStates.VERIFY_EMAIL);
          }),
        )
        .catch(() => setError('Email already in use'))
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
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit}>
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
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          {loading ? <CircularProgress /> : 'Sign Up'}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link variant="body2" onClick={() => setAuthState(AuthStates.LOGIN)}>
              {'Already have an account? Click to login'}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignUpPage;
