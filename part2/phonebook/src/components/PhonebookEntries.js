import React from 'react';

const PhonebookEntries = ({shownPersons}) => {
    return (
        <div>
            {shownPersons.map(person => (<li key={person.name}>{person.name}: {person.number}</li>))}
        </div>
    );
};

export default PhonebookEntries;