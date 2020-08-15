import React from 'react';
import SingleCountry from "./SingleCountry";

const Countries = ({countries}) => {

    if (countries.length > 10) return <div>Too many matches. Specify a filter.</div>

    if (countries.length === 1) return <SingleCountry country={countries[0]}/>

    return (
        <div>
            {countries.map(country => <li key={country.alpha3Code}>{country.name}</li>)}
        </div>
    );
};

export default Countries;