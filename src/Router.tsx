import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { signOut } from './api/auth';
import Container from './components/core/layout/Container';

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
    onAuthStateChanged(_auth, (user) => {
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
