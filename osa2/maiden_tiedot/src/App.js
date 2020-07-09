import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

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
              wind_dir : response.data.current.wind_dir,
              icons : response.data.current.weather_icons}))
          } else {
            setWeather(array.concat({temperature : undefined, 
              wind_speed : undefined,
              wind_dir : undefined,
              icons : undefined}))
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
    let icons = undefined
    if (weather[0]) {
      temperature = weather[0].temperature
      wind_speed = weather[0].wind_speed
      wind_dir = weather[0].wind_dir
      icons = weather[0].icons
    } 
  
    return (
      <div>
        find countries
        <Filter handler={handleChange} value={country} />
        <Countries countries={cntrs} onClick={chooseCountry} temperature={temperature} wind_speed={wind_speed} wind_dir={wind_dir} icons={icons}/>
      </div>
    )
}

export default App