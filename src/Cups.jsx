import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark} from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'
//import '01.png' from 




export default function Weather(){
  
  const head = "Cups"
  const [active, setActive] = useState(false);


  return(
    <div className='bg'>
      <h1 className='head stroke'>{head}</h1>
      <h1 className='head'>{head}</h1>
      
      <Link to='/'>
      <div className='bubble close'>
        <FontAwesomeIcon icon={faXmark} className='btn' />
      </div>
      </Link>

      <div className='content'>


      <div className='margin-bottom center'>

      </div>


       
      </div>
    </div>
  )
}


