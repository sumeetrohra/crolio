import React, { useEffect } from 'react';
import { signOut, useAuth } from './api/auth';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/composite/Navigation/Header';
import { CircularProgress } from '@mui/material';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const AuthenticationPage = React.lazy(() => import('./pages/AuthenticationPage'));
const KYCPage = React.lazy(() => import('./pages/KYCPage'));

const Router: React.FC = () => {
  // example usage of styled components
  // const theme = useTheme();
  // const StyledP = styled('p')`
  //   background-color: ${theme.palette.primary.dark};
  // `;

  useEffect(() => {
    // signOut();
    // login('test1@test.com', 'Test@123');
    // signUp('test1@test.com', 'Test@123');
  }, []);

  const { loading, loggedIn, user } = useAuth();

  const showAuthPage = !loggedIn || !user?.emailVerified;
  const showKYCPage = true;

  const showOnboarding = showAuthPage || showKYCPage;

  return loading ? (
    <CircularProgress />
  ) : (
    <React.Suspense fallback={<CircularProgress />}>
      <BrowserRouter>
        {showOnboarding ? (
          <Switch>
            <Route path="*" component={showAuthPage ? AuthenticationPage : KYCPage} />
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
