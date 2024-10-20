import React, { useState, useEffect, useRef, createRef } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { GLOBAL } from '../Global'
import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark} from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'

export default function Cups(){
  
  const head = "Cups"
  const [cupNum, setCup] = useState(1);
  const [cupAmount, setAmount] = useState(350);
  const slideNum = [25, -25, -75, -125]
  const slideCup = useSpring({
    transform: `translateX(${slideNum[cupNum]}vw)`
  })
  let cupAmountScroll = createRef()
  let startNum = 0
  let num = startNum
  let step = 10
  let endNum = 2000 - step
  var totalNum = ((endNum - startNum)/step + 10);
  let cupArray = []
  let width = window.innerWidth
  let ratio = width/window.innerHeight
  let colWidth = ratio >= 1? width / 100 * 11.11 : width / 100 * 20

  while (num < endNum + step + 1) {
    cupArray.push(num)
    num = num + step
  }

  function getFianlNum() {
    width = window.innerWidth
    ratio = width/window.innerHeight
    colWidth = ratio >= 1? width / 100 * 11.11 : width / 100 * 20
    const finalValue = Math.round(((cupAmountScroll.current.scrollLeft)/colWidth)*step);
    setAmount(finalValue)
    console.log(cupAmount)
  }

  useEffect(()=> {
    cupAmountScroll.current.scrollLeft = cupAmount / step * colWidth
  }, [cupAmountScroll, cupAmount, cupNum])

  return(

    <div className='bg gradient'>
      <h1 className='head'>{head}</h1>

      <Link to='/home'>
      <div className='bubble navPos close'>
        <FontAwesomeIcon icon={faXmark} className='navIcon' />
      </div>
      </Link>

      <animated.div className='cups' style={ slideCup }>
        <img className={cupNum == 0? 'selected' : 'notSelected'} src='/cups/0.png' onMouseUp={() => setCup(0)} onClick={() => setCup(0)} />
        <img className={cupNum == 1? 'selected' : 'notSelected'} src='/cups/1.png' onMouseUp={() => setCup(1)} onClick={() => setCup(1)} />
        <img className={cupNum == 2? 'selected' : 'notSelected'} src='/cups/2.png' onMouseUp={() => setCup(2)} onClick={() => setCup(2)} />
        <img className={cupNum == 3? 'selected' : 'notSelected'} src='/cups/3.png' onMouseUp={() => setCup(3)} onClick={() => setCup(3)} />
      </animated.div>

      <div className='cupAmountBg' style={{
        position:'relative',
        top: '3rem',
        width: '90vw',
        height: '3rem',
        margin: 'auto',
        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.4), rgba(255,255,255,0))',
      }}>
        <div className='cupSelectionBox' style={{
          position:'relative',
          height: '3rem',
          background: GLOBAL.backgroundDunkeler,
          left: '50%',
          transform: 'translateX(-50%)',
          borderRadius: '0.6rem'
        }}>
        </div>
        <div style={{
          position:'relative',
          width: 0,
          height: 0,
          borderLeft: '0.8rem solid transparent',
          borderRight: '0.8rem solid transparent',
          borderTop: '1rem solid ' + GLOBAL.backgroundDunkeler,
          margin: 'auto',
        }}>
        </div>
      </div>

      <div ref= { cupAmountScroll } className='cupAmount' style={{
        position:'relative',
        top: '0rem',
        width: '100vw',
        height: '3rem',
        margin: 'auto',
        background: 'transparent',
        overflowX: 'auto',
        overflowY: 'hidden',
        scrollSnapType: 'x mandatory',
        scrollSnapStop: 'always',
        display: 'grid',
      }}>
        {cupArray.map((el, index) => (
          <p key={ index } className='cupArray' style={{
            position: 'relative',
            color: 'white',
            margin: 'auto',
            fontWeight: 600,
            fontSize: '1.1rem',
            textAlign: 'center',
            scrollSnapAlign: 'center',
          }}>{el}ml</p>
        ))}
      </div>

      <div className='btn center' style={{
        }}>

            <button onClick={ getFianlNum }>USE</button>

      </div>
    
    </div>

  )
}


