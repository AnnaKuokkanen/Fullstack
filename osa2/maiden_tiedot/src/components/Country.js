import React from 'react'
import Weather from './Weather'

const Country = ({ country, temperature, wind_speed, wind_dir, icons }) => {
    return (
      <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
          {country.languages.map(language => 
            <li key={language.name}>
              {language.name}
            </li>
          )}
        </ul>
        <img className="img-responsive" src={country.flag} width="100" height="50" alt="flag"/>
        <Weather capital={country.capital} temperature={temperature} wind_speed={wind_speed} wind_dir={wind_dir} icons={icons} />
      </div>
    )
}

export default Country