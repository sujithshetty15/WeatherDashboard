import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Avatar, Box, Button, Typography, Container, CssBaseline, Paper, Grid, TextField, CircularProgress } from '@mui/material';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    const apiKey = '09cca5008aaeec61ee8fbdd82b1f1423'; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      console.log('Weather data:', data); // Log the weather data to inspect its structure
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography component="h1" variant="h5" gutterBottom>
          Profile
        </Typography>
        {user ? (
          <Box>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <Avatar
                  alt={user.displayName}
                  src={user.photoURL}
                  sx={{ width: 128, height: 128, margin: 'auto' }}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
                <Typography variant="body1"><strong>UID:</strong> {user.uid}</Typography>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogout}
                  >
                    Log Out
                  </Button>
                </Box>
              </Grid>
            </Grid>

            <Box mt={4}>
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                sx={{ mt: 2 }}
              >
                Search
              </Button>
            </Box>

            {loading && <CircularProgress sx={{ mt: 2 }} />}
            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
            {weatherData && (
              <Box mt={4}>
                <Typography variant="h6">Weather in {weatherData.name}</Typography>
                <Typography>Temperature: {weatherData.main.temp}°C</Typography>
                <Typography>Humidity: {weatherData.main.humidity}%</Typography>
                <Typography>Weather: {weatherData.weather[0].description}</Typography>
                <Typography>Wind Speed: {weatherData.wind.speed} m/s</Typography>
              </Box>
            )}
          </Box>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;
