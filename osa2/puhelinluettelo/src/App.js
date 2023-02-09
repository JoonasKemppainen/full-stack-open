import { useEffect, useState } from 'react'
import personsService from "./services/persons"

const Person = ({person, onClick}) => {
  return (
    <form>
      {person.name} {person.number}
      <button id={person.id} onClick={onClick} name={person.name} >delete</button>
    </form>
  )
}

const AddNew = (props) => {
  return (
      <form>
          name: <input name="name" value={props.newName} onChange={props.handleChange} />
          <br />
          number: <input name="number" value={props.newNumber} onChange={props.handleChange} />
          <br />
          <button type="submit" onClick={props.onClick}>add</button>
      </form>
  )
}

 const Persons = ({persons, filter, onClick}) => {
  return (
    <div>
      {persons.map(person => {
        if (person.name.toLowerCase().includes(filter.toLowerCase())) {
          return <Person key={person.name} person={person} onClick={onClick} />
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

const Notifications = ({notification, errorColor}) => {
  if (notification === null) {
    return null
  }

  return (
    <>
      <h1 className="notification" id={errorColor}>{notification}</h1>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [notification, setNotification] = useState(null)
  const [errorColor, setErrorColor] = useState("")

  useEffect(() => {
    personsService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const handleChange = (e) => {
    if (e.target.name === "name") setNewName(e.target.value)
    if (e.target.name === "number") setNewNumber(e.target.value)
    if (e.target.name === "filter") setFilter(e.target.value)
  }

  const handleAddClick = (e) => {
    e.preventDefault()
    if (persons.some(person => person.name === newName) && persons.some(person => person.number === newNumber)) {
      setErrorColor("red")
      setNotification(`${newName} is already added to phonebook, edit number to change it`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } else if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
        const personChange = persons.find(person => person.name === newName)
        personsService
        .update(personChange.id, {...personChange, number: newNumber})
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== personChange.id ? person : returnedPerson))
          setNewName("")
          setNewNumber("") 
          setErrorColor("green")
          setNotification(`Number changed for ${personChange.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 3000)        
        }).catch(() => {
          personsService
            .getAll()
            .then(initialPersons => {
              setPersons(initialPersons);
          })
          setErrorColor("red")
          setNotification(`${personChange.name} has already been removed from server`)
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        })
      }
    } else {
      personsService
      .create({
        name: newName,
        number: newNumber
        })
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setErrorColor("green")
        setNotification(`${newName} added`)
        setTimeout(() => {
          setNotification(null)
        }, 3000)
        setNewName("")
        setNewNumber("")
      })
    }
  }

  const handleDeleteClick = (e) => {
    e.preventDefault()
    if (window.confirm(`delete ${e.target.name}?`)) {
      personsService
        .deletePerson(e.target.id)
        .then(() => { 
          personsService
            .getAll()
            .then(initialPersons => {
              setPersons(initialPersons);
              setErrorColor("green")
              setNotification(`Removed ${e.target.name}`)
              setTimeout(() => {
              setNotification(null)
            }, 3000)
          })   
        })
    }
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notifications notification={notification} errorColor={errorColor} />
      <Filter handleChange={handleChange} filter={filter} />
      <h2>add a new</h2>
      <AddNew handleChange={handleChange} onClick={handleAddClick} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} onClick={handleDeleteClick} />
    </div>
  )

}

export default App