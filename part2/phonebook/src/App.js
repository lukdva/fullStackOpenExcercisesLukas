import axios from 'axios'
import { useState, useEffect } from 'react'
import personService from './services/persons'

const Message = ({msg}) => {
  if (msg == null) {
    return null
  }
  return (
    <div className='notification'>
      {msg}
    </div>
  )
}
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
  const [message, setNewMessage] = useState('Test');

  const submitPhone = (event) => {
    event.preventDefault();
    const samePerson = persons.find(person => person.name === newName)
    if(samePerson){
      if(window.confirm(`${newName} is already added to phonebook, replace the old Number?`)){
        const updatedPerson = {...samePerson, number:newPhone};
        personService
        .update(samePerson.id, updatedPerson)
        .then(responsePerson =>{
          setPersons(persons.map(person => (person.id !== samePerson.id)? person:responsePerson))
          setNewMessage(`${responsePerson.name} phone number has been updated`)
          setTimeout(() => {setNewMessage(null)}, 5000);
        }
        );
      }
    }
    else {
      const personObject = {name: newName, number:newPhone}
      personService
      .create(personObject)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setNewMessage(`${createdPerson.name} was added`)
          setTimeout(() => {setNewMessage(null)}, 5000);
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
      <Message msg={message}/>
      <Filter handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm submitPhone={submitPhone} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} handleDeleteClick={handleDeleteClick}/>
    </div>
  )
}

export default App