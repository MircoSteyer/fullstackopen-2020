import React from 'react';
import Weather from "./Weather";

const SingleCountry = ({country}) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h2>Languages</h2>
            <ul>
                {country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt={"Flag of " + country.name} width={200} height={120}/>
            <Weather capital={country.capital}/>
        </div>
    );
};

export default SingleCountry;