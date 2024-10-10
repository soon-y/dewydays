import React, { useState, useEffect } from 'react'
import { GLOBAL } from './Global'
import { animated, useSpring } from '@react-spring/web'
import Sun from './Sun'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark,faCloud, faSun,faCloudBolt,faSnowflake,faCloudShowersHeavy,faCloudSun, } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'



export default function Weather(){ 
  const head = "Weather"
  const d = new Date()
  let month = d.getMonth()
  let date = d.getDate()
  let day = d.getDay()
  let hour = d.getHours();
  const [clock, setClock] = useState(hour);
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = '5e7132d57dd1b1491c308810e615e7ca'
  const latitude = 53.55
  const longitude = 10

  const rotatePoint = useSpring({
    transform: clock > 6 ? `rotate(${clock * 30}deg)` : `rotate(${clock * 30}deg)`
  })

  useEffect(() => {
    // Setting the fetch options
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    // Fetching weather data
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`, options)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
      })
      .catch(err => {
        setError(err);
        console.error(err);
      })
  }, [])


  console.log(weatherData);


let forecastData = [
  [day+1, 0],
  [day+2, 0],
  [day+3, 0],
  [day+4, 0],
  [day+5, 0],
  [day+6, 0],
]


console.log(forecastData[1][0] > 6 ? GLOBAL.days[forecastData[1][0] - 6] : GLOBAL.days[forecastData[1][0]])

  return(
    <>
    <div className='bg gradient'></div>
      <h1 className='head'>{head}</h1>
      
      <Link to='/'>
      <div className='bubble navPos close'>
        <FontAwesomeIcon icon={faXmark} className='navIcon' />
      </div>
      </Link>

      <div className='content'>
        <div className="center info" style={{
          color:'white',
          margin: '0 0 1rem 0',
        }}>
        <p>{GLOBAL.days[day]} {date} {GLOBAL.months[month]} </p>
        <p>HAMBURG</p>
        </div>

        <div className='clock'>
        <div className='clockBg'>
          <div onMouseUp={() => setClock(0)} onClick={() => setClock(0)} className='tick bigTick Uhr12'></div>
          <div onMouseUp={()=> setClock(1)}  onClick={()=> setClock(1)} className='tick smallTick Uhr01'></div>
          <div onMouseUp={()=> setClock(2)}  onClick={()=> setClock(2)} className='tick smallTick Uhr02'></div>
          <div onMouseUp={()=> setClock(3)}  onClick={()=> setClock(3)} className='tick bigTick Uhr03'></div>
          <div onMouseUp={()=> setClock(4)}  onClick={()=> setClock(4)} className='tick smallTick Uhr04'></div>
          <div onMouseUp={()=> setClock(5)}  onClick={()=> setClock(5)} className='tick smallTick Uhr05'></div> 
          <div onMouseUp={()=> setClock(6)}  onClick={()=> setClock(6)} className='tick bigTick Uhr06'></div>
          <div onMouseUp={()=> setClock(7)}  onClick={()=> setClock(7)} className='tick smallTick Uhr07'></div>
          <div onMouseUp={()=> setClock(8)}  onClick={()=> setClock(8)} className='tick smallTick Uhr08'></div>
          <div onMouseUp={()=> setClock(9)}  onClick={()=> setClock(9)} className='tick bigTick Uhr09'></div>
          <div onMouseUp={()=> setClock(10)} onClick={()=> setClock(10)} className='tick smallTick Uhr10'></div>
          <div onMouseUp={()=> setClock(11)} onClick={()=> setClock(11)} className='tick smallTick Uhr11'></div>
        </div>
          <animated.img className='pointer' src='/weather/pointer.png' style={rotatePoint}/>
          <div className='currentInfo'>
            <div className='current currentWeather'>
              <Sun />
            </div>
            {weatherData&&(
            <div className='current currentTemp center'>{Math.trunc(weatherData.main.temp)}°</div>
            )}
          </div>
        </div>

        <table className='weatherInfo'>
          <tbody>
          <tr>
            <th>Change of Rain</th>
            <td>0%</td>
          </tr>
          <tr>
            <th>Humitidy</th>
            <td>35%</td>
          </tr>
          <tr>
            <th>PM 10</th>
            <td>81</td>
          </tr>
          <tr>
            <th>UV Index</th>
            <td>0</td>
          </tr>
          </tbody>
        </table>

        {weatherData&&(
        <div className='weeklyWeather center'>
          {forecastData.map(() => (
          <div key={forecastData.id} >
            <div key={forecastData.id} className='day'>{forecastData[1][0] > 6 ? GLOBAL.days[forecastData[1][0] - 6] : GLOBAL.days[forecastData[1][0]]}</div>
            <div key={forecastData.id} className='weatherIcon'>
            <FontAwesomeIcon icon={faCloud} />
            </div>
            <span key={forecastData.id} className='lowest'>11°</span>
            <span key={forecastData.id} className='highest'>18°</span>
          </div>
          ))}          
        </div>
      )}
      </div>
    </>
  )
}


