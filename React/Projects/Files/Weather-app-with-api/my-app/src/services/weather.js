const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

export async function getWeather(city) {
  const cityName = city.trim();

  if (!cityName) {
    throw new Error('Please enter a city name.');
  }

  const locationResponse = await fetch(
    `${GEOCODING_URL}?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
  );

  if (!locationResponse.ok) {
    throw new Error('Could not search for this city.');
  }

  const locationData = await locationResponse.json();
  const location = locationData.results?.[0];

  if (!location) {
    throw new Error('City not found. Please try another city.');
  }

  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max',
    timezone: 'auto',
    forecast_days: '7',
  });

  const weatherResponse = await fetch(`${WEATHER_URL}?${params}`);

  if (!weatherResponse.ok) {
    throw new Error('Could not load weather data.');
  }

  const weatherData = await weatherResponse.json();

  return {
    location: {
      name: location.name,
      country: location.country,
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: location.timezone,
    },
    current: weatherData.current,
    daily: weatherData.daily,
  };
}