import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherChart = ({ forecast }) => {
  if (!forecast || !forecast.list || forecast.list.length === 0) {
    return <div>No data available</div>;
  }

  const data = {
    labels: forecast.list.map((entry) => new Date(entry.dt * 1000).toLocaleDateString()),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: forecast.list.map((entry) => {
          if (entry.temp && entry.temp.day !== undefined) {
            return entry.temp.day;
          } else {
            console.error('Temperature data missing for entry:', entry);
            return 0; // Default to 0 or handle appropriately
          }
        }),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '7-Day Weather Forecast',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default WeatherChart;
