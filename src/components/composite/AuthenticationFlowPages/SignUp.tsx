import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { verifyEmail, verifyPassword } from '../../../utils/auth';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email, password, confirmPassword);
    // if (verifyEmail(email) && verifyPassword(password) && password === confirmPassword) {
    // }
  };

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
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!email && !verifyEmail(email)}
          helperText={email && !verifyEmail(email) ? 'Invalid email' : ''}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!password && !verifyPassword(password)}
          helperText={
            password && !verifyPassword(password)
              ? 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
              : ''
          }
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="confirm Password"
          type="password"
          id="confirmPassword"
          autoComplete="current-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!confirmPassword && !verifyPassword(confirmPassword)}
          helperText={
            confirmPassword && !verifyPassword(confirmPassword)
              ? 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
              : ''
          }
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign Up
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {'Dont have an account? Sign Up'}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignUp;
