import React, { useRef, useState, useEffect } from 'react'
import { GLOBAL } from '../Global'
import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import NumInput from '../component_mui/NumInput.jsx'
import ActiveSwitch from '../component_mui/MySwitch.jsx'
import { Link } from 'react-router-dom'

export default function Profile(){
  //localStorage.clear()
  const head = "Profile"
  const d = new Date();
  let year = d.getFullYear();

  const [ result, setIntake ] = useState("0");

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

  const [active, set] = localStorage();

  return(
    <>
    <div className='bg gradient'></div>
      <h1 className='head'>{head}</h1>
      
      <Link to='/home'>
      <div className='bubble navPos close'>
        <FontAwesomeIcon icon={faXmark} className='navIcon' />
      </div>
      </Link>

      <div className='content'>       
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

        <div className='center' style={{
          marginBottom: '0.5rem',
          marginTop: '1.5rem',
          }}>
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
            <Link to='/home'>
              <button>SAVE</button>
            </Link>
        </div>
      </div>
    </>
  )
}

function localStorage() {
  const [value, set] = useState(false);
  useEffect(() => {
    window.addEventListener('storage', (e) => set(e.newValue));
    return () => {
      window.removeEventListener('storage', (e) => set(e.newValue));
      console.log("e.newValue")
    };
  }, [value]);

  const update = (newValue) => {
    window.localStorage.setItem("weight", newValue);
    let event = new Event('storage');
    event.newValue = newValue;
    window.dispatchEvent(event);
  };
  return [value, update];
}
