import React from 'react';

const Search = ({description, value, onChange}) => {
    return (
        <div>
            {description}
            <input value={value} onChange={onChange}/>
        </div>
    );
};

export default Search;