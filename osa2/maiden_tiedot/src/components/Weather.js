import React from 'react'

const Weather = ({ capital, temperature, wind_speed, wind_dir, icons }) => {
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <p>temperature: {temperature}</p>
        <p>wind: {wind_speed} mph, direction {wind_dir}</p>
        <img className="img-responsive" src={icons} width="100" height="80" alt="weather"/>
      </div>
    )
}

export default Weather