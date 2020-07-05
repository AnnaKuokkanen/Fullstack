import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'

const Countries = ({ countries, onClick, temperature, wind_speed, wind_dir }) => {
  if (countries.length > 10) {
    return (
      <div>
        <p>too many countries, specify another filter</p>
      </div>
    )
  }
  if (countries.length === 1) {
    return(
      <Country country={countries[0]} temperature={temperature} wind_speed={wind_speed} wind_dir={wind_dir}/>
    )
  }
  return (
    <div>
      <ul>
        {countries.map(country =>
          <ul key={country.name}>
            {country.name}
            <button onClick={() => {onClick(country.name)}}>show</button>
          </ul>
        )}
      </ul>
    </div>
  )
}

const Country = ({ country, temperature, wind_speed, wind_dir }) => {
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
      <Weather capital={country.capital} temperature={temperature} wind_speed={wind_speed} wind_dir={wind_dir}/>
    </div>
  )
}

const Weather = ({ capital, temperature, wind_speed, wind_dir }) => {
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>temperature: {temperature}</p>
      <p>wind: {wind_speed} mph, direction {wind_dir}</p>
    </div>
  )
}


const Filter = ({handler, value}) => {
  return (
    <div>
      <input
        onChange={handler}
        value={value}
      />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('')
  const [weather, setWeather] = useState([])

  useEffect(() => {
    const array = []
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(array.concat(response.data))
      })
  }, [])
  
  useEffect(() => {
    const array = []
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country}`)
      .then(response => {
        if(response.data.current) {
          setWeather(array.concat({temperature : response.data.current.temperature, 
            wind_speed : response.data.current.wind_speed, 
            wind_dir : response.data.current.wind_dir}))
        } else {
          setWeather(array.concat({temperature : undefined, 
            wind_speed : undefined,
            wind_dir : undefined}))
        }
      })
  }, [country])

  const chooseCountry = (c) => {
    setCountry(c)
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    setCountry(event.target.value)
  }

  const cntrs = countries.filter(cntr => cntr.name.toLowerCase().includes(country.toLowerCase()))

  let temperature = undefined
  let wind_speed = undefined
  let wind_dir = undefined
  if (weather[0]) {
    temperature = weather[0].temperature
    wind_speed = weather[0].wind_speed
    wind_dir = weather[0].wind_dir
  } 

  return (
    <div>
      find countries
      <Filter handler={handleChange} value={country} />
      <Countries countries={cntrs} onClick={chooseCountry} temperature={temperature} wind_speed={wind_speed} wind_dir={wind_dir} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))