import React, { useState, useEffect, useRef, Suspense } from 'react'
import { GLOBAL } from '../Global'
import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark,faCloudShowersHeavy,faCloudSun,faSmog,faCloud,faSun,faCloudBolt,faSnowflake,faCloudRain } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import MoonOpc from '../component_weather/MoonOpc'
import Cloud from '../component_weather/Cloud'
import CloudPlus from '../component_weather/CloudPlus'
import MoonOpcCloud from '../component_weather/MoonOpcCloud.jsx'

export default function Weather(){ 
  const head = "Weather"
  const d = new Date()
  let month = d.getMonth()
  let date = d.getDate()
  let day = d.getDay()
  let hour = d.getHours()
  const pointer = useRef()
  const clockBg = useRef()
  const [clock, setClock] = useState(hour)
  const [active, setActive] = useState(false)
  const [time, setTime] = useState(hour > 12? hour - 12 : hour)
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
    setTime(clk < 1? 12 : Math.floor(clk))

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
  }, [clock, active])

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
      setDailyData(data.daily)
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

    if (hour == 0) {
      return `AM`
    } else if (hour == 12){
      return `PM`
    } else if (hour < 12 && clock >= uhr){
      return `AM`
    } else if (hour < 12 && clock < uhr){
      return `PM`
    } else if (hour >= 12 && clock < uhr){
      return `AM`
    } else if (hour >= 12 && clock >= uhr){
      return `PM`
    } 
  }

  const currentIcon = (data) => {
    const daytime = data.is_day[index]
    switch(data.weather_code[index]) {
      case 0:
        return (<MoonOpc daytime = { daytime } phase = { GLOBAL.moonPhase } />)
      case 1:
        return (<MoonOpc daytime = { daytime } phase = { GLOBAL.moonPhase } />)
      case 2:
        return (<MoonOpcCloud daytime = { daytime } phase = { GLOBAL.moonPhase } />)
      case 3:
        return (<Cloud daytime = { daytime }/>)
      case 45:
        return (<CloudPlus daytime = { daytime } plus = { 'smog' }/>)
      case 48:
        return (<CloudPlus daytime = { daytime } plus = { 'smog' }/>)
      case 51: 
        return (<CloudPlus daytime = { daytime } plus = { 'drizzle' }/>)
      case 53: 
        return (<CloudPlus daytime = { daytime } plus = { 'drizzle' }/>)
      case 55: 
        return (<CloudPlus daytime = { daytime } plus = { 'drizzle' }/>)
      case 56: 
        return (<CloudPlus daytime = { daytime } plus = { 'drizzle' }/>)
      case 57: 
        return (<CloudPlus daytime = { daytime } plus = { 'drizzle' }/>)
      case 61: 
        return (<CloudPlus daytime = { daytime } plus = { 'rain' }/>)
      case 63: 
        return (<CloudPlus daytime = { daytime } plus = { 'rain' }/>)
      case 65: 
        return (<CloudPlus daytime = { daytime } plus = { 'rain' }/>)
      case 66: 
        return (<CloudPlus daytime = { daytime } plus = { 'rain' }/>)
      case 67: 
        return (<CloudPlus daytime = { daytime } plus = { 'rain' }/>)
      case 71: 
        return (<CloudPlus daytime = { daytime } plus = { 'snow' }/>)
      case 73: 
        return (<CloudPlus daytime = { daytime } plus = { 'snow' }/>)
      case 75: 
        return (<CloudPlus daytime = { daytime } plus = { 'snow' }/>)
      case 77: 
        return (<CloudPlus daytime = { daytime } plus = { 'snow' }/>)   
      case 80: 
        return (<CloudPlus daytime = { daytime } plus = { 'rain' }/>)
      case 81: 
        return (<CloudPlus daytime = { daytime } plus = { 'rain' }/>)  
      case 82: 
        return (<CloudPlus daytime = { daytime } plus = { 'rain' }/>)
      case 85: 
        return (<CloudPlus daytime = { daytime } plus = { 'snow' }/>)
      case 86: 
        return (<CloudPlus daytime = { daytime } plus = { 'snow' }/>)
      case 95: 
        return (<CloudPlus daytime = { daytime } plus = { 'thunder'}/>)  
      case 96: 
        return (<CloudPlus daytime = { daytime } plus = { 'thunder'}/>)
      case 99: 
        return (<CloudPlus daytime = { daytime } plus = { 'thunder'}/>)
    } 
  }

  function is_touch_enabled() {
    return ( 'ontouchstart' in window ) || 
           ( navigator.maxTouchPoints > 0 ) || 
           ( navigator.msMaxTouchPoints > 0 );
  }

  const drag = (e)=> {
    if(active){
      pointer.current.style.transitionDuration = '0ms'
      let mx, my

      if(is_touch_enabled()){
        mx = e.touches[0].clientX
        my = e.touches[0].clientY
      }else{
        mx = e.clientX
        my = e.clientY
      }

      let w = clockBg.current.offsetLeft + clockBg.current.offsetWidth/2
      let h = clockBg.current.offsetTop + clockBg.current.offsetWidth/2 + 4.2*16
      let adjacent = mx - w
      let opposite = h - my
      let angle = Math.atan(opposite / adjacent) * (180/Math.PI)
      
      if (adjacent >= 0){
        angle = Math.floor(90 - angle)/30
      } else {      
        angle = Math.floor(270 - angle)/30
      }
      setClock(angle)
      document.body.style.cursor = 'grabbing'
    }
  }

  function dragEnd() {
    setActive(false)
    setClock(Math.floor(clock))
    pointer.current.style.transitionDuration = '500ms'
    document.body.style.cursor = 'default'
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

      <div className={'content'}>
        <div className="center info" style={{
          color:'white',
          margin: '0 0 0.5rem 0',
        }}>
        <p>{ GLOBAL.days[day] } { date } { GLOBAL.months[month] } </p>
        <p style={{ textTransform: 'uppercase' }}>{ GLOBAL.suburb } </p>
        </div>

        <div className='clock' 
        ref={ clockBg } 
        onMouseMove={ drag }
        onMouseUp= { () => dragEnd() }
        onTouchMove={ drag }
        onTouchEnd= { () => dragEnd() }
        style={{ 
            backgroundImage: 'url(/weather/clock.png)',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundSize: 'contain',
          }}>
          <div className='clockBg'>
            {hourlyData&&(
            <div className='currentInfo'>
              <div className='current currentTime center'>{ time +' '+ AMPM() }</div>
              <div className='current currentWeather'>{ currentIcon(hourlyData) }</div>
              <div className='current currentTemp center'>{ hourlyData.apparent_temperature[index] }°</div>
            </div>)}
          </div>
          <div className='clockBg ' style={{ zIndex: 100 }} >
          </div>
          <div className='clockPointer' ref={ pointer } 
          onMouseDown={ ()=> setActive(true) }
          onTouchStart={ ()=> setActive(true) }></div>
        </div>

        {dailyData&&airData&&hourlyData&&(
        <table className='weatherInfo'>
          <tbody>
          <tr>
            <th>Min/Max Temp</th> 
            <td> 
              <span style={{ color: GLOBAL.backgroundHell}}>{ dailyData.apparent_temperature_min[0] }° </span>
              <span>{ dailyData.apparent_temperature_max[0] }°</span>         
              </td>
          </tr>
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


