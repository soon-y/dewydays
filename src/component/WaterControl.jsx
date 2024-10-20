import React, { useState } from 'react'
import { GLOBAL } from '../Global'
import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlassWater,faPlus } from '@fortawesome/free-solid-svg-icons'
import { Slider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom'

export default function WaterContorl(){

  const [checked, setChecked] = useState(false);
  const [angle, setAngle] = useState(0);

  function valuetext(value) {
  return `${value}°C`;
}

  const WaterSlider = styled(Slider)({
    color: 'rgba(255,255,255,0.8)',
    height: '0.2rem',
    '& .MuiSlider-markLabel': {
      color: 'rgba(255,255,255,1)',
      fontSize: '1rem',
      right: '-3rem',
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
      width: '2.4rem',
      height: '2.4rem',
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
      value: 100,
      label: '100',
    },
  ]

  return(
    <>
      <div className='setWater'>
        <WaterSlider
          aria-label="Intake"
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          step={10}
          min={0}
          marks={marks}
          defaultValue={ 0 }
        />

        <div className='empty'></div>

        <div className='bubble'
        style={{

        }}>
          <FontAwesomeIcon icon={faPlus} className='navIcon' />
        </div>
        
        <Link to='/Cups'>
        <div className='bubble'
                style={{

                }}>
          <FontAwesomeIcon icon={faGlassWater} className='navIcon' />
        </div>
        </Link>

      </div>
    </>
  )
}


