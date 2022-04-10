import { useContext } from "react";
import { WeatherInfoContext } from "../../../providers/weather/weatherInfoProvider";
import Select from "../../ui/select/select";
import "./weatherForecast.css";
import "./weathericons.css";

function WeatherForecast() {
  const {
    cityWeatherInfo,
    selectedCity,
    setSelectedCity,
    cityList,
    isLoading,
  } = useContext(WeatherInfoContext);

  const handleCitySelect = (cityId) => {
    const cityFound = cityList.find((city) => city.id === Number(cityId));
    if (cityFound !== selectedCity) setSelectedCity(cityFound);
  };

  return (
    <div className="forecast-container">
      <div className="form-group">
        <label htmlFor="citySelector">Select City</label>
        <Select
          id="citySelector"
          options={cityList.map((city) => ({ label: city.nm, value: city.id }))}
          onSelectChange={handleCitySelect}
        />
      </div>
      <div className={`weather-info-wrapper ${isLoading ? "loading" : ""}`}>
        {isLoading ? (
          <div className="loader"></div>
        ) : (
          cityWeatherInfo &&
          cityWeatherInfo.length &&
          cityWeatherInfo.map((weatherInfo, index) => (
            <div className={index === 0 ? "today" : ""} key={weatherInfo.temp}>
              <div className="name">
                {index === 0 ? selectedCity.nm : weatherInfo.day}
              </div>
              <div className={weatherInfo.iconClass}></div>
              {index === 0 ? (
                <div>{weatherInfo.temp}°</div>
              ) : (
                <div>
                  <div>{weatherInfo.max}°</div>
                  <div>{weatherInfo.min}°</div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default WeatherForecast;
