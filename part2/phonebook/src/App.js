import React, {useState, useEffect} from 'react';
import axios from "axios"
import Search from "./components/Search";
import AddPersonForm from "./components/AddPersonForm";
import PhonebookEntries from "./components/PhonebookEntries";
import personService from "./services/persons"
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [searchValue, setSearchValue] = useState("")
    const [currentMessage, setCurrentMessage] = useState(null)

    useEffect(() => {
        axios
            .get("http://localhost:3001/persons")
            .then((response) => {
                setPersons(response.data)
            })
    }, [])

    let shownPersons = [...persons]
    if (searchValue) shownPersons = persons.filter(person => person.name.toLowerCase().includes(searchValue.toLowerCase()))

    const handleNewName = (event) => setNewName(event.target.value)
    const handleNewNumber = (event) => setNewNumber(event.target.value)
    const handleSearchValue = (event) => setSearchValue(event.target.value)

    const resetForm = () => {
        setNewName("")
        setNewNumber("")
    }

    const handleErrorMessage = (text, duration) => {
        setCurrentMessage(text)
        setTimeout(() => {
            setCurrentMessage(null)
        }, duration)
    }

    const addPerson = (event) => {
        event.preventDefault()
        const potentiallyExistingPerson = persons.find(person => person.name === newName)
        if (potentiallyExistingPerson && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

            const updatedPerson = {...potentiallyExistingPerson, number: newNumber}
            personService
                .updatePerson(updatedPerson)
                .then(response => setPersons(persons.map(person => person.id === updatedPerson.id ? response : person)))

            resetForm()
            handleErrorMessage(`Changed the number of ${updatedPerson.name}.`, 5000)
            return
        }

        const newPerson = {
            name: newName,
            number: newNumber
        }

        personService
            .addPerson(newPerson)
            .then(response => setPersons(persons.concat(response)))

        resetForm()
        handleErrorMessage(`Added ${newPerson.name} to phonebook.`, 5000)
    }
    
    const deletePerson = (person) => () => {

        if (window.confirm(`Delete ${person.name}?`)) {
            personService
                .deletePerson(person.id)
                .then(response => setPersons(persons.filter(personInList => personInList.id !== person.id)))
            handleErrorMessage(`Successfully deleted ${person.name}.`, 5000)
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={currentMessage} />
            <h3>Search</h3>
            <Search value={searchValue} onChange={handleSearchValue}/>

            <h3>Add Person</h3>
            <AddPersonForm
                onSubmit={addPerson}
                nameValue={newName} nameOnChange={handleNewName}
                numberValue={newNumber} numberOnChange={handleNewNumber}
            />

            <h2>Numbers</h2>
            <PhonebookEntries shownPersons={shownPersons} deletePerson={deletePerson}/>

        </div>
    )
};

export default App;