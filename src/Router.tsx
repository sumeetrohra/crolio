import React, { useEffect } from 'react';
import { useAuth } from './api/auth';
import Container from './components/core/layout/Container';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const HomePage = React.lazy(() => import('./pages/HomePage'));

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

  const { loading, loggedIn, userUID } = useAuth();

  console.log(loading, loggedIn, userUID);

  return (
    <Container>
      <React.Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage} />
          </Switch>
        </BrowserRouter>
      </React.Suspense>
    </Container>
  );
};

export default Router;
