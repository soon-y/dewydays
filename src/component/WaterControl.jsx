import React, { useState } from 'react'
import { GLOBAL } from '../Global'
import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlassWater,faPlus } from '@fortawesome/free-solid-svg-icons'
import { Slider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom'

export default function WaterContorl(){
  let src = 'cups/' + GLOBAL.cupNum + '.png'

  const WaterSlider = styled(Slider)({
    color: 'rgba(255,255,255,0.8)',
    height: '0.2rem',
    '& .MuiSlider-markLabel': {
      color: 'rgba(255,255,255,1)',
      fontSize: '1rem',
      right: GLOBAL.cupAmount[GLOBAL.cupNum] > 1000? '-7rem' : '-5.8rem',
      top: '1.8rem',
      fontFamily: GLOBAL.fontFamily,
    },
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: '1.4rem',
      width: '1.4rem',
      backgroundColor: 'rgba(255,255,255,1)',
      border: 'none',
      boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
      '&::before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      fontFamily: GLOBAL.fontFamily,
      lineHeight: 1.2,
      fontSize: '1rem',
      background: 'unset',
      padding: 0,
      width: '3rem',
      height: '3rem',
      borderRadius: '50% 50% 50% 0',
      backgroundColor: 'rgba(255,255,255,0.2)',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&::before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });

  const marks = [
    {
      value: GLOBAL.cupAmount[GLOBAL.cupNum],
      label: GLOBAL.cupAmount[GLOBAL.cupNum] + 'ml',
    },
  ]

  return(
    <>
      <div className='setWater'>
        <WaterSlider
          aria-label="Intake"
          valueLabelDisplay="auto"
          step={5}
          min={0}
          max={ GLOBAL.cupAmount[GLOBAL.cupNum] }
          marks={ marks }
          defaultValue={ 0 }
        />

        <div className='empty'></div>

        <div className='bubble'>
          <FontAwesomeIcon icon={faPlus} className='navIcon' />
        </div>
        
        <Link to='/Cups'>
        <div className='bubble'>
          <img src={ src } style={{ height: '100%'}}/>
        </div>
        </Link>

      </div>
    </>
  )
}


