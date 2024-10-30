import React, { useState,useRef, useEffect } from 'react'
import { GLOBAL } from '../Global'
import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function Timeline(){  
  const head = "Timeline"
  let headComp = useRef([]);
  const [total, setTotal] = useState([])

  useEffect(() => {
    let date = null
    let totalAmount = 0
    let array = []
    let num = 0
    for (const i in GLOBAL.timelineData) {
      if (GLOBAL.timelineData[i].date == date){
        headComp.current[i].style.display = 'none'
        totalAmount = GLOBAL.timelineData[i].amount + totalAmount
        array.push(totalAmount)
        num++

        if(i == GLOBAL.timelineData.length -1) {
          let max = Math.max(...array)
          for(let j = 0; j <= num; j++){
            total.push(max)
            setTotal([...total])
          }
        }
      } else {
        if(array.length > 0 ) {
          let max = Math.max(...array)
          for(let j = 0; j < num; j++){
            total.push(max)
            console.log(max)
            console.log(num)
          }
          console.log(total)
          array = []
        }
        totalAmount = GLOBAL.timelineData[i].amount
        date = GLOBAL.timelineData[i].date 
        headComp.current[i].style.display = 'block'
      }
    }

console.log(total)
    
  },[])

  return(
    <>
    <div className='bg gradient'></div>
      <h1 className='head'>{head}</h1>
      
      <Link to='/'>
      <div className='bubble navPos close' key="close">
        <FontAwesomeIcon icon={faXmark} className='navIcon' />
      </div>
      </Link>

      <div className='content' style={{top:'3rem'}}>
      
      {GLOBAL.timelineData.map((el,index) => (
      <div key={ index }>
        <div ref={(element) => headComp.current[index] = element} style={{
          width: "60%", 
          height: '2.4rem',
          lineHeight: '2.4rem',
          display: 'block',
          backgroundColor: GLOBAL.backgroundDunkeler,
          color: '#fff',
          borderRadius: '10px',
          padding: '0 20px',
          marginLeft: '1rem',
          marginRight: '1rem',
          marginTop: '1.4rem',        
        }}>
          <span style={{
            float: 'left', 
            fontWeight: '800',
          }}> 
            {total[index]}ml &nbsp;&nbsp;
          </span>
          <span style={{
              float: 'right', 
          }}> 
            {el.date}
          </span>
        </div>

        <div style={{
          marginLeft: '2.6rem',
          width: '0.4rem',
          height:'1rem',
          backgroundColor: GLOBAL.backgroundDunkeler,
        }}></div>
        <div style={{
          width: "auto", 
          height: '3rem',
          lineHeight: '3rem',
          background: 'white',
          borderRadius: '2rem',
          border: '0.16rem solid ' + GLOBAL.backgroundDunkeler,
          padding: '0 1rem',
          color: GLOBAL.backgroundDunkeler,
          marginLeft: '1rem',
          marginRight: '1rem',
        }}>
          <img src={ 'cups/' + el.cup + '.png' } style = {{
            height: '100%',
            float: 'left'
          }} />
          <span style={{
            fontWeight: '700',
            marginLeft: '0.6rem',
          }}>  
          {el.amount}ml
          </span>
          <span style={{
            float: 'right',
          }}> 
            {el.hour + el.min}
            &nbsp;&nbsp;
          </span>
        </div>
      </div>
      ))}
      </div>
    </>
  )
}


