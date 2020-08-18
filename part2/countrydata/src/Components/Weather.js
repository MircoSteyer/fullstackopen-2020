import React, {useEffect, useState} from 'react';
import axios from "axios"

const Weather = ({capital}) => {
    const [currentWeather, setCurrentWeather] = useState(null)
    const api_key = process.env.REACT_APP_API_KEY
    console.log(currentWeather)

    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
            .then(response => setCurrentWeather(response.data))
    },[])

    if (currentWeather === null) return <div></div>

    return (
        <div>
            <h3>Observation time: {currentWeather.current.observation_time}</h3>
            <p>Temperature: {currentWeather.current.temperature}</p>
            <img src={currentWeather.current.weather_icons[0]} alt="test"/>
            <p>Wind: {currentWeather.current.wind_speed} mph - direction {currentWeather.current.wind_dir}</p>
        </div>
    );
};

export default Weather;