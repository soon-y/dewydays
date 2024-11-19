import React, { useState } from 'react'
import '../index.css'
import { animated, useSpring, useTrail } from '@react-spring/web'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { GLOBAL } from '../Global'

export default function Nav(){

  const [checked, setChecked] = useState(true);
  const [angle, setAngle] = useState(0);
  const links = ['profile', 'timeline', 'weather', 'alarm']

  const checking = () => {
    setChecked(state => !state)
    setAngle(a => a + 180);

    if (!checked) {
      api.start({
        from: { opacity: 0, scale : 0 },
        to:{ opacity: 1, scale : 1 },
        config: {
          tension: 400, 
          mass: 2, 
        }  
      })
    } else {
      api.start({
        from: { opacity: 1, scale : 1  },
        to:{ opacity: 0, scale : 2 },
        config: {
          tension: 300, 
          mass: 1, 
        }  
      })
    }
  }

  const [trail, api] = useTrail(links.length, () => ({}))
 
  const rotate = useSpring({
    transform: `rotate(${angle}deg)`,
  })

  return(
    <>
      <div className='bubble navPos' onClick={ checking } style={{ zIndex:  1000 }}>
        <animated.div style={ rotate } className='navMenu' >
          <FontAwesomeIcon icon={faChevronUp} className='navIcon' />
        </animated.div>
      </div>    
     
      {trail.map(({ ...otherProps }, i) => (
        <Link key ={ links[i] } to={ "/" + links[i] }>
        <animated.div
          key ={ links[i] } 
          className = 'bubble navPos'
          style={{ 
            ...otherProps,
            top: (3 + GLOBAL.iconGap) + i * 3 + i * GLOBAL.iconGap + 'rem'
          }}
          >
        <img src={ 'menu/' + links[i] +'.png' } className='navIcon navIconImg' />
      </animated.div>
      </Link>       
      ))}      
    </>
  )
}


