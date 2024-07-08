// src/components/WeatherDashboard.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import WeatherChart from './WeatherChart'; // Ensure you have this component

const WeatherDashboard = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    // const apiKey = '09cca5008aaeec61ee8fbdd82b1f1423'; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/forecast/daily?q={city}&cnt=7&appid={09cca5008aaeec61ee8fbdd82b1f1423}`;

    try {
      console.log(`Fetching weather data for: ${city}`);
      const response = await fetch(url);
      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Weather data:', data);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (city.trim() !== '') {
      fetchWeather(city);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Weather Dashboard
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <TextField
          label="City"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch} disabled={loading}>
          Search
        </Button>
      </Box>
      {error && (
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      )}
      {loading && <Typography variant="body1">Loading...</Typography>}
      {weatherData && <WeatherChart weatherData={weatherData} />}
    </Box>
  );
};

export default WeatherDashboard;
