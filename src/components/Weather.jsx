import React, { useState, useEffect, useRef } from 'react'
import './Weather.css'

import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import wind_icon from '../assets/wind.png';
import snow_icon from '../assets/snow.png';
import rain_icon from '../assets/rain.png';

const Weather = () => {
    const inputRef = useRef();
    const [WeatherData, setWeatherData]=useState(false)
    const allIcons={
        "o1d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": cloud_icon,
        "04n": cloud_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "11d": drizzle_icon,
        "11n": drizzle_icon,
        "13d": snow_icon,
        "13n": snow_icon,
        "50d": humidity_icon,
        "50n": humidity_icon,
    }

    const search = async (city) => {
        try {
            if(city === ""){
                alert("Enter a City Name");
                return;
            }
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${'7cb26b9fb6064302746457d546414263'}`;
            
            const response = await fetch(url);
            const data = await response.json();
            console.log(url);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windspeed: data.wind.speed,
                temparature: Math.floor(data.main.temp),
                city: data.name,
                country: data.sys.country,
                description: data.weather[0].description,
                icon: icon,
            })
        } catch (error) {
            
        }
    }
    
    useEffect(() => {
        search("Dhaka");
    }, [])

  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search...'/>
            <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)}/>
        </div>
            <img src={WeatherData.icon} alt="" className='weather-icon'/>
           <div className='weather-details'>
            
            <p>{WeatherData.temparature}°c</p>
            <p>{WeatherData.city}</p>
           </div>
           <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                    <p>{WeatherData.humidity}%</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                    <p>{WeatherData.windspeed} km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
           </div>
    </div>
  )
}

export default Weather