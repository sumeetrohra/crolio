import { Button, Grid, Paper, useTheme } from '@mui/material';
import React from 'react';
import { signOut, useAuth } from '../../../api/auth';

interface IOnBoardingLayoutProps {
  children: React.ReactNode;
}

const OnBoardingLayout: React.FC<IOnBoardingLayoutProps> = (props) => {
  const { children } = props;
  const theme = useTheme();
  const { user } = useAuth();

  return (
    <>
      <Grid
        container
        component="main"
        sx={{
          height: '100vh',
          width: '100vw',
          p: 8,
          [theme.breakpoints.only('sm')]: { p: 4 },
          [theme.breakpoints.only('xs')]: { p: 0 },
        }}
      >
        <Grid
          item
          xs={false}
          sm={false}
          md={6}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          elevation={6}
          component={Paper}
          square
        />
        <Grid item xs={12} sm={12} md={6} elevation={6} component={Paper} square>
          {children}
          {/* Add temporary button to logout from all pages */}
          {user && <Button onClick={signOut}>Logout</Button>}
        </Grid>
      </Grid>
    </>
  );
};

export default OnBoardingLayout;
