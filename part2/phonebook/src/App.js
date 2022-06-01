import { useState } from 'react'

const Numbers = ({numbers}) => {
  return (
    numbers.map(number => <p key={number.name}>{number.name}</p> )
  )
}
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const submitPhone = (event) => {
    event.preventDefault();
    setPersons(persons.concat({name: newName}));
    console.log(persons);
  }

  const handlePhoneChange = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitPhone}>
        <div>
          name: <input onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers numbers={persons}/>
    </div>
  )
}

export default App