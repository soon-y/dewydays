import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes  } from 'react-router-dom'
import Profile from './Profile.jsx'
import Timeline from './Timeline.jsx'
import Weather from './Weather.jsx'
import Alarm from './Alarm.jsx'
import App from './App.jsx'
import Nav from './Nav.jsx'
import WaterControl from './WaterControl.jsx'
import Cups from './Cups.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
//  <React.StrictMode>
  <BrowserRouter>    
    
    <div className='wrapper'> 
    <Nav />
    <WaterControl />
    </div>

    <Routes>
        <Route path='/' />
        <Route path='/profile' element = { <Profile /> } />
        <Route path='/timeline' element = { <Timeline /> } />
        <Route path='/weather' element = { <Weather /> } />
        <Route path='/alarm' element = { <Alarm /> } />
        <Route path='/cups' element = { <Cups /> } />
      </Routes>
  </BrowserRouter>
//</React.StrictMode>,
)


