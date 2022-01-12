import { Box, Typography } from '@mui/material';
import React from 'react';

const VerifyEmailPage: React.FC = () => {
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
      <Typography component="h1" variant="h3">
        Please check your email for verification link
      </Typography>
    </Box>
  );
};

export default VerifyEmailPage;
