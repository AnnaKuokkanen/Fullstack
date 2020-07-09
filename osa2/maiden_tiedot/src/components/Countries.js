import React from 'react'
import Country from './Country'

const Countries = ({ countries, onClick, temperature, wind_speed, wind_dir, icons }) => {
    if (countries.length > 10) {
        return (
        <div>
            <p>too many countries, specify another filter</p>
        </div>
        )
    }
    if (countries.length === 1) {
        return(
        <Country country={countries[0]} temperature={temperature} wind_speed={wind_speed} wind_dir={wind_dir} icons={icons}/>
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

export default Countries