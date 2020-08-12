import React, {useState} from 'react';

const App = () => {
    const [persons, setPersons] = useState([{name: "Arto Hellas"}])
    const [newName, setNewName] = useState("")

    const handleNewName = (event) => {
        setNewName(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        const newPerson = {
            name: newName
        }
        setPersons(persons.concat(newPerson))
        setNewName("")
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNewName} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(person => (<li key={person.name}>{person.name}</li>))}
            <div>
                Debug newName: {newName}
            </div>
        </div>
    )
};

export default App;