import { useState, createContext, useEffect } from "react";
import frenchCities from "./../../assets/data/cities-fr.json";

const { baseUrl, apiKey } = {
  baseUrl: "https://api.openweathermap.org/data/2.5/",
  apiKey: "591af8c3c9dd19762d7fbdf40d808ac1",
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
      const weatherResponse = await fetch(
        `${baseUrl}/weather?lat=${cityDetails.lat}&lon=${cityDetails.lon}&units=metric&appid=${apiKey}`
      ).then((res) => res.json());
      const forecastResponse = await fetch(
        `${baseUrl}/forecast/daily?lat=${cityDetails.lat}&lon=${cityDetails.lon}&cnt=4&units=metric&appid=${apiKey}`
      ).then((res) => res.json());

      const weatherInfo = [];
      if (weatherResponse) {
        weatherInfo.push(
          getWeatherItem(
            weatherResponse.main.temp,
            weatherResponse.main.temp_max,
            weatherResponse.main.temp_min,
            weatherResponse.weather[0].id,
            weatherResponse.dt
          )
        );
      }

      if (forecastResponse && forecastResponse.list) {
        forecastResponse.list.forEach((forecast, index) => {
          if (index > 0) {
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
