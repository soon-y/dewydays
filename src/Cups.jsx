import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark} from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'

export default function Weather(){
  
  const head = "Cups"
  const [active, setActive] = useState(false);


  return(
    <div className='bg gradient'>
      <h1 className='head'>{head}</h1>
      
      <Link to='/'>
      <div className='bubble navPos'>
        <FontAwesomeIcon icon={faXmark} className='navIcon' />
      </div>
      </Link>

      <div className='content'>


      <div className='cups'>
        <img className='notSelected' src='/cups/01.png' />
        <img className='notSelected' src='/cups/02.png' />
        <img className='notSelected' src='/cups/03.png' />
        <img className='notSelected' src='/cups/04.png' />
      </div>

      <div className='cupAmount'>

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


