import React, { useState, useEffect, createRef } from 'react'
import { GLOBAL } from '../Global.js'
import '../index.css'
import Nav from './Nav.jsx'
import WaterControl from './WaterControl.jsx'


export default function App(){ 

  
  return(
    <>
    <div id='bg'>
      <Nav /> 
      <WaterControl />
    </div>
      
    </>
  )
}


