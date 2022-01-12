import React, { useEffect } from 'react';
import { useAuth } from './api/auth';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/composite/Navigation/Header';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const AuthenticationPage = React.lazy(() => import('./pages/AuthenticationPage'));

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

  const showOnboarding = !loggedIn || !user?.emailVerified;

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        {showOnboarding ? (
          <Switch>
            <Route path="*" component={AuthenticationPage} />
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
