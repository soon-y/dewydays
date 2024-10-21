import React, { useState, useEffect, createRef } from 'react'
import '../index.css'
import Nav from '../component/Nav.jsx'
import WaterControl from '../component/WaterControl.jsx'
import { GLOBAL } from '../Global'

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
        { GLOBAL.todaysGoal }ml
      </div>
    </div>   
    </>
  )
}


