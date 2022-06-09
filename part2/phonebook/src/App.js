import axios from 'axios'
import { useState, useEffect } from 'react'
import personService from './services/persons'

const Persons = ({persons, filter, handleDeleteClick}) => {
  return (
    persons
    .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    .map(person => <p key={person.name}>{person.name} {person.number} <button onClick={() => handleDeleteClick(person.id)}>delete</button> </p> )
  )
}
const Filter = ({handleFilterChange}) => {
  return(
    <div>
      filter shown with: <input onChange={handleFilterChange}/>
    </div>
  )
}
const PersonForm = ({submitPhone, handleNameChange, handlePhoneChange}) => {
  return(
    <form onSubmit={submitPhone}>
        <div>
          name: <input onChange={handleNameChange}/>
        </div>
        <div>
          number: <input onChange={handlePhoneChange}/>
          </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const submitPhone = (event) => {
    event.preventDefault();
    if(persons.find(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {name: newName, number:newPhone}
      personService
      .create(personObject)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  }
  const handleDeleteClick = (id) => {
    personService
    .remove(id)
    .then( () =>{
      setPersons(persons.filter(person => person.id !==id));
    })
  }
  useEffect(() => {
    personService
    .getAll()
    .then(retrievedPersons => {
      console.log(retrievedPersons)
      setPersons(retrievedPersons);
    });
  },[]);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm submitPhone={submitPhone} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} handleDeleteClick={handleDeleteClick}/>
    </div>
  )
}

export default App