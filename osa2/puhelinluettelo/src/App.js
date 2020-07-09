import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import People from './components/People'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import './index.css'

const App = () => {
    const [ persons, setPersons] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ search, setSearch ] = useState('')
    const [ notificationMessage, setNotificationMessage ] = useState('')
  
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
        setNotificationMessage(`${newObject.name} is successfully added to phonebook`)
        setTimeout(() => {
          setNotificationMessage('')
        }, 5000)
      }
      else {
        const person = persons.filter(p => p.name === newObject.name)[0]
        updatePerson(person.id)
      }
      setNewName('')
      setNewNumber('')
      setSearch('')
    }

    const removePerson = (id) => {
      const person = persons.filter(person => person.id === id)[0]
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
        setPersons(persons.map(person => person.id !== id ? person : newPerson))
        setNotificationMessage(`${person.name}'s number is successfully updated`)
        setTimeout(() => {
          setNotificationMessage('')
        }, 5000)
      }
    }
  
    const people = search.length === 0
      ? persons
      : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
  
    return (
      <div>
        <h2>Phonebook</h2>
        <Notification message={notificationMessage} />
        <Filter handler={handleSearch} value={search}/>
        <h2>add a new</h2>
        <PersonForm onSubmit={addPerson} nameHandler={handleNameChange} nameValue={newName} numberHandler={handleNumberChange} numberValue={newNumber} />
        <h2>Numbers</h2>
        <People people={people} onClick={removePerson} />
      </div>
    )
}
export default App