import React from 'react';

const PhonebookEntries = ({shownPersons, deletePerson}) => {

    return (
        <div>
            {shownPersons.map(person => (
                <div key={person.id}>
                    <li>{person.name}: {person.number}</li>
                    <button onClick={deletePerson(person)}>Delete</button>
                </div>
            ))}

        </div>
    );
};

export default PhonebookEntries;