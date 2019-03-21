import React, { useState } from 'react'
import styled from 'styled-components'

export default ({ latitude, longitude }) => {
  const [forecast, setForecast] = useState()
  const setDestructuredForecast = ({
    weather,
    main,
    visibility,
    wind,
    clouds,
    sys,
  }) => setForecast({ weather, main, visibility, wind, clouds, sys })
  if (!forecast) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${
        process.env.REACT_APP_OWM_API_KEY
      }`
    )
      .then(response => response.json())
      .then(result => setDestructuredForecast(result))
  }
  return forecast ? (
    <ForecastWrapper>
      {console.log(forecast)}
      <div>
        <h2>Weather Info</h2>
        <a href=''>5 days</a>&nbsp;&nbsp;|&nbsp;&nbsp; <a href=''>16 days</a>
        <h2>Current Weather: {forecast.main.temp} Deg Fahrenheit</h2>
        <h2>{forecast.weather[0].description}</h2>
      </div>
    </ForecastWrapper>
  ) : (
    <ForecastLoadingWrapper>Forecast Loading</ForecastLoadingWrapper>
  )
}

const ForecastWrapper = styled.div`
  //add styles here for current location info
  background: rgba(255, 255, 255, 0.8);
  height: 20vh;
  width: 90vw;
  margin: 0 auto;
  padding: 2%;
`

const ForecastLoadingWrapper = styled.div`
  //add styles here for current location loading placeholder
`
