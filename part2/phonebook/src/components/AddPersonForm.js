import React from 'react';

const AddPersonForm = ({onSubmit, nameValue, nameOnChange, numberValue, numberOnChange}) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                name: <input value={nameValue} onChange={nameOnChange} />
                number: <input value={numberValue} onChange={numberOnChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};

export default AddPersonForm;