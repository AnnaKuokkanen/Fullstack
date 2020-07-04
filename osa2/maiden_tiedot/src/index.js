import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return (
      <div>
        <p>too many countries, specify another filter</p>
      </div>
    )
  }
  if (countries.length === 1) {
    const country = countries[0]
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
      </div>
    )
  }
  return (
    <div>
      <ul>
        {countries.map(country =>
          <ul key={country.name}>
            {country.name}
          </ul>
        )}
      </ul>
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
    //console.log('effect')
    const array = []
    //const res = axios.get('https://restcountries.eu/rest/v2/all')
    //console.log('response', res)
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(array.concat(response.data))
      })
  }, [])
  //console.log('render', countries.length, 'countries')
  //console.log('countries:', countries)


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
      <Countries countries={cntrs} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))