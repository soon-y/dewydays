import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes  } from 'react-router-dom'
import Profile from './pages/Profile.jsx'
import Timeline from './pages/Timeline.jsx'
import Weather from './pages/Weather.jsx'
import Alarm from './pages/Alarm.jsx'
import App from './pages/App.jsx'
import Cups from './pages/Cups.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(  
  <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {  <App /> } />
        <Route path='/profile' element = { <Profile /> } />
        <Route path='/timeline' element = { <Timeline /> } />
        <Route path='/weather' element = { <Weather /> } />
        <Route path='/alarm' element = { <Alarm /> } />
        <Route path='/cups' element = { <Cups /> } />
      </Routes>
    </BrowserRouter>
  </>,
)


