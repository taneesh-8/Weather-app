# Weather App

A real-time weather application that fetches data from the OpenWeatherMap API, featuring caching, search history, and a responsive UI with dark/light mode.

## Problem Statement
Users often need quick access to accurate weather information for any city worldwide. This app solves that by providing an intuitive interface to search for weather data, including temperature, humidity, wind speed, and more. It includes smart features like caching to reduce API calls and a search history for convenience, all while being mobile-friendly and visually appealing.

## Tech Stack Used
- **Frontend**: React (with Vite for build tool), CSS for styling, Axios for API calls.
- **Backend**: Node.js with Express.js for the server, Axios for external API integration, CORS for cross-origin requests, dotenv for environment variables.
- **API**: OpenWeatherMap API for weather data.
- **Deployment**: Vercel (for full-stack deployment) or separate hosts (e.g., Render for backend).
- **Other**: In-memory caching and history storage (resets on server restart).

## Steps to Run the Project Locally
https://github.com/taneesh-8/WeatherApp