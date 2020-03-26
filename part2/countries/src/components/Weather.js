import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`
      )
      .then(response => {
        setWeather(response.data.current);
      });
  }, [capital]);

  return (
    <>
      {weather ? (
        <>
          <h3>Weather in {capital}</h3>
          <p>
            <b>temperature:</b> {weather.temperature} Celcius
          </p>
          {weather.weather_icons.map(icon => (
            <img key={icon} src={icon} alt="weather icon" />
          ))}
          <p>
            <b>wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}
          </p>
        </>
      ) : null}
    </>
  );
};

export default Weather;
