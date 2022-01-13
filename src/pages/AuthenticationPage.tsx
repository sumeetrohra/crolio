import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SignUp from '../components/composite/AuthenticationFlowPages/SignUpPage';
import LoginPage from '../components/composite/AuthenticationFlowPages/LoginPage';
import VerifyEmailPage from '../components/composite/AuthenticationFlowPages/VerifyEmailPage';
import useQuery from '../hooks/useQuery';
import { EMAIL_VERIFICATION_MODE } from '../constants/auth';
import { useAuth } from '../api/auth';

export enum AuthStates {
  SIGN_UP = 'SIGN_UP',
  LOGIN = 'LOGIN',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  VERIFY_EMAIL = 'VERIFY_EMAIL',
  INITIATE_KYC = 'INITIATE_KYC',
}

const AuthenticationPage = () => {
  const [authState, setAuthState] = useState<AuthStates>(AuthStates.LOGIN);
  const params = useQuery();
  const { user } = useAuth();

  useEffect(() => {
    if (!user && authState !== AuthStates.LOGIN && authState !== AuthStates.SIGN_UP) {
      setAuthState(AuthStates.LOGIN);
    } else if (
      (params.mode === EMAIL_VERIFICATION_MODE && params.oobCode && user) ||
      (user && !user.emailVerified)
    ) {
      setAuthState(AuthStates.VERIFY_EMAIL);
    }
  });

  const getAuthComponent = () => {
    switch (authState) {
      case AuthStates.SIGN_UP:
        return <SignUp setAuthState={setAuthState} />;

      case AuthStates.LOGIN:
        return <LoginPage setAuthState={setAuthState} />;

      case AuthStates.VERIFY_EMAIL:
        return <VerifyEmailPage setAuthState={setAuthState} />;
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        {getAuthComponent()}
      </Grid>
    </Grid>
  );
};

export default AuthenticationPage;
