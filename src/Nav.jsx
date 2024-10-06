import React, { useState } from 'react'
import './index.css'
import { animated, useSpring, useTrail } from '@react-spring/web'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp,faUser,faSun,faBell,faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { GLOBAL } from './Global'

export default function Nav(){

  const [checked, setChecked] = useState(true);
  const [angle, setAngle] = useState(0);
  const icons = [ faUser, faChartSimple, faSun, faBell]
  const links = ['profile', 'timeline', 'weather', 'alarm']

  const checking = () => {
    setChecked(state => !state)
    setAngle(a => a + 180);
  }
 
  const arrowSpring = useSpring({
    transform: `rotate(${angle}deg)`,
  })

  const trail = useTrail(icons.length, {
    tension: 300, friction: 160,
    from: { opacity: 0, scale : checked ? 0 : 1 },
    to:[{ opacity: checked? 1 : 0, scale : checked ? 1 : 1.5 },
        { scale : checked ? 1 : 1.5},
        { scale : checked ? 1 : 1.5},
        { scale : checked ? 1 : 1.5},
        { scale : checked ? 1 : 0},
        { scale : checked ? 1 : 0},
        { scale : checked ? 1 : 0},
    ],
  });

  return(
    <>
      { <div className='bubble navPos' onClick={ checking } >
        <animated.div style={ arrowSpring } className='navMenu' >
        <FontAwesomeIcon icon={faChevronUp} className='navIcon' />
        </animated.div>
      </div>
      }
      <>
      {trail.map(({ ...otherProps }, i) => (
        <Link to={ "/" + links[i] }>
        <animated.div
          key ={ links[i] } 
          className = 'bubble navPos'
          style={{ 
            ...otherProps,
            top: 3.8 + i * 3 + i * GLOBAL.iconGap + 'rem'
          }}
          >
        <FontAwesomeIcon icon={ icons[i] } className='navIcon' />
      </animated.div>
      </Link>       
      ))}
      </>   
    </>
  )
}


