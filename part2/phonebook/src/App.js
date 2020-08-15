import React, {useState, useEffect} from 'react';
import axios from "axios"
import Search from "./components/Search";
import AddPersonForm from "./components/AddPersonForm";
import PhonebookEntries from "./components/PhonebookEntries";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [searchValue, setSearchValue] = useState("")

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

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.find(person => person.name === newName) != null) {
            alert(`${newName} is already added to phonebook`)
            resetForm()
            return
        }
        const newPerson = {
            name: newName,
            number: newNumber
        }
        setPersons(persons.concat(newPerson))
        resetForm()
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <h3>Search</h3>
            <Search value={searchValue} onChange={handleSearchValue}/>

            <h3>Add Person</h3>
            <AddPersonForm
                onSubmit={addPerson}
                nameValue={newName} nameOnChange={handleNewName}
                numberValue={newNumber} numberOnChange={handleNewNumber}
            />

            <h2>Numbers</h2>
            <PhonebookEntries shownPersons={shownPersons}/>

        </div>
    )
};

export default App;