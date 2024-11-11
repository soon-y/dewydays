import React, { useState, useEffect, useRef, Suspense } from 'react'
import { GLOBAL } from '../Global'
import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark,faCloudShowersHeavy,faCloudSun,faSmog,faCloud,faSun,faCloudBolt,faSnowflake,faCloudRain, } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Sun from '../component_weather/Sun'
import Cloud from '../component_weather/Cloud'
import Rain from '../component_weather/Rain'
import Snow from '../component_weather/Snow'
import Drizzle from '../component_weather/Drizzle'
import Thunder from '../component_weather/Thunder'
import Smog from '../component_weather/Smog'
import Tornado from '../component_weather/Tornado'
import SunCloud from '../component_weather/SunCloud'

export default function Weather(){ 
  const head = "Weather"
  const d = new Date()
  let month = d.getMonth()
  let date = d.getDate()
  let day = d.getDay()
  let hour = d.getHours()
  let pointer = useRef()
  const [clock, setClock] = useState(hour)
  const [dailyData, setDailyData] = useState(null)
  const [hourlyData, setHourlyData] = useState(null)
  const [forecastDataFiltered, setforecastDataFiltered] = useState(null)
  const [airData, setAirData] = useState(null)
  const [index, setIndex] = useState(hour)

  useEffect(() => {
    getWeatherData(GLOBAL.latitude, GLOBAL.longitude, GLOBAL.timezone)
  },[])

  useEffect(() => {
    pointer.current.style.transform = `rotate(${clock * 30}deg)`

    let uhr = hour >= 12? hour - 12 : hour
    let clk = clock >= 12? clock - 12 : clock

    if(hourlyData){
      if(hour >= 12){
        setIndex(Math.floor(clock+12))
        if(clk < uhr){
          setIndex(Math.floor(clock+24))
        }
      } else {
        setIndex(Math.floor(clock))
        if(clk >= 0 && clk < uhr){
          setIndex(Math.floor(clock+12))
        }
      }
    }
  }, [clock])

  const getWeatherData = (lat,lon,time) => {
    // Setting the fetch options
    const options = { method: 'GET', headers: { accept: 'application/json' } }

    // Fetching current air pollution data
    fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=european_aqi_pm2_5,european_aqi_pm10&timezone=${time}`, options)
    .then(response => response.json())
    .then(data => {
      setAirData(data.hourly)
    })
    .catch(err => {
      console.error(err)
    })

    // Fetching hourly data
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=apparent_temperature,precipitation_probability,weather_code,uv_index,is_day&forecast_days=3&timezone=${time}`, options)
    .then(response => response.json())
    .then(data => {
      setHourlyData(data.hourly)
    })
    .catch(err => {
      console.error(err)
    })

    // Fetching daily data
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,apparent_temperature_max,apparent_temperature_min&timezone=${time}`, options)
    .then(response => response.json())
    .then(data => {
      setDailyData(data)
      filterData(data.daily)
    })
    .catch(err => {
      console.error(err)
    })
  }

  const filterData = (data) => {
    let forecastDataFiltered = []

    for (let i = 1; i <= 6; i++) {
      let icon = data.weather_code[i]
      let high = Math.round(data.apparent_temperature_max[i])
      let low = Math.round(data.apparent_temperature_min[i])
      switch(icon) {
        case 0:
          icon = faSun
          break
        case 1:
          icon = faSun
          break
        case 2:
          icon = faCloudSun
          break
        case 3:
          icon = faCloud
          break
        case 45:
          icon = faSmog
          break
        case 48:
          icon = faSmog
          break
        case 51: 
          icon = faCloudRain   
          break
        case 53: 
          icon = faCloudRain   
          break   
        case 55: 
          icon = faCloudRain   
          break
        case 56: 
          icon = faCloudRain   
          break
        case 57: 
          icon = faCloudRain   
          break
        case 61: 
          icon = faCloudRain   
          break
        case 63: 
          icon = faCloudRain   
          break   
        case 65: 
          icon = faCloudRain   
          break
        case 66: 
          icon = faCloudRain   
          break
        case 67: 
          icon = faCloudRain  
          break
        case 71: 
          icon = faSnowflake   
          break
        case 73: 
          icon = faSnowflake   
          break   
        case 75: 
          icon = faSnowflake   
          break
        case 77: 
          icon = faSnowflake  
          break      
        case 80: 
          icon = faCloudShowersHeavy   
          break
        case 81: 
          icon = faCloudShowersHeavy   
          break   
        case 82: 
          icon = faCloudShowersHeavy   
          break
        case 85: 
          icon = faSnowflake   
          break
        case 86: 
          icon = faSnowflake  
          break
        case 95: 
          icon = faCloudBolt   
          break   
        case 96: 
          icon = faCloudBolt   
          break
        case 99: 
          icon = faCloudBolt   
          break
      }  
      let d = { "id" : i, "days" : day + i, "low": low, "high": high, "icon": icon }
      forecastDataFiltered.push(d)
    }
    setforecastDataFiltered(forecastDataFiltered)
  }

  const uvIndex = (data) => {
    let state
    if (data < 3) {
      state = "Low"
    } else if (data >= 3 && data < 6){
      state = "Moderate"
    } else if (data >= 6 && data < 8){
      state = "High"
    } else if (data >= 8 && data < 11){
      state = "Very High"
    } else {
      state = "Extreme"
    }
    return (
      <>
        <span>
          {data}
        </span>
        <span style={{ 
          marginLeft: '0.5rem',
          fontWeight: 700,
          color: data >= 6? '#d61a17' : 'white',
          }}>{state}
        </span>
      </>
    )
  }

  const airQuality10 = (data) => {
    let state
    if (data < 20) {
      state = "Good"
    } else if (data >= 20 && data < 40){
      state = "Fair"
    } else if (data >= 40 && data < 50){
      state = "Moderate"
    } else if (data >= 50 && data < 100){
      state = "Poor"
    } else if (data >= 100 && data < 150){
      state = "Very Poor"
    } else {
      state = "Extremely Poor"
    }
    return (
      <>
        <span>
          {data<10? '0'+ data : data}
        </span>
        <span style={{ 
          marginLeft: '0.5rem',
          fontWeight: 700,
          color: data >= 50? '#d61a17' : 'white',
          }}>{state}
        </span>
      </>
    )
  }

  const airQuality25 = (data) => {
    let state
    if (data < 10) {
      state = "Good"
    } else if (data >= 10 && data < 20){
      state = "Fair"
    } else if (data >= 20 && data < 25){
      state = "Moderate"
    } else if (data >= 25 && data < 50){
      state = "Poor"
    } else if (data >= 50 && data < 75){
      state = "Very Poor"
    } else {
      state = "Extremely Poor"
    }
    return (
    <>
      <span>
        {data<10? '0'+ data : data}
      </span>
      <span style={{ 
        marginLeft: '0.5rem',
        fontWeight: 700,
        color: data >= 25? '#d61a17' : 'white',
        }}>{state}
      </span>
    </>
    )
  }

  const AMPM = () => {
    let uhr = hour >= 12? hour - 12 : hour
    let clk = Math.floor(clock) === 0 ? 12 : Math.floor(clock)

    if (hour == 0) {
      return `${clk} AM`
    } else if (hour == 12){
      return `${clk} PM`
    } else if (hour < 12 && clock >= uhr){
      return `${clk} AM`
    } else if (hour < 12 && clock < uhr){
      return `${clk} PM`
    } else if (hour >= 12 && clock < uhr){
      return `${clk} AM`
    } else if (hour >= 12 && clock >= uhr){
      return `${clk} PM`
    } 
  }

  const currentIcon = (data) => {
    const daytime = data.is_day[index]
    switch(data.weather_code[index]) {
      case 0:
        return (<Sun daytime = { daytime } />)
      case 1:
        return (<Sun daytime = { daytime } />)
      case 2:
        return (<SunCloud daytime = { daytime } />)
      case 3:
        return (<Cloud daytime = { daytime }/>)
      case 45:
        return (<Smog daytime = { daytime }/>)
      case 48:
        return (<Smog daytime = { daytime }/>)
      case 51: 
        return (<Drizzle daytime = { daytime }/>)
      case 53: 
        return (<Drizzle daytime = { daytime }/>)
      case 55: 
        return (<Drizzle daytime = { daytime }/>)
      case 56: 
        return (<Drizzle daytime = { daytime }/>)
      case 57: 
        return (<Drizzle daytime = { daytime }/>)
      case 61: 
        return (<Rain daytime = { daytime }/>)
      case 63: 
        return (<Rain daytime = { daytime }/>)
      case 65: 
        return (<Rain daytime = { daytime }/>)
      case 66: 
        return (<Rain daytime = { daytime }/>)
      case 67: 
        return (<Rain daytime = { daytime }/>)
      case 71: 
        return (<Snow daytime = { daytime }/>)
      case 73: 
        return (<Snow daytime = { daytime }/>)
      case 75: 
        return (<Snow daytime = { daytime }/>)
      case 77: 
        return (<Snow daytime = { daytime }/>)   
      case 80: 
        return (<Rain daytime = { daytime }/>)
      case 81: 
        return (<Rain daytime = { daytime }/>)  
      case 82: 
        return (<Rain daytime = { daytime }/>)
      case 85: 
        return (<Snow daytime = { daytime }/>)
      case 86: 
        return (<Snow daytime = { daytime }/>)
      case 95: 
        return (<Thunder daytime = { daytime }/>)  
      case 96: 
        return (<Thunder daytime = { daytime }/>)
      case 99: 
        return (<Thunder daytime = { daytime }/>)
    } 
  }

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
          margin: '0 0 0.5rem 0',
        }}>
        <p>{ GLOBAL.days[day] } { date } { GLOBAL.months[month] } </p>
        <p style={{ textTransform: 'uppercase' }}>{ GLOBAL.suburb } </p>
        </div>

        <div className='clock' style={{ 
            backgroundImage: 'url(/weather/clock.png)',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundSize: 'contain',
          }}>
          <div className='clockBg'>
            {hourlyData&&(
            <div className='currentInfo'>
              <div className='current currentTime center'>{ AMPM() }</div>
              <div className='current currentWeather'>{ currentIcon(hourlyData) }</div>
              <div className='current currentTemp center'>{ hourlyData.apparent_temperature[index] }°</div>
            </div>)}
          </div>
          <div className='clockPointer' ref={ pointer }></div>
          <div className='clockBg ' style={{ zIndex: 100 }}>
            <div className='bigTick tick Uhr12' onTouchStart={()=> setClock(0  )} onMouseOver={()=> setClock(0  )}></div>
            <div className='smallTick tick min01' onTouchStart={()=> setClock(0.2)} onMouseOver={()=> setClock(0.2)}></div>
            <div className='smallTick tick min02' onTouchStart={()=> setClock(0.4)} onMouseOver={()=> setClock(0.4)}></div>
            <div className='smallTick tick min03' onTouchStart={()=> setClock(0.6)} onMouseOver={()=> setClock(0.6)}></div>
            <div className='smallTick tick min04' onTouchStart={()=> setClock(0.8)} onMouseOver={()=> setClock(0.8)}></div>
            <div className='bigTick tick Uhr01' onTouchStart={()=> setClock(1  )} onMouseOver={()=> setClock(1  )}></div>
            <div className='smallTick tick min06' onTouchStart={()=> setClock(1.2)} onMouseOver={()=> setClock(1.2)}></div>
            <div className='smallTick tick min07' onTouchStart={()=> setClock(1.4)} onMouseOver={()=> setClock(1.4)}></div>
            <div className='smallTick tick min08' onTouchStart={()=> setClock(1.6)} onMouseOver={()=> setClock(1.6)}></div>
            <div className='smallTick tick min09' onTouchStart={()=> setClock(1.8)} onMouseOver={()=> setClock(1.8)}></div>
            <div className='bigTick tick Uhr02' onTouchStart={()=> setClock(2  )} onMouseOver={()=> setClock(2  )} ></div>
            <div className='smallTick tick min11' onTouchStart={()=> setClock(2.2)} onMouseOver={()=> setClock(2.2)}></div>
            <div className='smallTick tick min12' onTouchStart={()=> setClock(2.4)} onMouseOver={()=> setClock(2.4)}></div>
            <div className='smallTick tick min13' onTouchStart={()=> setClock(2.6)} onMouseOver={()=> setClock(2.6)}></div>
            <div className='smallTick tick min14' onTouchStart={()=> setClock(2.8)} onMouseOver={()=> setClock(2.8)}></div>
            <div className='bigTick tick Uhr03' onTouchStart={()=> setClock(3  )} onMouseOver={()=> setClock(3  )}></div>
            <div className='smallTick tick min16' onTouchStart={()=> setClock(3.2)} onMouseOver={()=> setClock(3.2)}></div>
            <div className='smallTick tick min17' onTouchStart={()=> setClock(3.4)} onMouseOver={()=> setClock(3.4)}></div>
            <div className='smallTick tick min18' onTouchStart={()=> setClock(3.6)} onMouseOver={()=> setClock(3.6)}></div>
            <div className='smallTick tick min19' onTouchStart={()=> setClock(3.8)} onMouseOver={()=> setClock(3.8)}></div>
            <div className='bigTick tick Uhr04' onTouchStart={()=> setClock(4  )} onMouseOver={()=> setClock(4  )}></div>
            <div className='smallTick tick min21' onTouchStart={()=> setClock(4.2)} onMouseOver={()=> setClock(4.2)}></div>
            <div className='smallTick tick min22' onTouchStart={()=> setClock(4.4)} onMouseOver={()=> setClock(4.4)}></div>
            <div className='smallTick tick min23' onTouchStart={()=> setClock(4.6)} onMouseOver={()=> setClock(4.6)}></div>
            <div className='smallTick tick min24' onTouchStart={()=> setClock(4.8)} onMouseOver={()=> setClock(4.8)}></div>
            <div className='bigTick tick Uhr05' onTouchStart={()=> setClock(5  )} onMouseOver={()=> setClock(5  )}></div> 
            <div className='smallTick tick min26' onTouchStart={()=> setClock(5.2)} onMouseOver={()=> setClock(5.2)}></div>
            <div className='smallTick tick min27' onTouchStart={()=> setClock(5.4)} onMouseOver={()=> setClock(5.4)}></div>
            <div className='smallTick tick min28' onTouchStart={()=> setClock(5.6)} onMouseOver={()=> setClock(5.6)}></div>
            <div className='smallTick tick min29' onTouchStart={()=> setClock(5.8)} onMouseOver={()=> setClock(5.8)}></div>
            <div className='bigTick tick Uhr06' onTouchStart={()=> setClock(6  )} onMouseOver={()=> setClock(6  )} ></div>
            <div className='smallTick tick min31' onTouchStart={()=> setClock(6.2)} onMouseOver={()=> setClock(6.2)}></div>
            <div className='smallTick tick min32' onTouchStart={()=> setClock(6.4)} onMouseOver={()=> setClock(6.4)}></div>
            <div className='smallTick tick min33' onTouchStart={()=> setClock(6.6)} onMouseOver={()=> setClock(6.6)}></div>
            <div className='smallTick tick min34' onTouchStart={()=> setClock(6.8)} onMouseOver={()=> setClock(6.8)}></div>
            <div className='bigTick tick Uhr07' onTouchStart={()=> setClock(7  )} onMouseOver={()=> setClock(7  )}></div>
            <div className='smallTick tick min36' onTouchStart={()=> setClock(7.2)} onMouseOver={()=> setClock(7.2)}></div>
            <div className='smallTick tick min37' onTouchStart={()=> setClock(7.4)} onMouseOver={()=> setClock(7.4)}></div>
            <div className='smallTick tick min38' onTouchStart={()=> setClock(7.6)} onMouseOver={()=> setClock(7.6)}></div>
            <div className='smallTick tick min39' onTouchStart={()=> setClock(7.8)} onMouseOver={()=> setClock(7.8)}></div>
            <div className='bigTick tick Uhr08' onTouchStart={()=> setClock(8  )} onMouseOver={()=> setClock(8  )}></div>
            <div className='smallTick tick min41' onTouchStart={()=> setClock(8.2)} onMouseOver={()=> setClock(8.2)}></div>
            <div className='smallTick tick min42' onTouchStart={()=> setClock(8.4)} onMouseOver={()=> setClock(8.4)}></div>
            <div className='smallTick tick min43' onTouchStart={()=> setClock(8.6)} onMouseOver={()=> setClock(8.6)}></div>
            <div className='smallTick tick min44' onTouchStart={()=> setClock(8.8)} onMouseOver={()=> setClock(8.8)}></div>
            <div className='bigTick tick Uhr09' onTouchStart={()=> setClock(9  )} onMouseOver={()=> setClock(9  )} ></div>
            <div className='smallTick tick min46' onTouchStart={()=> setClock(9.2)} onMouseOver={()=> setClock(9.2)}></div>
            <div className='smallTick tick min47' onTouchStart={()=> setClock(9.4)} onMouseOver={()=> setClock(9.4)}></div>
            <div className='smallTick tick min48' onTouchStart={()=> setClock(9.6)} onMouseOver={()=> setClock(9.6)}></div>
            <div className='smallTick tick min49' onTouchStart={()=> setClock(9.8)} onMouseOver={()=> setClock(9.8)}></div>
            <div className='bigTick tick Uhr10' onTouchStart={()=> setClock(10  )} onMouseOver={()=> setClock(10  )}></div>
            <div className='smallTick tick min51' onTouchStart={()=> setClock(10.2)} onMouseOver={()=> setClock(10.2)}></div>
            <div className='smallTick tick min52' onTouchStart={()=> setClock(10.4)} onMouseOver={()=> setClock(10.4)}></div>
            <div className='smallTick tick min53' onTouchStart={()=> setClock(10.6)} onMouseOver={()=> setClock(10.6)}></div>
            <div className='smallTick tick min54' onTouchStart={()=> setClock(10.8)} onMouseOver={()=> setClock(10.8)}></div>
            <div className='bigTick tick Uhr11' onTouchStart={()=> setClock(11  )} onMouseOver={()=> setClock(11  )}></div>
            <div className='smallTick tick min56' onTouchStart={()=> setClock(11.2)} onMouseOver={()=> setClock(11.2)}></div>
            <div className='smallTick tick min57' onTouchStart={()=> setClock(11.4)} onMouseOver={()=> setClock(11.4)}></div>
            <div className='smallTick tick min58' onTouchStart={()=> setClock(11.6)} onMouseOver={()=> setClock(11.6)}></div>
            <div className='smallTick tick min59' onTouchStart={()=> setClock(11.8)} onMouseOver={()=> setClock(11.8)}></div>
          </div>
        </div>

        {airData&&hourlyData&&(
        <table className='weatherInfo'>
          <tbody>
          <tr>
            <th>UV Index</th> 
            <td>{ uvIndex(hourlyData.uv_index[index]) }</td>
          </tr>
          <tr>
            <th>Chance of Rain</th>
            <td>{ hourlyData.precipitation_probability[index] }%</td>
          </tr>
          <tr>
            <th>PM 10</th>
            <td>{airQuality10(Math.round(airData.european_aqi_pm10[index]))}</td>
          </tr>
          <tr>
            <th>PM2.5</th>
            <td>{airQuality25(Math.round(airData.european_aqi_pm2_5[index]))}</td>
          </tr>
          </tbody>
        </table>)}

        {forecastDataFiltered&&(
        <div className='weeklyWeather center'>
          {forecastDataFiltered.map( el => (
          <div key={el.id}>
            <div className='day'>{ el.days > 6 ? GLOBAL.days[el.days - 7] : GLOBAL.days[el.days] }</div>
            <div className='weatherIcon'>
            <FontAwesomeIcon icon={ el.icon } />
            </div>
            <span className='lowest'>{ el.low }°</span>
            <span className='highest'>{ el.high }°</span>
          </div>
          ))}          
        </div>
      )}
      </div>      
    </>
  )
}


