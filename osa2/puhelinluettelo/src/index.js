import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '112'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
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
    console.log(persons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        name:
        <input
          onChange={handleNameChange}
          value={newName}
        /> 
        <br></br> 
        number:
        <input
          onChange={handleNumberChange}
          value={newNumber}
        /> 
        <br></br> 
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <ul key={person.name}>
            {person.name} {person.number}
          </ul>
        )}
      </ul>
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))