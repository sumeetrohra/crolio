import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  sendEmailVerificationCode,
  sendVerificationEmail,
  useAuth,
  UserDetails,
} from '../../../api/auth';
import { EMAIL_VERIFICATION_MODE } from '../../../constants/auth';
import useQuery from '../../../hooks/useQuery';
import { AuthStates } from '../../../pages/AuthenticationPage';

interface IVerifyEmailPage {
  setAuthState: Dispatch<SetStateAction<AuthStates>>;
}

const VerifyEmailPage: React.FC<IVerifyEmailPage> = () => {
  const params = useQuery();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendBtnText, setResendBtnText] = useState('Resend verification email');

  useEffect(() => {
    if (params.mode === EMAIL_VERIFICATION_MODE && params.oobCode) {
      setLoading(true);
      sendEmailVerificationCode(params.oobCode)
        .then((data) => {
          console.log(data);
          window.location.reload();
        })
        .catch(() => setError('Some error occurred'))
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <Box
      sx={{
        my: 8,
        mt: 0,
        mx: 4,
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
            onClick={() =>
              sendVerificationEmail(user as UserDetails)
                .then(() => setResendBtnText('Email sent'))
                .catch(() => setResendBtnText('Something went wrong, please try again'))
            }
          >
            {resendBtnText}
          </Button>
        </>
      )}
    </Box>
  );
};

export default VerifyEmailPage;
