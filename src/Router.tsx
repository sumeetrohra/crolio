import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { signOut, signUp, login } from './api/auth';
import Container from './components/core/layout/Container';
import cryptoJS from 'crypto-js';

const Router: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // example usage of styled components

  // const theme = useTheme();
  // const StyledP = styled('p')`
  //   background-color: ${theme.palette.primary.dark};
  // `;

  useEffect(() => {
    const _auth = getAuth();
    // signOut();
    // login('test1@test.com', 'Test@123');
    // signUp('test1@test.com', 'Test@123');
    onAuthStateChanged(_auth, (user) => {
      console.log('$$$$$$$$', user);
      setLoading(true);
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setLoading(false);
    });
  }, []);

  return <Container>asd</Container>;
};

export default Router;
