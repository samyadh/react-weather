import WeatherForecast from "../../widgets/weatherForecast/weatherForecast";
import "./landing.css";

import WeatherInfoProvider from "../../../providers/weather/weatherInfoProvider";

function Landing() {
  return (
    <div className="forecast-wrapper">
      <WeatherInfoProvider>
        <WeatherForecast />
      </WeatherInfoProvider>
    </div>
  );
}

export default Landing;
