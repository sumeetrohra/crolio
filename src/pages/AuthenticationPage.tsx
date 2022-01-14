import React, { useState, useEffect } from 'react';
import SignUp from '../components/composite/onBoarding/AuthenticationFlowPages/SignUpPage';
import LoginPage from '../components/composite/onBoarding/AuthenticationFlowPages/LoginPage';
import VerifyEmailPage from '../components/composite/onBoarding/AuthenticationFlowPages/VerifyEmailPage';
import useQuery from '../hooks/useQuery';
import { EMAIL_VERIFICATION_MODE } from '../constants/auth';
import { useAuth } from '../api/auth';
import OnBoardingLayout from '../components/composite/onBoarding/OnBoardingLayout';

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

  return <OnBoardingLayout>{getAuthComponent()}</OnBoardingLayout>;
};

export default AuthenticationPage;
