import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const newObject = {
      name : newName
    }
    const p = persons.concat(newObject)
    setPersons(p)
    setNewName('')
    console.log(persons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        name: 
        <input
          onChange={handleNameChange}
          value={newName}
        />  
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <ul key={person.name}>
            {person.name}
          </ul>
        )}
      </ul>
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))