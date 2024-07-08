// src/services/weatherService.js

const API_KEY = '32389af5f93792e829129c01c594cecc';

export const getWeatherData = async (city) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return response.json();
};

export const getForecastData = async (city) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=7&appid=${API_KEY}&units=metric`);
  if (!response.ok) {
    throw new Error('Failed to fetch forecast data');
  }
  return response.json();
};
