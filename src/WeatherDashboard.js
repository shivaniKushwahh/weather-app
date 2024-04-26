import React, { useState } from 'react';
import axios from 'axios';
import './WeatherDashboard.css'; // Import the CSS file

const WeatherDashboard = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [status, setStatus] = useState('')
  const API_KEY = '467cff7aca5c7f179053afe6e62e1d96';
  console.log('weatherData',weatherData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`).then((res)=>{
        setWeatherData(res.data)
      })
    } catch (error) {
        setStatus(error.response.data.cod)
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => {setCity(e.target.value); setStatus('')}}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>
      {weatherData === null && !status ? (
        <p className="error-message">Enter a city name and click "Search" to get weather details.</p>
      ) : status === '404' ? (
        <p className="error-message">City not found. Please enter a valid city name.</p>
      ) : (
        <div className="weather-details">
          <h2>Weather Details for {weatherData.name}</h2>
          <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
