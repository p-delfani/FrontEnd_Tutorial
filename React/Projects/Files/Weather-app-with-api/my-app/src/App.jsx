import { useState } from 'react';
import { motion } from 'framer-motion';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

import {
  CloudSun,
  Search,
  MapPin,
  Wind,
  Droplets,
  Sun,
  Moon,
  Cloud,
  ArrowUpRight,
  LoaderCircle,
  Thermometer,
  Sunrise,
  Sunset,
} from 'lucide-react';

import { getWeather } from './services/weather';
import { getWeatherInfo } from './services/weatherCodes';

function App() {
  const [isDark, setIsDark] = useState(true);
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function searchCity(event) {
    event.preventDefault();

    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  const current = weather?.current;
  const daily = weather?.daily;

  // Prepare chart data INSIDE App, after daily is defined.
  const chartData = daily
    ? daily.time.map((date, index) => ({
        day: new Date(`${date}T12:00:00`).toLocaleDateString(
          'en-US',
          {
            weekday: 'short',
            timeZone: 'UTC',
          }
        ),
        max: Math.round(daily.temperature_2m_max[index]),
        min: Math.round(daily.temperature_2m_min[index]),
      }))
    : [];

  const weatherInfo = current
    ? getWeatherInfo(current.weather_code, current.is_day)
    : { description: 'Weather information', Icon: CloudSun };

  const CurrentIcon = weatherInfo.Icon;


  const panelClass = isDark
    ? 'border-slate-800 bg-slate-900/80'
    : 'border-slate-200 bg-white';

  const mutedClass = isDark
    ? 'text-slate-400'
    : 'text-slate-500';

  function formatDay(date, index) {
    if (index === 0) return 'Today';

    return new Date(`${date}T12:00:00`).toLocaleDateString(
      'en-US',
      {
        weekday: 'short',
        timeZone: 'UTC',
      }
    );
  }

  function formatTime(value) {
    if (!value) return '--:--';

    return value.split('T')[1]?.slice(0, 5) ?? '--:--';
  }

  const backgroundStyle = (() => {
    if (!weather || !current) {
      return {
        background: isDark
          ? 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%)'
          : 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #e0e7ff 100%)',
      };
    }

    const code = current.weather_code;
    const isDay = current.is_day;

    if (!isDay) {
      return {
        background: 'linear-gradient(135deg, #020617 0%, #312e81 55%, #0f172a 100%)',
      };
    }

    if (code === 0) {
      return {
        background: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 55%, #fcd34d 100%)',
      };
    }

    if ([1, 2, 3].includes(code)) {
      return {
        background: 'linear-gradient(135deg, #64748b 0%, #0369a1 55%, #1e293b 100%)',
      };
    }

    if ([45, 48].includes(code)) {
      return {
        background: 'linear-gradient(135deg, #64748b 0%, #475569 55%, #1e3a8a 100%)',
      };
    }

    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
      return {
        background: 'linear-gradient(135deg, #334155 0%, #1e3a8a 55%, #1e1b4b 100%)',
      };
    }

    if ([71, 73, 75, 77, 85, 86].includes(code)) {
      return {
        background: 'linear-gradient(135deg, #e2e8f0 0%, #7dd3fc 55%, #2563eb 100%)',
      };
    }

    if ([95, 96, 99].includes(code)) {
      return {
        background: 'linear-gradient(135deg, #020617 0%, #581c87 55%, #312e81 100%)',
      };
    }

    return {
      background: 'linear-gradient(135deg, #0ea5e9 0%, #1d4ed8 55%, #312e81 100%)',
    };
  })();

  return (
    <main
      style={backgroundStyle}
      className={`min-h-screen transition-[background] duration-1000 ${
        isDark || weather ? 'text-white' : 'text-slate-900'
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-12">

        {/* Header */}
        <header className="flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-lg shadow-sky-500/20">
              <CloudSun size={27} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                SkyVista
              </h1>

              <p className={`text-xs ${mutedClass}`}>
                Weather, beautifully clear.
              </p>
            </div>
          </a>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDark(!isDark)}
              aria-label="Toggle color theme"
              className={`rounded-full border p-3 transition hover:scale-105 ${
                isDark
                  ? 'border-slate-700 bg-slate-900 hover:bg-slate-800'
                  : 'border-slate-300 bg-white hover:bg-slate-200'
              }`}
            >
              {isDark ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            <div
              className={`hidden rounded-full border px-4 py-2 text-sm sm:block ${
                isDark
                  ? 'border-slate-800 bg-slate-900'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />
              Weather API
            </div>
          </div>
        </header>

        {/* Hero and search */}
        <section className="py-14 text-center sm:py-20">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-sky-500">
            Discover your atmosphere
          </p>

          <h2 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Every forecast tells
            <span className="block bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
              a different story.
            </span>
          </h2>

          <p
            className={`mx-auto mt-5 max-w-xl text-base leading-7 sm:text-lg ${mutedClass}`}
          >
            Explore the weather around you with a clearer, calmer,
            more beautiful forecast.
          </p>

          <form
            onSubmit={searchCity}
            className={`mx-auto mt-8 flex max-w-xl items-center gap-3 rounded-2xl border p-2 shadow-2xl ${
              isDark
                ? 'border-slate-800 bg-slate-900 shadow-black/20'
                : 'border-slate-200 bg-white shadow-slate-300/30'
            }`}
          >
            <Search
              className="ml-2 shrink-0 text-slate-400"
              size={21}
            />

            <input
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder="Search a city, e.g. Tehran..."
              aria-label="City name"
              className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-slate-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60 sm:px-5"
            >
              {loading && (
                <LoaderCircle size={16} className="animate-spin" />
              )}

              {loading ? 'Loading' : 'Search'}
            </button>
          </form>

          {error && (
            <p
              role="alert"
              className="mx-auto mt-4 max-w-xl text-sm text-rose-400"
            >
              {error}
            </p>
          )}
        </section>

        {/* Empty state */}
        {!weather && !loading && (
          <section
            className={`mb-8 rounded-3xl border p-8 text-center ${panelClass}`}
          >
            <CloudSun
              size={42}
              className="mx-auto mb-4 text-sky-400"
            />

            <h3 className="text-xl font-semibold">
              Your forecast starts here
            </h3>

            <p className={`mt-2 text-sm ${mutedClass}`}>
              Search for a city to explore its current weather
              and seven-day forecast.
            </p>

            <button
              onClick={() => {
                setCity('Berlin');
                setError('');
              }}
              className="mt-5 rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
            >
              Try Berlin
            </button>
          </section>
        )}

        {/* Weather dashboard */}
        {weather && current && (
          <>
            {/* Current weather */}
            <motion.section
              key={`${weather.location.name}-weather`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className={`overflow-hidden rounded-[2rem] border p-6 sm:p-9 ${
                isDark
                  ? 'border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/50'
                  : 'border-slate-200 bg-gradient-to-br from-white via-white to-sky-100'
              }`}
            >
              <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
                <div>
                  <div className={`mb-3 flex items-center gap-2 text-sm ${mutedClass}`}>
                    <MapPin size={16} className="text-sky-500" />

                    <span>
                      {weather.location.name}
                      {weather.location.country
                        ? `, ${weather.location.country}`
                        : ''}
                    </span>

                    <ArrowUpRight size={15} />
                  </div>

                  <p className={`text-sm ${mutedClass}`}>
                    Current weather
                  </p>

                  <div className="mt-2 flex items-start">
                    <span className="text-7xl font-light tracking-tighter sm:text-8xl">
                      {Math.round(current.temperature_2m)}°
                    </span>

                    <CurrentIcon
                      size={55}
                      strokeWidth={1.3}
                      className="ml-4 mt-3 text-amber-400"
                    />
                  </div>

                  <p className="mt-2 text-xl font-medium">
                    {weatherInfo.description}
                  </p>

                  <p className={`mt-1 text-sm ${mutedClass}`}>
                    Feels like{' '}
                    {Math.round(current.apparent_temperature)}°C
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-2">
                  {[
                    {
                      label: 'Humidity',
                      value: `${current.relative_humidity_2m}%`,
                      icon: Droplets,
                    },
                    {
                      label: 'Wind speed',
                      value: `${Math.round(current.wind_speed_10m)} km/h`,
                      icon: Wind,
                    },
                    {
                      label: 'Precipitation',
                      value: `${current.precipitation} mm`,
                      icon: Cloud,
                    },
                    {
                      label: 'Feels like',
                      value: `${Math.round(current.apparent_temperature)}°C`,
                      icon: Thermometer,
                    },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className={`rounded-2xl border p-4 sm:p-5 ${
                          isDark
                            ? 'border-slate-800 bg-slate-950/50'
                            : 'border-slate-200 bg-white/80'
                        }`}
                      >
                        <Icon
                          size={21}
                          className="mb-4 text-sky-500"
                        />

                        <p className={`text-xs ${mutedClass}`}>
                          {item.label}
                        </p>

                        <p className="mt-1 text-base font-semibold">
                          {item.value}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.section>

            {/* Seven-day forecast */}
            <section className="py-10">
              <div className="mb-5">
                <h3 className="text-xl font-semibold">
                  The next few days
                </h3>

                <p className={`mt-1 text-sm ${mutedClass}`}>
                  Your seven-day weather forecast
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
                {daily.time.map((date, index) => {
                  const info = getWeatherInfo(
                    daily.weather_code[index]
                  );

                  const Icon = info.Icon;

                  return (
                    <div
                      key={date}
                      className={`rounded-2xl border p-4 transition hover:-translate-y-1 ${
                        isDark
                          ? 'border-slate-800 bg-slate-900/70 hover:border-sky-500/50'
                          : 'border-slate-200 bg-white hover:border-sky-300'
                      }`}
                    >
                      <p className={`text-sm ${mutedClass}`}>
                        {formatDay(date, index)}
                      </p>

                      <Icon
                        size={28}
                        className="my-4 text-amber-400"
                      />

                      <p className="text-sm font-medium">
                        {info.description}
                      </p>

                      <div className="mt-3 flex items-center gap-2 text-sm">
                        <span className="font-semibold">
                          {Math.round(daily.temperature_2m_max[index])}°
                        </span>

                        <span className={mutedClass}>
                          {Math.round(daily.temperature_2m_min[index])}°
                        </span>
                      </div>

                      <div
                        className={`mt-4 space-y-2 border-t pt-3 text-xs ${
                          isDark
                            ? 'border-slate-800'
                            : 'border-slate-200'
                        }`}
                      >
                        <p className={`flex items-center gap-1 ${mutedClass}`}>
                          <Sunrise size={14} />
                          {formatTime(daily.sunrise[index])}
                        </p>

                        <p className={`flex items-center gap-1 ${mutedClass}`}>
                          <Sunset size={14} />
                          {formatTime(daily.sunset[index])}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Temperature chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className={`mt-8 rounded-3xl border p-5 sm:p-7 ${
                  isDark
                    ? 'border-slate-800 bg-slate-900/80'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="mb-6">
                  <h3 className="text-xl font-semibold">
                    Temperature trends
                  </h3>

                  <p className={`mt-1 text-sm ${mutedClass}`}>
                    Daily high and low temperatures · °C
                  </p>
                </div>

                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData}
                      margin={{
                        top: 10,
                        right: 10,
                        left: -20,
                        bottom: 0,
                      }}
                    >
                      <defs>
                        <linearGradient
                          id="maxTemperature"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#38bdf8"
                            stopOpacity={0.35}
                          />

                          <stop
                            offset="95%"
                            stopColor="#38bdf8"
                            stopOpacity={0}
                          />
                        </linearGradient>

                        <linearGradient
                          id="minTemperature"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#818cf8"
                            stopOpacity={0.25}
                          />

                          <stop
                            offset="95%"
                            stopColor="#818cf8"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={isDark ? '#334155' : '#e2e8f0'}
                        vertical={false}
                      />

                      <XAxis
                        dataKey="day"
                        tick={{
                          fill: isDark ? '#94a3b8' : '#64748b',
                          fontSize: 12,
                        }}
                        axisLine={false}
                        tickLine={false}
                        tickMargin={12}
                      />

                      <YAxis
                        tick={{
                          fill: isDark ? '#94a3b8' : '#64748b',
                          fontSize: 12,
                        }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => `${value}°`}
                      />

                      <Tooltip
                        contentStyle={{
                          backgroundColor: isDark
                            ? '#0f172a'
                            : '#ffffff',
                          border: `1px solid ${
                            isDark ? '#334155' : '#e2e8f0'
                          }`,
                          borderRadius: '12px',
                          color: isDark ? '#ffffff' : '#0f172a',
                        }}
                        formatter={(value, name) => [
                          `${value}°C`,
                          name === 'max' ? 'High' : 'Low',
                        ]}
                        labelStyle={{
                          color: isDark ? '#cbd5e1' : '#475569',
                          marginBottom: '4px',
                        }}
                      />

                      <Area
                        type="monotone"
                        dataKey="max"
                        name="max"
                        stroke="#38bdf8"
                        strokeWidth={3}
                        fill="url(#maxTemperature)"
                        activeDot={{ r: 5 }}
                      />

                      <Area
                        type="monotone"
                        dataKey="min"
                        name="min"
                        stroke="#818cf8"
                        strokeWidth={3}
                        fill="url(#minTemperature)"
                        activeDot={{ r: 5 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 flex flex-wrap gap-5 text-sm">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
                    Daily high
                  </span>

                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-indigo-400" />
                    Daily low
                  </span>
                </div>
              </motion.div>
            </section>
          </>
        )}

        {/* Footer */}
        <footer
          className={`border-t py-6 text-center text-sm ${
            isDark
              ? 'border-slate-800 text-slate-500'
              : 'border-slate-200 text-slate-500'
          }`}
        >
          SkyVista · Weather data by Open-Meteo
        </footer>
      </div>
    </main>
  );
}

export default App;