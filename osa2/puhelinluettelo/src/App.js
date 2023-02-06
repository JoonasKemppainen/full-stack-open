import { useState } from 'react'

const Person = ({person}) => <p>{person.name} {person.number}</p>

const AddNew = (props) => {
  return (
      <form>
          name: <input name="name" value={props.newName} onChange={props.handleChange} />
          <br />
          number: <input name="number" value={props.newNumber} onChange={props.handleChange} />
          <button type="submit" onClick={props.handleClick}>add</button>
      </form>
  )
}

 const Persons = ({persons, filter}) => {
  return (
    <div>
      {persons.map(person => {
        if (person.name.toLowerCase().includes(filter.toLowerCase())) {
          return <Person key={person.name} person={person} />  
        }
      })}
    </div>
  )
 }

const Filter = ({filter, handleChange}) => {
  return (
      <form>
        filter shown with <input name="filter" value={filter} onChange={handleChange}  />
      </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  const handleChange = (e) => {
    if (e.target.name === "name") setNewName(e.target.value)
    if (e.target.name === "number") setNewNumber(e.target.value)
    if (e.target.name === "filter") setFilter(e.target.value)
  }

  const handleClick = (e) => {
    e.preventDefault()
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({
        name: newName,
        number: newNumber
      }))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleChange} filter={filter} />
      <h2>add a new</h2>
      <AddNew handleChange={handleChange} handleClick={handleClick} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )

}

export default App