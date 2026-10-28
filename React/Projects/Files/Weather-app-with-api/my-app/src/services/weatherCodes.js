import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from 'lucide-react';

export function getWeatherInfo(code, isDay = 1) {
  if (code === 0) {
    return {
      description: isDay ? 'Clear sky' : 'Clear night',
      Icon: isDay ? Sun : CloudSun,
    };
  }

  if ([1, 2].includes(code)) {
    return { description: 'Partly cloudy', Icon: CloudSun };
  }

  if (code === 3) {
    return { description: 'Overcast', Icon: Cloud };
  }

  if ([45, 48].includes(code)) {
    return { description: 'Foggy', Icon: CloudFog };
  }

  if ([51, 53, 55, 56, 57].includes(code)) {
    return { description: 'Drizzle', Icon: CloudDrizzle };
  }

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return { description: 'Rainy', Icon: CloudRain };
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return { description: 'Snowy', Icon: CloudSnow };
  }

  if ([95, 96, 99].includes(code)) {
    return { description: 'Thunderstorm', Icon: CloudLightning };
  }

  return { description: 'Unknown conditions', Icon: CloudSun };
}