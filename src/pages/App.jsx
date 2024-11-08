import React, { useEffect, useState, Suspense, useRef } from 'react'
import '../index.css'
import Nav from '../component/Nav.jsx'
import { Link } from 'react-router-dom'
import { GLOBAL } from '../Global'
import Sun from '../component_weather/Sun'
import Cloud from '../component_weather/Cloud'
import Rain from '../component_weather/Rain'
import Snow from '../component_weather/Snow'
import Drizzle from '../component_weather/Drizzle'
import Thunder from '../component_weather/Thunder'
import Smog from '../component_weather/Smog'
import Tornado from '../component_weather/Tornado'
import { animated, useSpring } from '@react-spring/web'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Slider } from '@mui/material';
import { styled } from '@mui/material/styles';

export default function App(){ 
  const [currentData, setcurrentData] = useState(null)
  const [waterHeight, setWaterHeight] = useState(GLOBAL.waterHeight)
  const [amount, setAmount] = useState(GLOBAL.cupAmount[GLOBAL.cupNum])
  const [percent, setPercent] = useState(GLOBAL.waterPercent)
  const [daytime, setDaytime] = useState(true)
  const dewy = useRef()
  const dewyMansae = useRef()
  let src = 'cups/' + GLOBAL.cupNum + '.png'
  const marks = [
    {
      value: GLOBAL.cupAmount[GLOBAL.cupNum],
      label: GLOBAL.cupAmount[GLOBAL.cupNum] + 'ml',
    },
  ]

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, fail)
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
    getWeatherData(GLOBAL.latitude, GLOBAL.longitude)
  }

  const fail = () => {
    getWeatherData(GLOBAL.latitude, GLOBAL.longitude)
  }

  let now, sunrise, sunset

  const getWeatherData = async (lat,lon) => {
    const options = { method: 'GET', headers: { accept: 'application/json' } }
    const response = await fetch
    (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${GLOBAL.API_KEY}&units=metric`, options)
    .then(response => response.json())
    .then(data => {
      setcurrentData(data)
      now = Date.now() / 1000 
      sunrise = data.sys.sunrise 
      sunset = data.sys.sunset 
      const day = now > sunrise && now < sunset ? true : false
      setDaytime(day)
    })

    if (!response.ok) {
      throw new Error("error");
    }
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

  const currentIcon = (data) => {    
    switch(data.weather[0].main) {
      case "Clouds":
        return (<Cloud daytime = { daytime }/>)
      case "Thunderstorm":
        return (<Thunder daytime = { daytime }/>)
      case "Drizzle":
        return (<Drizzle daytime = { daytime }/>)
      case "Rain":
        return (<Rain daytime = { daytime }/>)
      case "Snow":
        return (<Snow daytime = { daytime }/>)
      case "Mist":
        return (<Smog daytime = { daytime }/>)
      case "Smoke":
        return (<Smog daytime = { daytime }/>)
      case "Haze":
        return (<Smog daytime = { daytime }/>)
      case "Dust":
        return (<Smog daytime = { daytime }/>)
      case "Fog":
        return (<Smog daytime = { daytime }/>)
      case "Sand":
        return (<Smog daytime = { daytime }/>)
      case "Ash":
        return (<Smog daytime = { daytime }/>)
      case "Squall":
        return (<Rain daytime = { daytime }/>)
      case "Tornado":
        return (<Tornado daytime = { daytime }/>)
      case "Clear":
        return (<Sun daytime = { daytime } />)
      default:
        return (<Cloud />)
    }  
  }

  return(
    <Suspense fallback={<Loading />}>
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
        top: '1rem',
        marginLeft: '1rem',
      }}>
        <Link to={ "/weather" }>
        {currentData&&(
        <div>
          { currentIcon(currentData) }
        </div>)}
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

      <img src='/dewy/dewy.png' className="dewy" width= '100%' style={{
        display: waterHeight == 101 ? 'block' : 'none',
        bottom: '-1.5rem'
      }}/>

      <animated.div style={ addWater } className="dewy onWater">
      <img src='/dewy/dewyWater.png' className="dewy" width= '100%' ref = { dewy } style={{
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
          <img src={ src } style={{ height: '100%'}}/>
        </div>
        </Link>
      </div>
    </div>
    </Suspense>
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


function Loading() {
  console.log("loading")
  return <img src='main/loading.png' width='100%' />
}

