import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Container, Button } from '@mui/material';

const Home = () => {
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h3" gutterBottom>
          Welcome to the Home Page
        </Typography>
        <Typography variant="h6" gutterBottom>
          Please sign in or sign up to continue.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            color="secondary"
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
