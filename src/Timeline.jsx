import React, { useState } from 'react'
import { GLOBAL } from './Global'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function CompWater({ cup, amount, time }) {
  let link = 'cups/' + cup + '.png'

  return <>
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

      <img src={link} style = {{
        height: '100%',
        float: 'left'
      }} />

      <span style={{
        fontWeight: '700',
        marginLeft: '0.6rem',
      }}>  
      {amount}ml
      </span>
      
      <span style={{
        float: 'right',
      }}> 
        {time}
        &nbsp;&nbsp;
        <FontAwesomeIcon icon={ faXmark } style={{color: "#ccc"}}/>
        </span>
      </div>
      </>
}

function HeadComp ({ date, total }) {
    return <div style={{
      width: "50%", 
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
        {total} &nbsp;&nbsp;
        </span>

        <span style={{
        float: 'right', 
      }}      
        > 
        {date} &nbsp;&nbsp;
        <FontAwesomeIcon icon={faPlus} />
        </span>
        
        
        </div>
}

export default function Timeline(){  
  const head = "Timeline"

  const d = new Date()
  let year = d.getFullYear().toString()
  let month = d.getMonth()
  let day = d.getDate()
  let hr = d.getHours()
  let min = d.getMinutes()

  const data = [
    { id: 0, amount: 100, cup: 0, },
    { id: 1, amount: 300, cup: 1, },
    { id: 2, amount: 200, cup: 2, },
    { id: 3, amount: 150, cup: 3, },
    { id: 4, amount: 400, cup: 0, },
    { id: 5, amount: 500, cup: 1, },
  ];

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
      <HeadComp 
        date={day +" "+ GLOBAL.months[month] +" "+ year.slice(2,4)} 
        total={"1000ml"}
        />
      {data.map((el) => (
          <CompWater key={el.id} amount={el.amount} time={hr + ":" + min} cup={el.cup} />
        ))}

      <HeadComp 
        date={day +" "+ GLOBAL.months[month] +" "+ year.slice(2,4)} 
        total={"1000ml"}
        />
      {data.map((el) => (
          <CompWater key={el.id} amount={el.amount} time={hr + ":" + min} cup={el.cup} />
        ))}
      </div>
      </>
  )
}


