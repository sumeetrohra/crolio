import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { signOut } from '../../../api/auth';
import Container from '../../core/layout/Container';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Crolios
            </Typography>
            <Button color="inherit" onClick={signOut}>
              Sign out
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
