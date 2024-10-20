import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes  } from 'react-router-dom'
import Profile from './component/Profile.jsx'
import Timeline from './component/Timeline.jsx'
import Weather from './component/Weather.jsx'
import Alarm from './component/Alarm.jsx'
import App from './component/App.jsx'
import Cups from './component/Cups.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>    
      <App />

      <Routes>
        <Route path='/home' element = { <App /> } />
        <Route path='/profile' element = { <Profile /> } />
        <Route path='/timeline' element = { <Timeline /> } />
        <Route path='/weather' element = { <Weather /> } />
        <Route path='/alarm' element = { <Alarm /> } />
        <Route path='/cups' element = { <Cups /> } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)


