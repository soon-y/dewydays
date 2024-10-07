import React, { useState } from 'react'
import { GLOBAL } from './Global'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark} from '@fortawesome/free-solid-svg-icons'
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Link } from 'react-router-dom'





export default function Weather(){
  
  const head = "Weather"
  const [active, setActive] = useState(false);

  const d = new Date()
  let month = d.getMonth()
  let date = d.getDate()
  let day = d.getDay()
  let hour = d.getHours();
  let minute = d.getMinutes(); 

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


  return(
    <div className='bg'>
      <h1 className='head'>{head}</h1>
      
      <Link to='/'>
      <div className='bubble navPos'>
        <FontAwesomeIcon icon={faXmark} className='navIcon' />
      </div>
      </Link>

      <div className='content'>
        <div className="center info" style={{
          color:'white',
          margin: '0 0 1rem 0',
        }}>
        <p>{days[day]} {date} {months[month]} </p>
        <p>HAMBURG</p>
        </div>

        <div className='clock'>
          <div className='tick bigTick Uhr12'></div>
          <div className='tick bigTick rotate Uhr3'></div>
          <div className='tick bigTick Uhr6'></div>
          <div className='tick bigTick rotate Uhr9'></div>




        </div>

        <table className='weatherInfo'>
          <tr>
            <th>Change of Rain</th>
            <td>0%</td>
          </tr>
          <tr>
            <th>Humitidy</th>
            <td>35%</td>
          </tr>
          <tr>
            <th>PM 10</th>
            <td>81</td>
          </tr>
          <tr>
            <th>UV Index</th>
            <td>0</td>
          </tr>
        </table>

        <div className='weekWeather'>
          
        </div>




      </div>


       

    </div>
  )
}


