import React, { useState } from 'react'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Component } from 'react';
import { Link } from 'react-router-dom'

//https://react.dev/reference/react/Component

class CompWater extends Component {
  render() {
    return <>
    <div style={{
      marginLeft: '30px',
      width: '8px',
      height:'20px',
      backgroundColor: '#26B3FA',
    }}></div>

    <div style={{
      width: "auto", 
      height: '50px',
      display: 'block',
      background: 'white',
      borderRadius: '50px',
      border: '2px solid #26B3FA',
      lineHeight: '300%',
      padding: '0 20px',
      color: '#18A0E5',
      }}>{this.props.amount} ml
      
      <span style={{
        float: 'right', 
      }}      
        > 
        {this.props.time}
        &nbsp;&nbsp;
        <FontAwesomeIcon icon={faXmark}/>
        </span>
      </div>
      </>
  }
}

class HeadComp extends Component {
  render() {
    return <div style={{
      width: "50%", 
      height: '40px',
      display: 'block',
      backgroundColor: '#26B3FA',
      color: '#fff',
      borderRadius: '10px',
      lineHeight: '250%',
      padding: '0 20px',
      marginTop: '20px'
      }}>

      <span style={{
        float: 'left', 
      }}      
        > 
        {this.props.total} &nbsp;&nbsp;
        </span>

        <span style={{
        float: 'right', 
      }}      
        > 
        {this.props.date} &nbsp;&nbsp;
        <FontAwesomeIcon icon={faPlus} />
        </span>
        
        
        </div>
  }
}

export default function Timeline(){  
  const head = "Timeline"

  const d = new Date()
  let year = d.getFullYear()
  let month = d.getMonth()+1
  let day = d.getDate()
  let hr = d.getHours()
  let min = d.getMinutes()

  const array = [300,200,100,500]

  return(
    <div className='bg'>
      <h1 className='head stroke'>{head}</h1>
      <h1 className='head'>{head}</h1>
      
      <Link to='/'>
      <div className='bubble navPos'>
        <FontAwesomeIcon icon={faXmark} className='navIcon' />
      </div>
      </Link>

      <div className='content'>
      <HeadComp 
        date={day +" "+ month +" "+ year} 
        total={"1000 ml"}
        />
      {array.map((val) => (
          <CompWater key={array.id} amount={val} time={hr + ":" + min} />
        ))}
      </div>
    </div>
  )
}


