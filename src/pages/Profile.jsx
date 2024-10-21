import React, { useState, useEffect } from 'react'
import { GLOBAL } from '../Global'
import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { NumberInput, InputAdornment } from '../component_mui/NumInput'
import { MaterialUISwitch } from '../component_mui/Switch'
import { Typography } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link } from 'react-router-dom'

export default function Profile(){
  const head = "Profile"
  let svg = "M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288l111.5 0L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7l-111.5 0L349.4 44.6"
  let nbsp = "\u00A0"
  const d = new Date();
  let year = d.getFullYear();
  const [result, setIntake] = useState(0)
  const [weight, setWeight] = useState(70)
  const [age, setAge] = useState(2000)
  const [duration, setDuration] = useState(60)
  const [activity, setActivity] = useState(0)

  // todo take into account weather info & age
  useEffect(() => {
    let result = activity? weight * 30 + Number.parseFloat(duration / 30).toFixed(1) * 355 : weight * 30
    setIntake(Math.round(result))
  }, [weight, age, duration, activity]);

  const setTodaysGoal = () =>{
    GLOBAL.todaysGoal = result
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
        <div className='margin-bottom'>
          <NumberInput 
          aria-label={ "weight" }
          min={ 10 } 
          max={ 200 } 
          value={ weight }
          onChange={(event, val) => setWeight(val)}
          placeholder= { "Weight" }
          endAdornment={<InputAdornment> { "kg" + nbsp + nbsp + nbsp } </InputAdornment>} 
          />      
        </div>

        <div className='margin-bottom'>
          <NumberInput 
          aria-label={ "age" }
          min={ year-100 } 
          max={ year } 
          value={ age }
          onChange={(event, val) => setAge(val)}
          placeholder= { "Birth" }
          endAdornment={<InputAdornment> { "year" } </InputAdornment>} 
          />       
        </div>   

        <div className='center' style={{
          marginBottom: '0.5rem',
          marginTop: '1.5rem',
          }}>
          <FormControlLabel sx={{ 
            color: 'white',
            margin: 0,
            }}
          control={
            <MaterialUISwitch sx={{ m: 0 }}
            onChange={(event, val) => setActivity(val)} 
            svg = { svg }
            />}
          label= {
          <Typography sx={{ 
            fontFamily: GLOBAL.fontFamily, 
            fontWeight: 700,
            marginRight: '0.8rem',
            }}>
            { "Activity Mode" } 
          </Typography>}
          labelPlacement="start"
          />
        </div>

        <div className='margin-bottom'>
          <NumberInput 
          aria-label={ "exercise" }
          min={ 0 } 
          max={ 300 } 
          value={ duration }
          onChange={(event, val) => setDuration(val)}
          placeholder= { "" }
          endAdornment={<InputAdornment> { "mins" } </InputAdornment>} 
          disabled={ activity? false : true }
          step={ 5 }
          shiftMultiplier={5}
          />        
        </div>

        <div 
          className='center'
          style={{
            marginTop: '2rem',
            color: 'white',
          }}>
          <h3>
            Today's goal&nbsp; { result + "ml" }
          </h3>
        </div>

        <div className='btn center'>
            <Link to='/'>
              <button onClick={ setTodaysGoal }>SAVE</button>
            </Link>
        </div>
      </div>
    </>
  )
}


