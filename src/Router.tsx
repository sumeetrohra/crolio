import React from 'react';
import { useAuth } from './api/auth';
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
import {
  HOME_URL,
  USER_SETTINGS_URL,
  PORTFOLIO_INVESTMENT_URL,
  PORTFOLIO_URL,
} from './constants/app';

const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const SignUpPage = React.lazy(() => import('./pages/SignUpPage'));
const VerifyEmailPage = React.lazy(() => import('./pages/VerifyEmailPage'));
const ForgotPasswordPage = React.lazy(() => import('./pages/ForgotPasswordPage'));
const KYCPage = React.lazy(() => import('./pages/KYCPage'));

const HomePage = React.lazy(() => import('./pages/HomePage'));
const UserSettingsPage = React.lazy(() => import('./pages/UserSettingsPage'));
const PortfolioInvestmentPage = React.lazy(() => import('./pages/PortfolioInvestmentPage'));
const PortfolioPage = React.lazy(() => import('./pages/PortfolioPage'));

const onBoardingRoutes = [
  { path: LOGIN_URL, component: LoginPage },
  { path: SIGN_UP_URL, component: SignUpPage },
  { path: VERIFY_EMAIL_URL, component: VerifyEmailPage },
  { path: FORGOT_PASSWORD_URL, component: ForgotPasswordPage },
  { path: KYC_URL, component: KYCPage },
];

const AppRoutes = [
  { path: HOME_URL, component: HomePage },
  { path: USER_SETTINGS_URL, component: UserSettingsPage },
  { path: PORTFOLIO_INVESTMENT_URL, component: PortfolioInvestmentPage },
  { path: PORTFOLIO_URL, component: PortfolioPage },
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
              {AppRoutes.map((route) => (
                <Route key={route.path} exact path={route.path} component={route.component} />
              ))}
              <Route path="*" render={() => <Redirect to={HOME_URL} />} />
            </Switch>
          </>
        )}
      </BrowserRouter>
    </React.Suspense>
  );
};

export default Router;
