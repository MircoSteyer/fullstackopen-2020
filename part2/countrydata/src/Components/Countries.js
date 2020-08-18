import React, {useState} from 'react';
import SingleCountry from "./SingleCountry";

const Countries = ({countries}) => {

    const [selectedCountry, setSelectedCountry] = useState(countries[0])

    const handleOnClick = (country) => () => {
        setSelectedCountry(country)
    }

    if (selectedCountry) return <SingleCountry country={selectedCountry}/>

    if (countries.length > 10) return <div>Too many matches. Specify a filter.</div>

    if (countries.length === 1) return <SingleCountry country={countries[0]}/>

    return (
        <div>
            {countries.map(country =>
                <li key={country.alpha3Code}>
                    {country.name}
                    <button onClick={handleOnClick(country)}>Show</button>
                </li>)}
        </div>
    );
};

export default Countries;