import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
    fetchHistory();
  }, [darkMode]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/history');
      setHistory(res.data);
    } catch (err) {
      console.error('Failed to fetch history', err);
    }
  };

  const fetchWeather = async (searchCity) => {
    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const res = await axios.get(`http://localhost:5000/api/weather/${searchCity}`);
      setWeather(res.data);
      
      // Save to history
      await axios.post('http://localhost:5000/api/history', { city: searchCity });
      fetchHistory();
    } catch (err) {
      setError('City not found! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
      setCity('');
    }
  };

  const handleHistoryClick = (historyCity) => {
    fetchWeather(historyCity);
  };

  return (
    <div className="app">
      <button 
        className="theme-toggle" 
        onClick={() => setDarkMode(!darkMode)}
        title="Toggle theme"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      <div className="container">
        <h1>🌤️ Weather App</h1>
        <p className="subtitle">Real-time weather data with smart caching</p>
        
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder="Enter city name (e.g., London, Tokyo)..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="search-input"
            disabled={loading}
          />
          <button type="submit" className="search-btn" disabled={loading}>
            {loading ? '⏳' : '🔍'} Search
          </button>
        </form>

        {loading && (
          <div className="loading-container">
            <div className="loader"></div>
            <p>Fetching weather data...</p>
          </div>
        )}

        {error && (
          <div className="error-card">
            ⚠️ {error}
          </div>
        )}

        {weather && !loading && (
          <div className="weather-card">
            <div className="weather-header">
              <h2>{weather.name}, {weather.sys.country}</h2>
              {weather.cached && (
                <span className="cache-badge" title="Served from cache">
                  📦 Cached
                </span>
              )}
            </div>
            
            <div className="weather-main">
              <div className="temp-display">
                <span className="temp">{Math.round(weather.main.temp)}</span>
                <span className="temp-unit">°C</span>
              </div>
              <div className="weather-icon">
                <img 
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                  alt={weather.weather[0].description}
                />
              </div>
            </div>

            <div className="weather-desc">
              {weather.weather[0].description}
            </div>

            <div className="weather-details">
              <div className="detail-item">
                <span className="detail-icon">🌡️</span>
                <div>
                  <div className="detail-label">Feels Like</div>
                  <div className="detail-value">{Math.round(weather.main.feels_like)}°C</div>
                </div>
              </div>
              
              <div className="detail-item">
                <span className="detail-icon">💧</span>
                <div>
                  <div className="detail-label">Humidity</div>
                  <div className="detail-value">{weather.main.humidity}%</div>
                </div>
              </div>
              
              <div className="detail-item">
                <span className="detail-icon">💨</span>
                <div>
                  <div className="detail-label">Wind Speed</div>
                  <div className="detail-value">{weather.wind.speed} m/s</div>
                </div>
              </div>
              
              <div className="detail-item">
                <span className="detail-icon">🔽</span>
                <div>
                  <div className="detail-label">Pressure</div>
                  <div className="detail-value">{weather.main.pressure} hPa</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div className="history-section">
            <h3>📜 Recent Searches</h3>
            <div className="history-items">
              {history.map((item, i) => (
                <button 
                  key={i} 
                  onClick={() => handleHistoryClick(item.city)}
                  className="history-btn"
                  title={`Search ${item.city} again`}
                >
                  📍 {item.city}
                </button>
              ))}
            </div>
          </div>
        )}

        <footer className="footer">
          <p>Powered by OpenWeatherMap API • Built with React & Express</p>
        </footer>
      </div>
    </div>
  );
}

export default App;