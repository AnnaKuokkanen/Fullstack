import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import People from './components/People'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import Error from './components/Error'
import './index.css'

const App = () => {
    const [ persons, setPersons] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ search, setSearch ] = useState('')
    const [ notificationMessage, setNotificationMessage ] = useState('')
    const [ errorMessage, setErrorMessage ] = useState('')
  
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
      const p = persons.concat(newObject)
      if (persons.filter(person => person.name === newObject.name).length === 0) {
        personService
          .create(newObject)
          .then(response => {
            console.log(response)
          })
          .then(
            setPersons(p)
          )
          .then(
            setNotificationMessage(`${newObject.name} is successfully added to phonebook`)
          )
          .then(
            setTimeout(() => {
              setNotificationMessage('')
            }, 5000)
          )
          .catch(error => {
            console.log('Virhe', error.response.data.error)
            setNotificationMessage('')
            setErrorMessage(
              error.response.data.error
            )
            setTimeout(() => {
              setErrorMessage('')
            }, 5000)
          })
      }
      else {
        const person = persons.filter(p => p.name === newObject.name)[0]
        updatePerson(person.id)
      }
      setNewName('')
      setNewNumber('')
      setSearch('')
    }

    const removePerson = id => {
      const person = persons.find(p => p.id === id)
      const result = window.confirm(`Delete ${person.name}?`)
      if (result) {
        personService
          .remove(id)
        const array = persons.filter(person => person.id !== id)
        setPersons(array)
        setNotificationMessage(`${person.name} is successfully removed from phonebook`)
        setTimeout(() => {
          setNotificationMessage('')
        }, 5000)
      }
      
    }

    const updatePerson = id => {
      const person = persons.find(p => p.id === id)
      const result = window.confirm(`${person.name} is already in the phonebook. Replace ${person.name}?`)
      const newPerson = {...person, number: newNumber}
      if (result) {
        personService
          .update(id, newPerson)
          .then(
            setPersons(persons.map(person => person.id !== id ? person : newPerson))
          )
          .then(
            setNotificationMessage(`${person.name}'s number is successfully updated`)
          )
          .then(
            setTimeout(() => {
              setNotificationMessage('')
            }, 5000)
          )
          .catch(error => {
            setNotificationMessage('')
            setErrorMessage(
              `Person '${person.name}' was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage('')
            }, 5000)
          })
      }
    }
  
    const people = search.length === 0
      ? persons
      : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
  
    return (
      <div>
        <h2>Phonebook</h2>
        <Notification message={notificationMessage} />
        <Error message={errorMessage} />
        <Filter handler={handleSearch} value={search} />
        <h2>add a new</h2>
        <PersonForm onSubmit={addPerson} nameHandler={handleNameChange} nameValue={newName} numberHandler={handleNumberChange} numberValue={newNumber} />
        <h2>Numbers</h2>
        <People people={people} onClick={removePerson} />
      </div>
    )
}
export default App