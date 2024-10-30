import React, { useState, useEffect, useRef } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { GLOBAL } from '../Global'
import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function Cups(){
  
  const head = "Cups"
  const [cupNum, setCup] = useState(GLOBAL.cupNum);
  const [cupAmount0, setAmount0] = useState(GLOBAL.cupAmount[0]);
  const [cupAmount1, setAmount1] = useState(GLOBAL.cupAmount[1]);
  const [cupAmount2, setAmount2] = useState(GLOBAL.cupAmount[2]);
  const [cupAmount3, setAmount3] = useState(GLOBAL.cupAmount[3]);
  const slideNum = [25, -25, -75, -125]
  const slideCup = useSpring({
    transform: `translateX(${slideNum[cupNum]}vw)`
  })
  let cupAmountScroll = useRef()
  let startNum = 0
  let num = startNum
  let step = 10
  let endNum = 2000 - step
  var totalNum = ((endNum - startNum)/step + 10);
  let numArray = []
  let width = window.innerWidth
  let ratio = width/window.innerHeight
  let colWidth = ratio >= 1? width / 100 * 11.11 : width / 100 * 20

  while (num < endNum + step + 1) {
    numArray.push(num)
    num = num + step
  }

  function getFianlNum() {
    width = window.innerWidth
    ratio = width/window.innerHeight
    colWidth = ratio >= 1? width / 100 * 11.11 : width / 100 * 20
    const finalValue = Math.round(((cupAmountScroll.current.scrollLeft)/colWidth)*step);

    switch (cupNum){
      case 0:
        setAmount0(finalValue)
        GLOBAL.cupNum = 0
        GLOBAL.cupAmount[0] = finalValue
        break
      case 1:
        setAmount1(finalValue)
        GLOBAL.cupNum = 1
        GLOBAL.cupAmount[1] = finalValue
        break
      case 2:
        setAmount2(finalValue)
        GLOBAL.cupNum = 2
        GLOBAL.cupAmount[2] = finalValue
        break
      case 3:
        setAmount3(finalValue)
        GLOBAL.cupNum = 3
        GLOBAL.cupAmount[3] = finalValue
        break
    }
  }

  useEffect(()=> {
    switch (cupNum){
      case 0:
        cupAmountScroll.current.scrollLeft = cupAmount0 / step * colWidth
        break
      case 1:
        cupAmountScroll.current.scrollLeft = cupAmount1 / step * colWidth
        break
      case 2:
        cupAmountScroll.current.scrollLeft = cupAmount2 / step * colWidth
        break
      case 3:
        cupAmountScroll.current.scrollLeft = cupAmount3 / step * colWidth
        break
    }
  }, [cupNum])

  return(
    <div className='bg gradient'>
      <h1 className='head'>{head}</h1>

      <Link to='/'>
      <div className='bubble navPos close'>
        <FontAwesomeIcon icon={faXmark} className='navIcon' />
      </div>
      </Link>

      <animated.div className='cups' style={ slideCup }>
        <img className={cupNum == 0? 'selected' : 'notSelected'} src='/cups/0.png' onClick={() => setCup(0)} />
        <img className={cupNum == 1? 'selected' : 'notSelected'} src='/cups/1.png' onClick={() => setCup(1)} />
        <img className={cupNum == 2? 'selected' : 'notSelected'} src='/cups/2.png' onClick={() => setCup(2)} />
        <img className={cupNum == 3? 'selected' : 'notSelected'} src='/cups/3.png' onClick={() => setCup(3)} />
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
        {numArray.map((el, index) => (
          <p key={ index } className='numArray' style={{
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

      <Link to='/'>
      <div className='btn center' onClick={ getFianlNum }>
        <button>USE</button>
      </div>
      </Link>
    </div>
  )
}


