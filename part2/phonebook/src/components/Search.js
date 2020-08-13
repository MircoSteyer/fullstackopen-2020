import React from 'react';

const Search = ({value, onChange}) => {
    return (
        <div>
            Search Phonebook: <input value={value} onChange={onChange} />
        </div>
    );
};

export default Search;