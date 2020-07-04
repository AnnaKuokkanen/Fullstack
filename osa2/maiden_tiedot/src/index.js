import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'

const Countries = ({ countries, onClick }) => {
  if (countries.length > 10) {
    return (
      <div>
        <p>too many countries, specify another filter</p>
      </div>
    )
  }
  if (countries.length === 1) {
    return(
      <Country country={countries[0]}/>
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

const Country = ({ country }) => {
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
      <img className="img-responsive" src={country.flag} alt="flag"/>
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

  useEffect(() => {
    const array = []
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(array.concat(response.data))
      })
  }, [])

  const chooseCountry = (c) => {
    console.log('klikataan')
    setCountry(c)
    console.log('country:', country)
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    setCountry(event.target.value)
  }

  const cntrs = countries.filter(cntr => cntr.name.toLowerCase().includes(country.toLowerCase()))
  console.log('cntrs', cntrs)

  return (
    <div>
      find countries
      <Filter handler={handleChange} value={country} />
      <Countries countries={cntrs} onClick={chooseCountry} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))