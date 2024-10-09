import React, { useState, useEffect } from 'react'
import { animated, useSpring } from '@react-spring/web'
import ReactDOM from 'react-dom/client'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark} from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'

export default function Weather(){
  
  const head = "Cups"
  const [cupNum, setCup] = useState(1);
  const slideNum = [25, -25, -75, -125]
  const slideCup = useSpring({
    transform: `translateX(${slideNum[cupNum]}vw)`
  })

  return(
    <div className='bg gradient'>
      <h1 className='head'>{head}</h1>
      
      <Link to='/'>
      <div className='bubble navPos'>
        <FontAwesomeIcon icon={faXmark} className='navIcon' />
      </div>
      </Link>

      <div className='content'>
      <animated.div className='cups' style={ cupNum == 0? slideCup :  slideCup}>
        <img className={cupNum == 0? 'selected' : 'notSelected'} src='/cups/00.png' onClick={() => setCup(0)} />
        <img className={cupNum == 1? 'selected' : 'notSelected'} src='/cups/01.png' onClick={() => setCup(1)} />
        <img className={cupNum == 2? 'selected' : 'notSelected'} src='/cups/02.png' onClick={() => setCup(2)} />
        <img className={cupNum == 3? 'selected' : 'notSelected'} src='/cups/03.png' onClick={() => setCup(3)} />
      </animated.div>

      <div className='cupAmount'>
      <div id="scroller">
 		    <div id="scroller-block"></div>
	    </div>
      </div>



      <div className='btn center'>
            <Link to='/'>
              <button>USE</button>
            </Link>
        </div>
      </div>
    </div>
  )
}


