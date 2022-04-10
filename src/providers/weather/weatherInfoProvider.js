import { useState, createContext, useEffect } from "react";
import frenchCities from "./../../assets/data/cities-fr.json";

const { baseUrl, apiKey } = {
  baseUrl: process.env.REACT_APP_OPEN_WEATHER_BASE_URL,
  apiKey: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
};

export const WeatherInfoContext = createContext({});

const WeatherInfoProvider = ({ children }) => {
  const [cityWeatherInfo, setCityWeatherInfo] = useState({ name: "new" });
  const [selectedCity, setSelectedCity] = useState(frenchCities[0]);
  const [loading, setLoading] = useState(true);

  const getWeatherItem = (temp, max, min, iconId, timestamp) => {
    return {
      temp: Math.round(temp),
      max: Math.round(max),
      min: Math.round(min),
      iconClass: `wi wi-icon-${iconId}`,
      day: new Date(timestamp * 1000).toLocaleDateString("en", {
        weekday: "long",
      }),
    };
  };

  useEffect(() => {
    const getWeatherForecast = async (cityDetails) => {
      setLoading(true);
      const forecastResponse = await fetch(
        `${baseUrl}onecall?lat=${cityDetails.lat}&lon=${cityDetails.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`
      ).then((res) => res.json());

      const weatherInfo = [];

      if (forecastResponse && forecastResponse.daily.length) {
        weatherInfo.push(
          getWeatherItem(
            forecastResponse.current.temp,
            forecastResponse.current.temp.max,
            forecastResponse.current.temp.min,
            `wi wi-icon-${forecastResponse.current.weather[0].id}`,
            forecastResponse.current.dt
          )
        );
        forecastResponse.daily.forEach((forecast, index) => {
          if (index < 3) {
            weatherInfo.push(
              getWeatherItem(
                forecast.temp.day,
                forecast.temp.max,
                forecast.temp.min,
                `wi wi-icon-${forecast.weather[0].id}`,
                forecast.dt
              )
            );
          }
        });
      }
      setCityWeatherInfo(weatherInfo);
      setLoading(false);
    };
    getWeatherForecast(selectedCity);
  }, [selectedCity]);

  return (
    <WeatherInfoContext.Provider
      value={{
        cityWeatherInfo,
        setCityWeatherInfo,
        selectedCity,
        setSelectedCity,
        isLoading: loading,
        cityList: frenchCities,
      }}
    >
      {children}
    </WeatherInfoContext.Provider>
  );
};

export default WeatherInfoProvider;
