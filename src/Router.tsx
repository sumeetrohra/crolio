import React, { useEffect } from 'react';
import { signOut, useAuth } from './api/auth';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/composite/Navigation/Header';
import { CircularProgress } from '@mui/material';
import {
  EMAIL_VERIFICATION_MODE,
  FORGOT_PASSWORD_URL,
  KYC_URL,
  LOGIN_URL,
  RESET_PASSWORD_MODE,
  SIGN_UP_URL,
  VERIFY_EMAIL_URL,
} from './constants/auth';

const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const SignUpPage = React.lazy(() => import('./pages/SignUpPage'));
const VerifyEmailPage = React.lazy(() => import('./pages/VerifyEmailPage'));
const ForgotPasswordPage = React.lazy(() => import('./pages/ForgotPasswordPage'));
const KYCPage = React.lazy(() => import('./pages/KYCPage'));

const HomePage = React.lazy(() => import('./pages/HomePage'));

const onBoardingRoutes = [
  { path: LOGIN_URL, component: LoginPage },
  { path: SIGN_UP_URL, component: SignUpPage },
  { path: VERIFY_EMAIL_URL, component: VerifyEmailPage },
  { path: FORGOT_PASSWORD_URL, component: ForgotPasswordPage },
  { path: KYC_URL, component: KYCPage },
];

// TODO: add user type
export const getAuthRedirectUrl = (user: any, isKYCDone: boolean) => {
  const params = new URLSearchParams(window.location.search);

  const oobCode = params.get('oobCode');
  const mode = params.get('mode');

  if (mode === RESET_PASSWORD_MODE && oobCode) {
    return FORGOT_PASSWORD_URL + `?mode=${mode}&oobCode=${oobCode}`;
  }

  if (!user) {
    return LOGIN_URL;
  }
  if (mode === EMAIL_VERIFICATION_MODE && oobCode) {
    return VERIFY_EMAIL_URL + `?mode=${mode}&oobCode=${oobCode}`;
  } else if (!user.emailVerified) {
    return VERIFY_EMAIL_URL;
  } else if (!isKYCDone) {
    return KYC_URL;
  }
  return '';
};

const Router: React.FC = () => {
  // example usage of styled components
  // const theme = useTheme();
  // const StyledP = styled('p')`
  //   background-color: ${theme.palette.primary.dark};
  // `;

  // useEffect(() => {
  //   signOut();
  // }, []);

  const { loading, loggedIn, user, isKYCDone } = useAuth();

  const showAuthPage = !loggedIn || !user?.emailVerified;
  const showKYCPage = !isKYCDone;

  const showOnboarding = showAuthPage || showKYCPage;

  return loading ? (
    <CircularProgress />
  ) : (
    <React.Suspense fallback={<CircularProgress />}>
      <BrowserRouter forceRefresh={true}>
        {showOnboarding ? (
          <Switch>
            {onBoardingRoutes.map((route) => (
              <Route key={route.path} exact path={route.path} component={route.component} />
            ))}
            <Route path="*" render={() => <Redirect to={getAuthRedirectUrl(user, isKYCDone)} />} />
          </Switch>
        ) : (
          <>
            <Header />
            <Switch>
              <Route exact path="/" component={HomePage} />
            </Switch>
          </>
        )}
      </BrowserRouter>
    </React.Suspense>
  );
};

export default Router;
