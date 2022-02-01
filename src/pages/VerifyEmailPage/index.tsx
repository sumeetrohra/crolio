import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../api/auth';
import OnBoardingLayout from '../../components/composite/onBoarding/OnBoardingLayout';
import { VERIFY_EMAIL_URL } from '../../constants/auth';
import useQuery from '../../hooks/useQuery';
import { getAuthRedirectUrl } from '../../Router';
// import {
//   sendEmailVerificationCode,
//   sendVerificationEmail,
//   useAuth,
//   UserDetails,
// } from '../../../../api/auth';
// import { EMAIL_VERIFICATION_MODE } from '../../../../constants/auth';
// import useQuery from '../../../../hooks/useQuery';
// import { AuthStates } from '../../../../pages/AuthenticationPage';

const VerifyEmailPage: React.FC = () => {
  const params = useQuery();
  const { user, loggedIn, loading } = useAuth();
  const history = useHistory();

  // If the user is logged out, it redirects back to the login page
  useEffect(() => {
    if (!loading) {
      const nextUrl = getAuthRedirectUrl(user);
      if (nextUrl !== VERIFY_EMAIL_URL) {
        history.push(nextUrl, { replace: true });
      }
    }
  }, [loading, loggedIn]);

  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendBtnText, setResendBtnText] = useState('Resend verification email');

  useEffect(() => {
    // if (params.mode === EMAIL_VERIFICATION_MODE && params.oobCode) {
    //   setLoading(true);
    //   sendEmailVerificationCode(params.oobCode)
    //     .then(() => {
    //       history.push('/');
    //       window.location.reload();
    //     })
    //     .catch(() => setError('Some error occurred'))
    //     .finally(() => {
    //       setLoading(false);
    //     });
    // }
  }, []);

  return (
    <OnBoardingLayout>
      <Box
        sx={{
          my: 8,
          mt: 0,
          mx: 8,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {loading ? (
          <Typography component="h1" variant="h3">
            <CircularProgress /> Verifying Email, please wait...
          </Typography>
        ) : (
          <>
            <Typography component="h1" variant="h3">
              {error ? error : 'Please check your email for verification link'}
            </Typography>
            <Button
              onClick={() => {
                // sendVerificationEmail(user as UserDetails)
                //   .then(() => setResendBtnText('Email sent'))
                //   .catch(() => setResendBtnText('Something went wrong, please try again'))
              }}
            >
              {resendBtnText}
            </Button>
          </>
        )}
      </Box>
    </OnBoardingLayout>
  );
};

export default VerifyEmailPage;
