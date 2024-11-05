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
  const [goal, setGoal] = useState([])

  useEffect(() => {
    let date = null
    let totalAmount = 0
    let arrayTotal = []
    let arrayGoal = []
    let num = 0
    for (const i in GLOBAL.timelineData) {
      if (GLOBAL.timelineData[i].date == date){
        headComp.current[i].style.display = 'none'
        totalAmount = GLOBAL.timelineData[i].amount + totalAmount
        arrayTotal.push(totalAmount)
        arrayGoal.push(GLOBAL.timelineData[i].goal)
        num++

        if((i == GLOBAL.timelineData.length -1)) {
          for(let j = 0; j <= num; j++){
            total.push(arrayTotal[num])
            goal.push(arrayGoal[num])
            setTotal([...total])
            setGoal([...goal])
          }
        }
      } else {
        if(arrayTotal.length > 0) {
          for(let j = 0; j <= num; j++){
            total.push(arrayTotal[num])
            goal.push(arrayGoal[num])
          }
          arrayTotal = []
          arrayGoal = []
          num=0
        }
        if( arrayTotal.length == 0) {
          arrayTotal.push(GLOBAL.timelineData[i].amount)
          arrayGoal.push(GLOBAL.timelineData[i].goal)
        }
        totalAmount = GLOBAL.timelineData[i].amount
        date = GLOBAL.timelineData[i].date 
        headComp.current[i].style.display = 'block'
      }
    }
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
          width: 'auto', 
          height: '2.4rem',
          lineHeight: '2.4rem',
          display: 'block',
          backgroundColor: GLOBAL.backgroundDunkeler,
          color: '#fff',
          borderRadius: '10px',
          padding: '0 1.5rem 0 1rem',
          marginLeft: '1rem',
          marginRight: '1rem',
          marginTop: '1.4rem',        
        }}>
          <span style={{fontWeight: '800',}}> 
          {Math.round(total[index]/goal[index] * 100)}%&nbsp;&nbsp;
          {total[index]}ml&nbsp;
          </span>
          <span style={{fontWeight: '600',}}> 
            / {goal[index]}ml
          </span>
          <span style={{
              float: 'right', 
              fontWeight: '500'
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
            marginLeft: '1rem',
          }}>  
          {el.amount}ml
          </span>
          <span style={{
            float: 'right',
            fontWeight: '500',
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


