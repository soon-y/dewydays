import React, { useState, useEffect, createRef } from 'react'
import '../index.css'
import Nav from './Nav.jsx'
import WaterControl from './WaterControl.jsx'



export default function App(){ 

  
  return(
    <>
    <div id='bg'>
      <Nav /> 
      <WaterControl />

      <div className='currentWeatherMain' style={{
        width: '50%',
        height: '14%',
      }}>

      </div>
      <div className='todaysGoal' style={{
        marginLeft: '1rem',
        fontWeight: '600',
        fontSize: '1.2rem',
        color: 'white',
        height: '10%',
      }}>
        Today's goal <br />
        2000ml
      </div>
    </div>   
    </>
  )
}


