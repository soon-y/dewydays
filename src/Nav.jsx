import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { animated, useSpring } from '@react-spring/web'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp,faUser,faSun,faBell,faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function Nav(){

  const [checked, setChecked] = useState(false);
  const [angle, setAngle] = useState(0);

  const checking = () => {
    setChecked(state => !state)
    setAngle(a => a + 180);
  }
 
  const arrowSpring = useSpring({
    transform: `rotate(${angle}deg) scale(${checked ? 1 : 1})`,
  })

  const popping = useSpring({
    opacity: checked? 0 : 1,
    transform: `rotate(${checked ? 0 : 0}deg) scale(${checked ? 1.5 : 1})`,
  })

  const growing = useSpring({
    opacity: checked? 0 : 1,
    transform: `rotate(${checked ? 0 : 0}deg) scale(${checked ? 0 : 1})`,
  })

  return(
    <>
    <div className='setting'>
      
      <animated.div className='bubble' onClick={ checking }  style={ arrowSpring }>
        <FontAwesomeIcon icon={faChevronUp} className='btn' /> 
      </animated.div>

      <Link to='/profile'>
      <animated.div className='bubble' style={ checked ? popping : growing }>
        <FontAwesomeIcon icon={faUser} className='btn' />
      </animated.div>
      </Link>

      <Link to='/timeline'>
      <animated.div className='bubble' style={ checked ? popping : growing }>
        <FontAwesomeIcon icon={faChartSimple} className='btn' />
      </animated.div>
      </Link>

      <Link to='/weather'>
      <animated.div className='bubble' style={ checked ? popping : growing }>
        <FontAwesomeIcon icon={faSun} className='btn' />
      </animated.div>
      </Link>

      <Link to='/alarm'>
      <animated.div className='bubble' style={ checked ? popping : growing }>
        <FontAwesomeIcon icon={faBell} className='btn' />
      </animated.div>
              </Link>
      </div>

    </>
  )
}


