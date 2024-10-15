import React, { useState, useEffect, createRef } from 'react'
import { GLOBAL } from './Global'
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
  let pointer = createRef()
  const [clock, setClock] = useState(hour);
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = '5e7132d57dd1b1491c308810e615e7ca'
  const latitude = 53.55
  const longitude = 10

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

  useEffect(() => {
    pointer.current.style.transform = `rotate(${clock * 30}deg)`
  }, [clock])


  console.log(weatherData);

const forecastData = [
  { id: 0, days: day + 1, low: 13, high: 21 },
  { id: 1, days: day + 2, low: 13, high: 21 },
  { id: 2, days: day + 3, low: 13, high: 21 },
  { id: 3, days: day + 4, low: 13, high: 21 },
  { id: 4, days: day + 5, low: 13, high: 21 },
  { id: 5, days: day + 6, low: 13, high: 21 },
];

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
          <div className='clockBg' style={{ background: 'white' }}>
            <div className='smallTick tick Uhr12'></div>
            <div className='smallTick tick Uhr01'></div>
            <div className='smallTick tick Uhr02'></div>
            <div className='smallTick tick Uhr03'></div>
            <div className='smallTick tick Uhr04'></div>
            <div className='smallTick tick Uhr05'></div> 
            <div className='smallTick tick Uhr06'></div>
            <div className='smallTick tick Uhr07'></div>
            <div className='smallTick tick Uhr08'></div>
            <div className='smallTick tick Uhr09'></div>
            <div className='smallTick tick Uhr10'></div>
            <div className='smallTick tick Uhr11'></div>
          </div>
          <div className='clockPointer' ref={ pointer }></div>
          <div className='clockBg ' style={{ zIndex: 100 }}>
            <div className='bigTick tick Uhr12' onTouchMove={()=> setClock(0  )} onMouseOver={()=> setClock(0  )}></div>
            <div className='bigTick tick min01' onTouchMove={()=> setClock(0.2)} onMouseOver={()=> setClock(0.2)}></div>
            <div className='bigTick tick min02' onTouchMove={()=> setClock(0.4)} onMouseOver={()=> setClock(0.4)}></div>
            <div className='bigTick tick min03' onTouchMove={()=> setClock(0.6)} onMouseOver={()=> setClock(0.6)}></div>
            <div className='bigTick tick min04' onTouchMove={()=> setClock(0.8)} onMouseOver={()=> setClock(0.8)}></div>
            <div className='bigTick tick Uhr01' onTouchMove={()=> setClock(1  )} onMouseOver={()=> setClock(1  )}></div>
            <div className='bigTick tick min06' onTouchMove={()=> setClock(1.2)} onMouseOver={()=> setClock(1.2)}></div>
            <div className='bigTick tick min07' onTouchMove={()=> setClock(1.4)} onMouseOver={()=> setClock(1.4)}></div>
            <div className='bigTick tick min08' onTouchMove={()=> setClock(1.6)} onMouseOver={()=> setClock(1.6)}></div>
            <div className='bigTick tick min09' onTouchMove={()=> setClock(1.8)} onMouseOver={()=> setClock(1.8)}></div>
            <div className='bigTick tick Uhr02' onTouchMove={()=> setClock(2  )} onMouseOver={()=> setClock(2  )} ></div>
            <div className='bigTick tick min11' onTouchMove={()=> setClock(2.2)} onMouseOver={()=> setClock(2.2)}></div>
            <div className='bigTick tick min12' onTouchMove={()=> setClock(2.4)} onMouseOver={()=> setClock(2.4)}></div>
            <div className='bigTick tick min13' onTouchMove={()=> setClock(2.6)} onMouseOver={()=> setClock(2.6)}></div>
            <div className='bigTick tick min14' onTouchMove={()=> setClock(2.8)} onMouseOver={()=> setClock(2.8)}></div>
            <div className='bigTick tick Uhr03' onTouchMove={()=> setClock(3  )} onMouseOver={()=> setClock(3  )}></div>
            <div className='bigTick tick min16' onTouchMove={()=> setClock(3.2)} onMouseOver={()=> setClock(3.2)}></div>
            <div className='bigTick tick min17' onTouchMove={()=> setClock(3.4)} onMouseOver={()=> setClock(3.4)}></div>
            <div className='bigTick tick min18' onTouchMove={()=> setClock(3.6)} onMouseOver={()=> setClock(3.6)}></div>
            <div className='bigTick tick min19' onTouchMove={()=> setClock(3.8)} onMouseOver={()=> setClock(3.8)}></div>
            <div className='bigTick tick Uhr04' onTouchMove={()=> setClock(4  )} onMouseOver={()=> setClock(4  )}></div>
            <div className='bigTick tick min21' onTouchMove={()=> setClock(4.2)} onMouseOver={()=> setClock(4.2)}></div>
            <div className='bigTick tick min22' onTouchMove={()=> setClock(4.4)} onMouseOver={()=> setClock(4.4)}></div>
            <div className='bigTick tick min23' onTouchMove={()=> setClock(4.6)} onMouseOver={()=> setClock(4.6)}></div>
            <div className='bigTick tick min24' onTouchMove={()=> setClock(4.8)} onMouseOver={()=> setClock(4.8)}></div>
            <div className='bigTick tick Uhr05' onTouchMove={()=> setClock(5  )} onMouseOver={()=> setClock(5  )}></div> 
            <div className='bigTick tick min26' onTouchMove={()=> setClock(5.2)} onMouseOver={()=> setClock(5.2)}></div>
            <div className='bigTick tick min27' onTouchMove={()=> setClock(5.4)} onMouseOver={()=> setClock(5.4)}></div>
            <div className='bigTick tick min28' onTouchMove={()=> setClock(5.6)} onMouseOver={()=> setClock(5.6)}></div>
            <div className='bigTick tick min29' onTouchMove={()=> setClock(5.8)} onMouseOver={()=> setClock(5.8)}></div>
            <div className='bigTick tick Uhr06' onTouchMove={()=> setClock(6  )} onMouseOver={()=> setClock(6  )} ></div>
            <div className='bigTick tick min31' onTouchMove={()=> setClock(6.2)} onMouseOver={()=> setClock(6.2)}></div>
            <div className='bigTick tick min32' onTouchMove={()=> setClock(6.4)} onMouseOver={()=> setClock(6.4)}></div>
            <div className='bigTick tick min33' onTouchMove={()=> setClock(6.6)} onMouseOver={()=> setClock(6.6)}></div>
            <div className='bigTick tick min34' onTouchMove={()=> setClock(6.8)} onMouseOver={()=> setClock(6.8)}></div>
            <div className='bigTick tick Uhr07' onTouchMove={()=> setClock(7  )} onMouseOver={()=> setClock(7  )}></div>
            <div className='bigTick tick min36' onTouchMove={()=> setClock(7.2)} onMouseOver={()=> setClock(7.2)}></div>
            <div className='bigTick tick min37' onTouchMove={()=> setClock(7.4)} onMouseOver={()=> setClock(7.4)}></div>
            <div className='bigTick tick min38' onTouchMove={()=> setClock(7.6)} onMouseOver={()=> setClock(7.6)}></div>
            <div className='bigTick tick min39' onTouchMove={()=> setClock(7.8)} onMouseOver={()=> setClock(7.8)}></div>
            <div className='bigTick tick Uhr08' onTouchMove={()=> setClock(8  )} onMouseOver={()=> setClock(8  )}></div>
            <div className='bigTick tick min41' onTouchMove={()=> setClock(8.2)} onMouseOver={()=> setClock(8.2)}></div>
            <div className='bigTick tick min42' onTouchMove={()=> setClock(8.4)} onMouseOver={()=> setClock(8.4)}></div>
            <div className='bigTick tick min43' onTouchMove={()=> setClock(8.6)} onMouseOver={()=> setClock(8.6)}></div>
            <div className='bigTick tick min44' onTouchMove={()=> setClock(8.8)} onMouseOver={()=> setClock(8.8)}></div>
            <div className='bigTick tick Uhr09' onTouchMove={()=> setClock(9  )} onMouseOver={()=> setClock(9  )} ></div>
            <div className='bigTick tick min46' onTouchMove={()=> setClock(9.2)} onMouseOver={()=> setClock(9.2)}></div>
            <div className='bigTick tick min47' onTouchMove={()=> setClock(9.4)} onMouseOver={()=> setClock(9.4)}></div>
            <div className='bigTick tick min48' onTouchMove={()=> setClock(9.6)} onMouseOver={()=> setClock(9.6)}></div>
            <div className='bigTick tick min49' onTouchMove={()=> setClock(9.8)} onMouseOver={()=> setClock(9.8)}></div>
            <div className='bigTick tick Uhr10' onTouchMove={()=> setClock(10  )} onMouseOver={()=> setClock(10  )}></div>
            <div className='bigTick tick min51' onTouchMove={()=> setClock(10.2)} onMouseOver={()=> setClock(10.2)}></div>
            <div className='bigTick tick min52' onTouchMove={()=> setClock(10.4)} onMouseOver={()=> setClock(10.4)}></div>
            <div className='bigTick tick min53' onTouchMove={()=> setClock(10.6)} onMouseOver={()=> setClock(10.6)}></div>
            <div className='bigTick tick min54' onTouchMove={()=> setClock(10.8)} onMouseOver={()=> setClock(10.8)}></div>
            <div className='bigTick tick Uhr11' onTouchMove={()=> setClock(11  )} onMouseOver={()=> setClock(11  )}></div>
            <div className='bigTick tick min56' onTouchMove={()=> setClock(11.2)} onMouseOver={()=> setClock(11.2)}></div>
            <div className='bigTick tick min57' onTouchMove={()=> setClock(11.4)} onMouseOver={()=> setClock(11.4)}></div>
            <div className='bigTick tick min58' onTouchMove={()=> setClock(11.6)} onMouseOver={()=> setClock(11.6)}></div>
            <div className='bigTick tick min59' onTouchMove={()=> setClock(11.8)} onMouseOver={()=> setClock(11.8)}></div>
          </div>

          <div className='currentInfo'>
            <div className='current currentWeather'>           
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
          {forecastData.map( el => (
          <div key={el.id}>
            <div className='day'>{el.days > 6 ? GLOBAL.days[el.days - 7] : GLOBAL.days[el.days]}</div>
            <div className='weatherIcon'>
            <FontAwesomeIcon icon={faCloud} />
            </div>
            <span className='lowest'>{el.low}°</span>
            <span className='highest'>{el.id}°</span>
          </div>
          ))}          
        </div>
      )}
      </div>      
    </>
  )
}


