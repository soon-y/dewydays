import React, { useState } from 'react'
import { GLOBAL } from './Global'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark,faCloud, faSun,faCloudBolt,faSnowflake,faCloudShowersHeavy,faCloudSun, } from '@fortawesome/free-solid-svg-icons'
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

  return(
    <div className='bg gradient'>
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
        <p>{GLOBAL.days[day]} {date} {GLOBAL.months[month]} </p>
        <p>HAMBURG</p>
        </div>

        <div className='clock'>
          <img className='pointer' src='/weather/pointer.png'/>
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

        <div className='weeklyWeather center'>
          <div>
            <div className='day'>Sun</div>
            <div className='weatherIcon'>
            <FontAwesomeIcon icon={faCloud} />
            </div>
            <span className='lowest'>11°</span>
            <span className='highest'>18°</span>
          </div>

          <div>
            <div className='day'>Mon</div>
            <div className='weatherIcon'>
            <FontAwesomeIcon icon={faCloudBolt} />
            </div>
            <span className='lowest'>11°</span>
            <span className='highest'>18°</span>
          </div>

          <div>
            <div className='day'>Tue</div>
            <div className='weatherIcon'>
            <FontAwesomeIcon icon={faCloudSun} />
            </div>
            <span className='lowest'>11°</span>
            <span className='highest'>18°</span>
          </div>

          <div>
            <div className='day'>Wed</div>
            <div className='weatherIcon'>
            <FontAwesomeIcon icon={faCloudShowersHeavy} />
            </div>
            <span className='lowest'>11°</span>
            <span className='highest'>18°</span>
          </div>

          <div>
            <div className='day'>Thu</div>
            <div className='weatherIcon'>
            <FontAwesomeIcon icon={faSnowflake} />
            </div>
            <span className='lowest'>11°</span>
            <span className='highest'>18°</span>
          </div>

          <div>
            <div className='day'>Fri</div>
            <div className='weatherIcon'>
            <FontAwesomeIcon icon={faSun} />
            </div>
            <span className='lowest'>11°</span>
            <span className='highest'>18°</span>
          </div>
          
        </div>




      </div>


       

    </div>
  )
}


