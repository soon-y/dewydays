import React, { useState, useEffect, useRef } from 'react'
import { GLOBAL } from '../Global'
import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark,faSmog,faTornado,faCloud,faSun,faCloudBolt,faSnowflake,faCloudShowersHeavy,faCloudRain, } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Sun from '../component_weather/Sun'
import Cloud from '../component_weather/Cloud'
import Rain from '../component_weather/Rain'
import Snow from '../component_weather/Snow'
import Drizzle from '../component_weather/Drizzle'
import Thunder from '../component_weather/Thunder'
import Smog from '../component_weather/Smog'
import Tornado from '../component_weather/Tornado'

export default function Weather(){ 
  const head = "Weather"
  const d = new Date()
  let month = d.getMonth()
  let date = d.getDate()
  let day = d.getDay()
  let hour = d.getHours()
  let pointer = useRef()
  const [clock, setClock] = useState(hour)
  const [currentData, setcurrentData] = useState(null)
  const [forecastData, setforecastData] = useState(null)
  const [forecastDataFiltered, setforecastDataFiltered] = useState(null)
  const [airData, setairData] = useState(null)

  useEffect(() => {
    getWeatherData(GLOBAL.latitude, GLOBAL.longitude)
  },[])

  useEffect(() => {
    pointer.current.style.transform = `rotate(${clock * 30}deg)`
  }, [clock])

  const getWeatherData = (lat,lon) => {
    // Setting the fetch options
    const options = { method: 'GET', headers: { accept: 'application/json' } }

    // Fetching current weather data
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${GLOBAL.API_KEY}&units=metric`, options)
    .then(response => response.json())
    .then(data => {
      setcurrentData(data)
    })
    .catch(err => {
      setError(err)
      console.error(err)
    })

    // Fetching 5 day / 3 hour forecast data
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${GLOBAL.API_KEY}&units=metric`, options)
    .then(response => response.json())
    .then(data => {
      filterData(data)
      setforecastData(data)
      console.log(data)
    })
    .catch(err => {
      setError(err)
      console.error(err)
    })

    // Fetching current air pollution data
    fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${GLOBAL.API_KEY}&units=metric`, options)
    .then(response => response.json())
    .then(data => {
      setairData(data)
    })
    .catch(err => {
      setError(err)
      console.error(err)
    })
  }

  const filterData = (data) => {
    let forecastDataFiltered = []
    let num = 0
    for (let i = 0; i < data.cnt/8; i++) {
      let array = []
      let icon
        for (let j = 0; j < data.cnt/5; j++) {
        array.push(data.list[num].main.temp)
        icon = data.list[num].weather[0].main
        num++
        }
      let high = Math.trunc(Math.max(...array))
      let low = Math.trunc(Math.min(...array))
      switch(icon) {
        case "Clouds":
          icon = faCloud
          break
        case "Thunderstorm":
           icon = faCloudBolt
           break
        case "Drizzle":
          icon = faCloudRain
          break
        case "Rain":
          icon = faCloudShowersHeavy
          break
        case "Snow":
          icon = faSnowflake
          break
        case "Clear":
          icon = faSun
          break
        case "Mist":
          icon = faSmog
          break
        case "Smoke":
            icon = faSmog
            break
        case "Haze":
          icon = faSmog
          break
        case "Dust":
          icon = faSmog
          break
        case "Fog":
          icon = faSmog
          break
        case "Sand":
          icon = faSmog
          break
        case "Ash":
          icon = faSmog
          break
        case "Squall":
          icon = faCloudShowersHeavy
          break
        case "Tornado":
          icon = faTornado
          break
      }  
      let d = { "id" : i, "days" : day + i + 1, "low": low, "high": high, "icon": icon }
      forecastDataFiltered.push(d)
      // 6th data copied from 5th one
      if(i == data.cnt/8-1){
        let d = { "id" : i + 1, "days" : day + i + 2, "low": low, "high": high, "icon": icon }
        forecastDataFiltered.push(d)
      }
    }
    setforecastDataFiltered(forecastDataFiltered)
  }

  const airQuality10 = (data) => {
    let state
    if (data < 20) {
      state = "Good"
    } else if (data >= 20 && data < 50){
      state = "Fair"
    } else if (data >= 50 && data < 100){
      state = "Moderate"
    } else if (data >= 100 && data < 200){
      state = "Poor"
    } else {
      state = "Very Poor"
    }
    return (
      <>
        <span>
          {data<10? '0'+ data : data}
        </span>
        <span style={{ 
          marginLeft: '0.5rem',
          fontWeight: 700,
          color: data >= 100? '#d61a17' : 'white',
          }}>{state}
        </span>
      </>
    )
  }

  const airQuality25 = (data) => {
    let state
    if (data < 10) {
      state = "Good"
    } else if (data >= 10 && data < 25){
      state = "Fair"
    } else if (data >= 25 && data < 50){
      state = "Moderate"
    } else if (data >= 50 && data < 75){
      state = "Poor"
    } else {
      state = "Very Poor"
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

  const AMPM = () => {
    let uhr = hour >= 12? hour - 12 : hour
    if (hour == 0) {
      return "AM"
    } else if (hour == 12){
      return "PM"
    } else if (hour < 12 && clock >= uhr){
      return "AM"
    } else if (hour < 12 && clock < uhr){
      return "PM"
    } else if (hour >= 12 && clock < uhr){
      return "AM"
    } else if (hour >= 12 && clock >= uhr){
      return "PM"
    } 
  }

  const currentIcon = (data) => {
    let now = Date.now() / 1000 
    now = data.base == "stations" ? now : data.dt
    let sunrise = currentData.sys.sunrise 
    let sunset = currentData.sys.sunset 
    let daytime = now > sunrise && now < sunset ? true : false
    
    switch(data.weather[0].main) {
      case "Clouds":
        return (<Cloud />)
      case "Thunderstorm":
        return (<Thunder />)
      case "Drizzle":
        return (<Drizzle />)
      case "Rain":
        return (<Rain />)
      case "Snow":
        return (<Snow />)
      case "Mist":
        return (<Smog />)
      case "Smoke":
        return (<Smog />)
      case "Haze":
        return (<Smog />)
      case "Dust":
        return (<Smog />)
      case "Fog":
        return (<Smog />)
      case "Sand":
        return (<Smog />)
      case "Ash":
        return (<Smog />)
      case "Squall":
        return (<Rain />)
      case "Tornado":
        return (<Tornado />)
      case "Clear":
        return (
        <Sun daytime = { daytime } ></Sun>
      )
    }  
  }

  const dataFilter  = (dataC, dataF) => {
    let uhr = hour >= 12? hour - 12 : hour
    let clk = clock >= 12? clock - 12 : clock
    let nextUhr = []
    let now = Date.now() / 1000 + dataC.timezone
    let j

    for (let i = 1; i < 12; i++) {  
      if ((uhr + i)% 3 == 0){
        let n = uhr + i > 11 ? uhr + i - 12 : uhr + i
        nextUhr.push(n)    
      }
    }
    if (nextUhr.length == 3){
      nextUhr.push(uhr)
    }
 
    if (dataF.list[0].dt > now) {
      j = 0
    } else {
      j = 1
    }

    if (uhr <= clk && (nextUhr[0] == 0 ? clk < 12 : clk < nextUhr[0])){
      return dataC
    } else if (nextUhr[0] <= clk && (nextUhr[1] == 0 ? clk < 12 : clk < nextUhr[1])){
      return dataF.list[j]
    } else if (nextUhr[1] <= clk && (nextUhr[2] == 0 ? clk < 12 : clk < nextUhr[2])){
      return dataF.list[j+1]
    } else if (nextUhr[2] <= clk && (nextUhr[3] == 0 ? clk < 12 : clk < nextUhr[3])){
      return dataF.list[j+2]
    } else {
      return dataF.list[j+3]
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
          margin: '0 0 1rem 0',
        }}>
        <p>{ GLOBAL.days[day] } { date } { GLOBAL.months[month] } </p>
        {currentData&&(
        <p style={{ textTransform: 'uppercase' }}>{ currentData.name }</p>
        )}
        </div>

        <div className='clock'>
          <div className='clockBg' style={{ 
            backgroundImage: 'url(/weather/clock.png)',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
          }}>
            {currentData&&forecastData&&(
            <div className='currentInfo'>
              <div className='current currentTime center'>{ AMPM() }</div>
              <div className='current currentWeather'>{ currentIcon(dataFilter(currentData, forecastData)) }</div>
              <div className='current currentTemp center'>{ Math.trunc(dataFilter(currentData, forecastData).main.temp) }°</div>              
            </div>)}
          </div>
          <div className='clockPointer' ref={ pointer }></div>
          <div className='clockBg ' style={{ zIndex: 100 }}>
            <div className='bigTick tick Uhr12' onTouchStart={()=> setClock(0  )} onMouseOver={()=> setClock(0  )}></div>
            <div className='bigTick tick min01' onTouchStart={()=> setClock(0.2)} onMouseOver={()=> setClock(0.2)}></div>
            <div className='bigTick tick min02' onTouchStart={()=> setClock(0.4)} onMouseOver={()=> setClock(0.4)}></div>
            <div className='bigTick tick min03' onTouchStart={()=> setClock(0.6)} onMouseOver={()=> setClock(0.6)}></div>
            <div className='bigTick tick min04' onTouchStart={()=> setClock(0.8)} onMouseOver={()=> setClock(0.8)}></div>
            <div className='bigTick tick Uhr01' onTouchStart={()=> setClock(1  )} onMouseOver={()=> setClock(1  )}></div>
            <div className='bigTick tick min06' onTouchStart={()=> setClock(1.2)} onMouseOver={()=> setClock(1.2)}></div>
            <div className='bigTick tick min07' onTouchStart={()=> setClock(1.4)} onMouseOver={()=> setClock(1.4)}></div>
            <div className='bigTick tick min08' onTouchStart={()=> setClock(1.6)} onMouseOver={()=> setClock(1.6)}></div>
            <div className='bigTick tick min09' onTouchStart={()=> setClock(1.8)} onMouseOver={()=> setClock(1.8)}></div>
            <div className='bigTick tick Uhr02' onTouchStart={()=> setClock(2  )} onMouseOver={()=> setClock(2  )} ></div>
            <div className='bigTick tick min11' onTouchStart={()=> setClock(2.2)} onMouseOver={()=> setClock(2.2)}></div>
            <div className='bigTick tick min12' onTouchStart={()=> setClock(2.4)} onMouseOver={()=> setClock(2.4)}></div>
            <div className='bigTick tick min13' onTouchStart={()=> setClock(2.6)} onMouseOver={()=> setClock(2.6)}></div>
            <div className='bigTick tick min14' onTouchStart={()=> setClock(2.8)} onMouseOver={()=> setClock(2.8)}></div>
            <div className='bigTick tick Uhr03' onTouchStart={()=> setClock(3  )} onMouseOver={()=> setClock(3  )}></div>
            <div className='bigTick tick min16' onTouchStart={()=> setClock(3.2)} onMouseOver={()=> setClock(3.2)}></div>
            <div className='bigTick tick min17' onTouchStart={()=> setClock(3.4)} onMouseOver={()=> setClock(3.4)}></div>
            <div className='bigTick tick min18' onTouchStart={()=> setClock(3.6)} onMouseOver={()=> setClock(3.6)}></div>
            <div className='bigTick tick min19' onTouchStart={()=> setClock(3.8)} onMouseOver={()=> setClock(3.8)}></div>
            <div className='bigTick tick Uhr04' onTouchStart={()=> setClock(4  )} onMouseOver={()=> setClock(4  )}></div>
            <div className='bigTick tick min21' onTouchStart={()=> setClock(4.2)} onMouseOver={()=> setClock(4.2)}></div>
            <div className='bigTick tick min22' onTouchStart={()=> setClock(4.4)} onMouseOver={()=> setClock(4.4)}></div>
            <div className='bigTick tick min23' onTouchStart={()=> setClock(4.6)} onMouseOver={()=> setClock(4.6)}></div>
            <div className='bigTick tick min24' onTouchStart={()=> setClock(4.8)} onMouseOver={()=> setClock(4.8)}></div>
            <div className='bigTick tick Uhr05' onTouchStart={()=> setClock(5  )} onMouseOver={()=> setClock(5  )}></div> 
            <div className='bigTick tick min26' onTouchStart={()=> setClock(5.2)} onMouseOver={()=> setClock(5.2)}></div>
            <div className='bigTick tick min27' onTouchStart={()=> setClock(5.4)} onMouseOver={()=> setClock(5.4)}></div>
            <div className='bigTick tick min28' onTouchStart={()=> setClock(5.6)} onMouseOver={()=> setClock(5.6)}></div>
            <div className='bigTick tick min29' onTouchStart={()=> setClock(5.8)} onMouseOver={()=> setClock(5.8)}></div>
            <div className='bigTick tick Uhr06' onTouchStart={()=> setClock(6  )} onMouseOver={()=> setClock(6  )} ></div>
            <div className='bigTick tick min31' onTouchStart={()=> setClock(6.2)} onMouseOver={()=> setClock(6.2)}></div>
            <div className='bigTick tick min32' onTouchStart={()=> setClock(6.4)} onMouseOver={()=> setClock(6.4)}></div>
            <div className='bigTick tick min33' onTouchStart={()=> setClock(6.6)} onMouseOver={()=> setClock(6.6)}></div>
            <div className='bigTick tick min34' onTouchStart={()=> setClock(6.8)} onMouseOver={()=> setClock(6.8)}></div>
            <div className='bigTick tick Uhr07' onTouchStart={()=> setClock(7  )} onMouseOver={()=> setClock(7  )}></div>
            <div className='bigTick tick min36' onTouchStart={()=> setClock(7.2)} onMouseOver={()=> setClock(7.2)}></div>
            <div className='bigTick tick min37' onTouchStart={()=> setClock(7.4)} onMouseOver={()=> setClock(7.4)}></div>
            <div className='bigTick tick min38' onTouchStart={()=> setClock(7.6)} onMouseOver={()=> setClock(7.6)}></div>
            <div className='bigTick tick min39' onTouchStart={()=> setClock(7.8)} onMouseOver={()=> setClock(7.8)}></div>
            <div className='bigTick tick Uhr08' onTouchStart={()=> setClock(8  )} onMouseOver={()=> setClock(8  )}></div>
            <div className='bigTick tick min41' onTouchStart={()=> setClock(8.2)} onMouseOver={()=> setClock(8.2)}></div>
            <div className='bigTick tick min42' onTouchStart={()=> setClock(8.4)} onMouseOver={()=> setClock(8.4)}></div>
            <div className='bigTick tick min43' onTouchStart={()=> setClock(8.6)} onMouseOver={()=> setClock(8.6)}></div>
            <div className='bigTick tick min44' onTouchStart={()=> setClock(8.8)} onMouseOver={()=> setClock(8.8)}></div>
            <div className='bigTick tick Uhr09' onTouchStart={()=> setClock(9  )} onMouseOver={()=> setClock(9  )} ></div>
            <div className='bigTick tick min46' onTouchStart={()=> setClock(9.2)} onMouseOver={()=> setClock(9.2)}></div>
            <div className='bigTick tick min47' onTouchStart={()=> setClock(9.4)} onMouseOver={()=> setClock(9.4)}></div>
            <div className='bigTick tick min48' onTouchStart={()=> setClock(9.6)} onMouseOver={()=> setClock(9.6)}></div>
            <div className='bigTick tick min49' onTouchStart={()=> setClock(9.8)} onMouseOver={()=> setClock(9.8)}></div>
            <div className='bigTick tick Uhr10' onTouchStart={()=> setClock(10  )} onMouseOver={()=> setClock(10  )}></div>
            <div className='bigTick tick min51' onTouchStart={()=> setClock(10.2)} onMouseOver={()=> setClock(10.2)}></div>
            <div className='bigTick tick min52' onTouchStart={()=> setClock(10.4)} onMouseOver={()=> setClock(10.4)}></div>
            <div className='bigTick tick min53' onTouchStart={()=> setClock(10.6)} onMouseOver={()=> setClock(10.6)}></div>
            <div className='bigTick tick min54' onTouchStart={()=> setClock(10.8)} onMouseOver={()=> setClock(10.8)}></div>
            <div className='bigTick tick Uhr11' onTouchStart={()=> setClock(11  )} onMouseOver={()=> setClock(11  )}></div>
            <div className='bigTick tick min56' onTouchStart={()=> setClock(11.2)} onMouseOver={()=> setClock(11.2)}></div>
            <div className='bigTick tick min57' onTouchStart={()=> setClock(11.4)} onMouseOver={()=> setClock(11.4)}></div>
            <div className='bigTick tick min58' onTouchStart={()=> setClock(11.6)} onMouseOver={()=> setClock(11.6)}></div>
            <div className='bigTick tick min59' onTouchStart={()=> setClock(11.8)} onMouseOver={()=> setClock(11.8)}></div>
          </div>
        </div>

        {airData&&currentData&&forecastData&&(
        <table className='weatherInfo'>
          <tbody>
          <tr>
            <th>Wind</th> 
            <td>{ dataFilter(currentData, forecastData).wind.speed }m/s</td>
          </tr>
          <tr>
            <th>Humidity</th>
            <td>{ dataFilter(currentData, forecastData).main.humidity }%</td>
          </tr>
          <tr>
            <th>PM 10</th>
            <td>{airQuality10(Math.round(airData.list[0].components.pm10))}</td>
          </tr>
          <tr>
            <th>PM2.5</th>
            <td>{airQuality25(Math.round(airData.list[0].components.pm2_5))}</td>
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


