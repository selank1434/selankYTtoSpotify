import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using react-router for navigation
import { Container, Button, Box, Typography } from '@mui/material';

const DisplayPage = () => (
  <Container
    component="main"
    maxWidth="sm"
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      textAlign: 'center',
    }}
  >
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" color="success.main" sx={{ marginBottom: 2 }}>
        Playlist successfully converted!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{ marginRight: 2 }}
      >
        Go to Home
      </Button>
      <Button
        variant="contained"
        color="secondary"
        component={Link}
        to="/selectconvert"
      >
        Go to Select Convert
      </Button>
    </Box>
  </Container>
);

export default DisplayPage;
