import React, { useEffect, useState, Suspense, useRef } from 'react'
import '../index.css'
import Nav from '../component/Nav.jsx'
import { Link } from 'react-router-dom'
import { GLOBAL } from '../Global'
import Sun from '../component_weather/Sun'
import Cloud from '../component_weather/Cloud'
import CloudPlus from '../component_weather/CloudPlus'
import SunCloud from '../component_weather/SunCloud'
import { animated, useSpring } from '@react-spring/web'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Slider } from '@mui/material';
import { styled } from '@mui/material/styles';

export default function App(){ 
  const [daytime, setDaytime] = useState(GLOBAL.daytime)
  const [weatherCode, setWeatehrCode] = useState(GLOBAL.weatherCode)
  const [currentData, setcurrentData] = useState(null)
  const [waterHeight, setWaterHeight] = useState(GLOBAL.waterHeight)
  const [amount, setAmount] = useState(GLOBAL.cupAmount[GLOBAL.cupNum])
  const [percent, setPercent] = useState(GLOBAL.waterPercent)
  const dewy = useRef()
  const dewyMansae = useRef()
  let src = 'cups/' + GLOBAL.cupNum + '.png'
  const marks = [
    {
      value: GLOBAL.cupAmount[GLOBAL.cupNum],
      label: GLOBAL.cupAmount[GLOBAL.cupNum] + 'ml',
    },
  ]
  const today = new Date()
  const y = today.getFullYear()
  const m = today.getMonth()
  const d = today.getDate()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, fail)
    GLOBAL.moonPhase = moon_phase(y, m+1, d)
    let waterAmount = 80 - (GLOBAL.currentIntake/GLOBAL.todaysGoal * 54)
    if (GLOBAL.waterHeight != 101) {
      GLOBAL.waterHeight = waterAmount <= 26? 27 : waterAmount
      dewy.current.style.display = 'block'
    }
    setWaterHeight(GLOBAL.waterHeight)
    setPercent(GLOBAL.currentIntake/GLOBAL.todaysGoal * 100)
    GLOBAL.waterPercent = percent
  },[])

  const success = (position) => {
    GLOBAL.latitude =  position.coords.latitude
    GLOBAL.longitude = position.coords.longitude

    const requestOptions = {
      method: 'GET',
    };
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${GLOBAL.latitude}&lon=${GLOBAL.longitude}&apiKey=38a752707cfe42d3a39af25db2e3e18e`, requestOptions)
      .then(response => response.json())
      .then(result => {
        GLOBAL.suburb = typeof(result.features[0].properties.suburb) === "undefined" ? result.features[0].properties.city : result.features[0].properties.suburb
        GLOBAL.timezone = result.features[0].properties.timezone.name
        GLOBAL.timezone = GLOBAL.timezone.replace("/", "%2F")
        getWeatherData(GLOBAL.latitude, GLOBAL.longitude, GLOBAL.timezone)
        })
      .catch(error => console.log('error', error));
  }

  const fail = () => {
    getWeatherData(GLOBAL.latitude, GLOBAL.longitude, GLOBAL.timezone)
  }

  const getWeatherData = async (lat,lon, time) => {
    const options = { method: 'GET', headers: { accept: 'application/json' } }
    const response = await fetch
    (`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=is_day,weather_code&timezone=${time}`, options)
    .then(response => response.json())
    .then(data => {
      setcurrentData(data)
      setDaytime(data.current.is_day)
      GLOBAL.daytime = data.current.is_day
      setWeatehrCode(data.current.weather_code)
      GLOBAL.weatherCode = data.current.weather_code
    })
  }

  const addWater = useSpring({
    top: `${waterHeight}vh`,
  })

  const addWaterData = () => {
    const d = new Date()
    let year = d.getFullYear().toString()
    let month = d.getMonth()
    let day = d.getDate()
    let hr = d.getHours()
    let min = d.getMinutes()

    dewy.current.style.display = 'none'
    dewyMansae.current.style.display = 'block'
    setTimeout(()=> {
      dewyMansae.current.style.display = 'none'
      dewy.current.style.display = 'block'
    }, 400)

    if(amount !=  0) {
      let newD = { 
        amount: amount, 
        cup: GLOBAL.cupNum, 
        date: day +" "+ GLOBAL.months[month] +" "+ year.slice(2,4), 
        hour: hr<10? "0" + hr + ":" : hr + ":",
        min: min<10? "0" + min : min,
        goal: GLOBAL.todaysGoal
      }
      GLOBAL.timelineData.splice(GLOBAL.timelineDataIndex,0,newD)
      GLOBAL.timelineDataIndex += 1
      GLOBAL.currentIntake += amount
      let waterAmount = 80 - (GLOBAL.currentIntake/GLOBAL.todaysGoal * 54)
      if (GLOBAL.waterHeight == -101) {
         GLOBAL.waterHeight = waterAmount
      } else {
        GLOBAL.waterHeight = waterAmount <= 26? 27 : waterAmount
      }
    }
    setWaterHeight(GLOBAL.waterHeight)
    setPercent(GLOBAL.currentIntake/GLOBAL.todaysGoal * 100)
    GLOBAL.waterPercent = percent
  }

  const currentIcon = () => {
    switch(weatherCode) {
      case 0:
        return (<Sun daytime = { GLOBAL.daytime } phase = { GLOBAL.moonPhase } />)
      case 1:
        return (<Sun daytime = { GLOBAL.daytime } phase = { GLOBAL.moonPhase } />)
      case 2:
        return (<SunCloud daytime = { GLOBAL.daytime } phase = { GLOBAL.moonPhase } />)
      case 3:
        return (<Cloud daytime = { GLOBAL.daytime }/>)
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

  function moon_phase(year, month, day){
    let c,e,jd,b = 0;
    if (month < 3){
      year--
      month += 12
    }
    ++month
    c = 365.25 * year
    e = 30.6 * month
    jd = c + e + day - 694039.09;	//total days elapsed
    jd /= 29.5305882	//divide by the moon cycle
    b = Math.floor(jd)
    jd -= b		
    b = Math.round(jd * 8);	//scale fraction from 0-8 and round
  
    if (b >= 8 ){ b = 0;}
    return b
  }

  return(
    <>
    <div id='bg' style={{
      backgroundImage: daytime ? "url(/main/bg.jpg)" : "url(/main/bgNight.jpg)",
      height: '100vh',
      width: '100vw',
      position: 'fixed',
      overflow: 'hidden',
    }}>
      <Nav /> 

      <div className='currentWeatherMain' style={{
        position: 'fixed',
        height: '14vh',
        aspectRatio: 1,
        top: '1.5rem',
        marginLeft: '1.5rem',
      }}>
        <Link to={ "/weather" }>
        <div>
          { currentIcon() }
        </div>
        </Link>
      </div>

      <div className='todaysGoal' style={{
        position: 'fixed',
        top: '16vh',
        fontWeight: '600',
        fontSize: '1.2rem',
        color: 'white',
        height: 'auto',
        width: '70vw',
        padding: '1rem',
        stroke: daytime? GLOBAL.strokeColor : "#5e99d0",
        WebkitTextStrokeColor: daytime? GLOBAL.strokeColor : "#5e99d0",
      }}>
        Today's goal <br />
        { GLOBAL.todaysGoal }ml
      </div>

      <div className='ground' style={{
        display: waterHeight == 101 ? 'block' : 'none',
      }}></div>
 
      <div style={{ display: daytime? 'block' : 'none' }}>
        <animated.img src='/main/water.png' className= "water narrow" style={ addWater }/>
        <animated.img src='/main/waterWide.png' className= "water wide" style={ addWater }/>
      </div>
      <div style={{ display: daytime? 'none' : 'block' }}>
        <animated.img src='/main/waterNight.png' className= "water narrow" style={ addWater }/>
        <animated.img src='/main/waterWideNight.png' className= "water wide" style={ addWater }/>
      </div>

      <Link to='/timeline'>
      <animated.span style={ addWater } className= "waterIntake" >
        { GLOBAL.currentIntake }ml <br/>
        { Math.round(percent) }%
      </animated.span>
      </Link>

      <img src='/dewy/dewy.gif' className="dewy" width= '100%' ref = { dewy } style={{
        display: waterHeight == 101 ? 'block' : 'none',
        bottom: '-1rem'
      }}/>

      <animated.div style={ addWater } className="dewy onWater">
      <img src='/dewy/dewyWater.gif' className="dewy" width= '100%' ref = { dewy } style={{
        display: 'none'
      }}/>
      <img src='/dewy/dewyMansae.png' className="dewy" width= '100%' ref = { dewyMansae } style={{
        display: 'none'
      }}/>
      </animated.div>

      <div className='setWater' style={{
        zIndex: 1000,
        position: 'fixed',
      }}>
        <WaterSlider
          aria-label="Water Intake"
          valueLabelDisplay="auto"
          step={5}
          min={0}
          max={ GLOBAL.cupAmount[GLOBAL.cupNum] }
          marks={ marks }
          defaultValue={ GLOBAL.cupAmount[GLOBAL.cupNum] }
          onChange={ (e, val) => setAmount(val) }
        />
        <div className='empty'></div>
        <div className='bubble' onClick={ addWaterData }>
          <FontAwesomeIcon icon={faPlus} className='navIcon' />
        </div>   
        <Link to='/Cups'>
        <div className='bubble'>
          <img src={ src } style={{
            height: '100%', 
            padding: '0 0.7rem',
            borderRadius: '50%'
            }}/>
        </div>
        </Link>
      </div>
    </div>
    </>
  )
}

const WaterSlider = styled(Slider)({
  color: 'rgba(255,255,255,0.8)',
  height: '0.4rem',
  '& .MuiSlider-markLabel': {
    color: 'rgba(255,255,255,1)',
    fontSize: '1rem',
    right: GLOBAL.cupAmount[GLOBAL.cupNum] >= 1000? '-7rem' : '-5.8rem',
    top: '2rem',
    fontFamily: GLOBAL.fontFamily,
    fontWeight: 700,
  },
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: '1.4rem',
    width: '1.4rem',
    backgroundColor: 'rgba(255,255,255,1)',
    border: 'none',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
    '&::before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    fontFamily: GLOBAL.fontFamily,
    lineHeight: 1.2,
    fontSize: '1rem',
    background: 'unset',
    padding: 0,
    width: '3rem',
    height: '3rem',
    borderRadius: '50% 50% 50% 0',
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    fontWeight: 700,
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&::before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});
