import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../api/auth';
import { createUserKYCDetails, initiateKYC } from '../../api/kyc';
import { getUserDetails } from '../../api/user';
import KYCDocsUploader from './components/KYCDocsUploader';
import OnBoardingLayout from '../../components/composite/onBoarding/OnBoardingLayout';
import { capitalize } from '../../helpers/string';
import { _uploadURLs } from '../../types/kyc';
import { verifyName } from '../../utils/user';
import { useHistory } from 'react-router-dom';
import { getAuthRedirectUrl } from '../../Router';
import { KYC_URL } from '../../constants/auth';

const KYCPage: React.FC = () => {
  const { user, loggedIn, loading, isKYCDone } = useAuth();

  const history = useHistory();

  // If the user is logged out, it redirects back to the login page
  useEffect(() => {
    if (!loading) {
      const nextUrl = getAuthRedirectUrl(user, isKYCDone);
      if (nextUrl !== KYC_URL) {
        history.push(nextUrl, { replace: true });
      }
    }
  }, [loading, loggedIn]);

  // TODO: Sumeet set user type
  const [userDetails, setUserDetails] = useState<any>();
  const [loadingNameUpload, setLoadingNameUpload] = useState(false);
  const [uploadURLs, setUploadURLs] = useState<_uploadURLs>({
    documentBack:
      'https://vauld-kyc-dev.s3.amazonaws.com/enterprise/621f8102f91f6f001cd1c24e/identity_back?AWSAccessKeyId=AKIA6KLT5FIQEJ2LSMJT&Content-Type=image%2Fjpeg&Expires=1646239351&Signature=rfGFzSXi5Q9vBMx%2Fw7LeMAcDT7w%3D',
    documentFront:
      'https://vauld-kyc-dev.s3.amazonaws.com/enterprise/621f8102f91f6f001cd1c24e/identity_front?AWSAccessKeyId=AKIA6KLT5FIQEJ2LSMJT&Content-Type=image%2Fjpeg&Expires=1646239351&Signature=oVFCs28uAucBp92WQumQEA3qZl0%3D',
    panCard:
      'https://vauld-kyc-dev.s3.amazonaws.com/enterprise/621f8102f91f6f001cd1c24e/identity_2_front?AWSAccessKeyId=AKIA6KLT5FIQEJ2LSMJT&Content-Type=image%2Fjpeg&Expires=1646239351&Signature=0dHfGjBi4jkAS8Gu0Ji%2BYy00Sfs%3D',
    selfie:
      'https://vauld-kyc-dev.s3.amazonaws.com/enterprise/621f8102f91f6f001cd1c24e/selfie?AWSAccessKeyId=AKIA6KLT5FIQEJ2LSMJT&Content-Type=image%2Fjpeg&Expires=1646239351&Signature=BRVVSC37t39tZB6AU6rdLNr0XYM%3D',
  });

  const fetchUser = () =>
    getUserDetails(user?.uid).then((data) => {
      data.exists && setUserDetails(data.data);
    });

  useEffect(() => {
    fetchUser();
  }, [user?.uid]);

  useEffect(() => {
    if (userDetails) {
      // initiateKYC().then((res) => setUploadURLs(res.data.data));
    }
  }, [userDetails]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleNameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingNameUpload(true);
    createUserKYCDetails({
      firstName: capitalize(firstName).trim(),
      lastName: capitalize(lastName).trim(),
    })
      .then((data) => console.log(data))
      .then(fetchUser)
      .finally(() => setLoadingNameUpload(false));
  };

  const userNameForm = (
    <Box
      onSubmit={handleNameSubmit}
      component="form"
      noValidate
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
      <Typography component="h1" variant="h5">
        {"Let's start with your name"}
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="firstName"
        label="First Name"
        name="firstName"
        autoFocus
        value={firstName.trim()}
        onChange={(e) => setFirstName(e.target.value.trim())}
        error={!!firstName && !verifyName(firstName.trim())}
        helperText={firstName && !verifyName(firstName.trim()) ? 'Invalid Name' : ''}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="lastName"
        label="Last Name"
        name="lastName"
        value={lastName.trim()}
        onChange={(e) => setLastName(e.target.value.trim())}
        error={!!lastName && !verifyName(lastName.trim())}
        helperText={lastName && !verifyName(lastName.trim()) ? 'Invalid Name' : ''}
      />
      <Button type="submit" fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
        {loadingNameUpload ? <CircularProgress /> : 'Confirm'}
      </Button>
    </Box>
  );

  return (
    <OnBoardingLayout>
      {!userDetails ? userNameForm : <KYCDocsUploader uploadURLs={uploadURLs as _uploadURLs} />}
    </OnBoardingLayout>
  );
};

export default KYCPage;
