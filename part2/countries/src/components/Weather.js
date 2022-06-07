import {useState, useEffect} from 'react'
import axios from 'axios';

const Weather = ({capital}) => {
    const [temperature, setTemperature] = useState(0);
    const [windSpeed, setWindSpeed] = useState(0);
    const [icon, setIcon] = useState('');

    const openWeatherApiKey = process.env.REACT_APP_API_KEY;
    useEffect(() => {
        axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${openWeatherApiKey}&units=metric`)
        .then(response => {
            setTemperature(response.data.main.temp);
            setWindSpeed(response.data.wind.speed);
            setIcon(response.data.weather[0].icon);
        })
    }, []);
    return (
      <>
        <h2>Weather in {capital}</h2>
        <p>temperature {temperature} Celsius</p>
        <img src={icon != ''? `https://openweathermap.org/img/wn/${icon}@2x.png` : ''} />
        <p>wind {windSpeed} m/s</p>
      </>
    )
  }
  export default Weather;