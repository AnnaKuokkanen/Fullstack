import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import People from './components/People'
import PersonForm from './components/PersonForm'

const App = () => {
    const [ persons, setPersons] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ search, setSearch ] = useState('')
  
    useEffect(() => {
      const array = []
      personService
        .getAll()   
        .then(response => {
          setPersons(array.concat(response.data))
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
        personService
          .create(newObject)
          .then(response => {
            console.log(response)
          })
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
export default App