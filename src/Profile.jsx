import React, { useRef, useState, useEffect } from 'react'
import { GLOBAL } from './Global'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark,faCalculator } from '@fortawesome/free-solid-svg-icons'
import NumInput from './mui/NumInput.jsx'
import ActiveSwitch from './mui/MySwitch.jsx'
import MyToggle from './mui/MyToggle.jsx'
import { Link } from 'react-router-dom'

export default function Profile(){
  //localStorage.clear()
  const head = "Profile"
  const d = new Date();
  let year = d.getFullYear();

  const [ result, setIntake ] = useState("Click the button!");

  const buttonClick = () =>
  { 
    let weight = localStorage.getItem('weight')
    let age = year - localStorage.getItem('year')
    let active = localStorage.getItem('Active')
    let exercise = localStorage.getItem('exercise')

    if(weight == "0") {setIntake("Set your weight.")}
    else if(age == "2024") {setIntake("Set your birth year.")}
    else if (active == "true" && weight != "0" && age != "2024") {
      let calculation = parseInt(weight) * parseInt(age) * parseInt(exercise)
      setIntake(calculation + " ml")
    } else {
      let calculation = parseInt(weight) * parseInt(age)
      setIntake(calculation + " ml")
    } 
  }




//  const genderArray = ["Male", "Female", "Other", "nth"]

  return(
    <div className='bg'>
      <h1 className='head stroke'>{head}</h1>
      <h1 className='head'>{head}</h1>
      
      <Link to='/'>
      <div className='bubble close'>
        <FontAwesomeIcon icon={faXmark} className='btn' />
      </div>
      </Link>

      <div className='content'>

        {/* <div className='margin-bottom center'>
          <MyToggle
                  label={ "gender" }
                  values = { genderArray }
          />
        </div> */}
        
        <div className='margin-bottom'>
          <NumInput
            label={ "weight" }
            min={ 10 }
            max={ 200 }
            placeholder={ "Weight" }
            unit = { "kg" }
            keyName={ "weight" }
          />           
        </div>

        <div className='margin-bottom'>
          <NumInput
            label={ "age" }
            min={ year-100 }
            max={ year }
            placeholder={ "Birth" }
            unit = { "year" }
            keyName={ "year" }
          />           
        </div>   

        <div className='margin-bottom center'>
            <ActiveSwitch 
              label={ "Activity Mode" }
              min={ 0 }
              max={ 300 }
              placeholder={ "" }
              unit = { "mins" }
              keyName= { "activity" }
            />
        </div>

        <div className='margin-bottom'>
          <NumInput
            label={ "exercise" }
            min={ 0 }
            max={ 300 }
            placeholder={ "" }
            unit = { "mins" }
            keyName= { "exercise" }
          />           
        </div>

        <div className='margin-bottom center'>
          <h2 style={{
              marginBottom: "0px"}}>
                Today's goal&nbsp; 
          <button onClick={ buttonClick }>
            <FontAwesomeIcon icon={ faCalculator } />
          </button>
          </h2>
            <h1 style={{
              marginTop: "0px",
              fontFamily: GLOBAL.fontMain,
              color: 'white', }}>{ result } </h1>
        </div>
      </div>
    </div>
  )
}
