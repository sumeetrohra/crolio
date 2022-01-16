import { Box, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../api/auth';
import { createUserKYCDetails } from '../api/kyc';
import { getUserDetails } from '../api/user';
import OnBoardingLayout from '../components/composite/onBoarding/OnBoardingLayout';
import { capitalize } from '../helpers/string';
import { verifyName } from '../utils/user';

const KYCPage = () => {
  const { user } = useAuth();
  useEffect(() => {
    getUserDetails(user?.uid as string).then((data) => console.log(data));
  }, []);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = () => {
    createUserKYCDetails({ firstName: capitalize(firstName), lastName: capitalize(lastName) }).then(
      (data) => console.log(data),
    );
  };

  return (
    <OnBoardingLayout>
      <Box
        onSubmit={handleSubmit}
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
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={!!firstName && !verifyName(firstName)}
          helperText={firstName && !verifyName(firstName) ? 'Invalid Name' : ''}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          error={!!lastName && !verifyName(lastName)}
          helperText={lastName && !verifyName(lastName) ? 'Invalid Name' : ''}
        />
      </Box>
    </OnBoardingLayout>
  );
};

export default KYCPage;
