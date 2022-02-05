import {
  Box,
  Typography,
  TextField,
  Link as MUILink,
  Button,
  CircularProgress,
  Grid,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { resetPassword, sendPasswordResetLink } from '../../api/auth';
import OnBoardingLayout from '../../components/composite/onBoarding/OnBoardingLayout';
import { LOGIN_URL, RESET_PASSWORD_MODE } from '../../constants/auth';
import useQuery from '../../hooks/useQuery';
import { verifyEmail, verifyPassword } from '../../utils/auth';

const ForgotPassword: React.FC<any> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const params = useQuery();
  const history = useHistory();

  const [state, setState] = useState<'enterEmail' | 'resetPassword'>('enterEmail');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (email != '') {
      sendPasswordResetLink(email)
        .then((res) => setMessage('Reset Link has been sent to your email!'))
        .catch((err) => setError('Something went wrong. Try again'));
    }
  };

  const handleResetPassword = (e: any) => {
    e.preventDefault();
    setLoading(true);
    resetPassword(params.oobCode, password)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
        history.push(LOGIN_URL);
      });
  };

  useEffect(() => {
    if (params.mode === RESET_PASSWORD_MODE && params.oobCode) {
      setState('resetPassword');
    }
  }, []);

  const content =
    state === 'enterEmail' ? (
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
        {error && (
          <Typography variant="subtitle1" component="p">
            {error}
          </Typography>
        )}
        {message && (
          <Typography variant="subtitle1" component="p">
            {message}
          </Typography>
        )}
        <Button type="submit" fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
          {loading ? <CircularProgress /> : 'Send Password Reset Link'}
        </Button>
        <Grid container>
          <Grid item>
            <MUILink component={Link} to={LOGIN_URL}>
              {'Already have an account? Click to login'}
            </MUILink>
          </Grid>
        </Grid>
      </Box>
    ) : state === 'resetPassword' ? (
      <Box
        component="form"
        noValidate
        onSubmit={handleResetPassword}
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
          {loading ? <CircularProgress /> : 'Reset Password'}
        </Button>
      </Box>
    ) : null;

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
          {state === 'enterEmail' ? 'Forgot Password?' : 'Reset Password'}
        </Typography>
        {content}
      </Box>
    </OnBoardingLayout>
  );
};

export default ForgotPassword;
