import React, {useState, useEffect} from 'react'
import axios from "axios"
import Countries from "./Components/Countries";
import Search from "./Components/Search";

const App = () => {
    const [countries, setCountries] = useState([])
    const [searchValue, setSearchValue] = useState("")

    let shownCountries = [...countries]
    if (searchValue) shownCountries = shownCountries.filter(country => country.name.toLowerCase().includes(searchValue.toLowerCase()))

    useEffect(() => {
        axios
            .get("https://restcountries.eu/rest/v2/all")
            .then((response) => {
                setCountries(response.data)
            })
            .catch(() => {
                console.log("Couldn't access https://restcountries.eu/rest/v2/all")
            })
    }, [])

    const handleSearchValue = (event) => {
        setSearchValue(event.target.value)
    }


    return (
        <div>
            <Search description={"Find countries by name: "} value={searchValue} onChange={handleSearchValue}/>
            <Countries countries={shownCountries}/>
        </div>
    )

};

export default App
