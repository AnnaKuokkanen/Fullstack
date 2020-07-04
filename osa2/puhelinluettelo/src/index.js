import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'

const Filter = ({handler, value}) => {
  return (
    <div>
      filter shown with
      <input
        onChange={handler}
        value={value}
      />
    </div>
  )
}

const PersonForm = ({onSubmit, nameHandler, nameValue, numberHandler, numberValue}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        name:
        <input
          onChange={nameHandler}
          value={nameValue}
        /> 
        <br></br> 
        number:
        <input
          onChange={numberHandler}
          value={numberValue}
        /> 
        <br></br> 
        <button type="submit">add</button>
      </form>
    </div>
  )
}

const People = ({people}) => {
  return (
    <div>
      <ul>
        {people.map(person =>
          <ul key={person.name}>
            {person.name} {person.number}
          </ul>
        )}
      </ul>
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        const p = persons.concat(response.data)
        setPersons(p)
      })
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newObject = {
      name : newName,
      number : newNumber
    }
    if (persons.filter(person => person.name === newObject.name).length === 0) {
      const p = persons.concat(newObject)
      setPersons(p)
    }
    else {
      alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
    setSearch('')
    console.log(persons)
  }

  const people = search.length === 0
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handler={handleSearch} value={search}/>
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} nameHandler={handleNameChange} nameValue={newName} numberHandler={handleNumberChange} numberValue={newNumber} />
      <h2>Numbers</h2>
      <People people={people} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))