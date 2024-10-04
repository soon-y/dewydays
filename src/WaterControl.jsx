import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlassWater,faPlus } from '@fortawesome/free-solid-svg-icons'
import { Slider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom'

export default function WaterContorl(){

  function valuetext(value) {
    return `${value}°C`;
  }
  const [checked, setChecked] = useState(false);
  const [angle, setAngle] = useState(0);

  const checking = () => {
    setChecked(state => !state)
    setAngle(a => a + 180);
  }

  const WaterSlider = styled(Slider)({
    color: 'rgba(255,255,255,0.8)',
    height: 8,
    '& .MuiSlider-markLabel': {
      color: 'rgba(255,255,255,1)',
      fontSize: 20,
    },
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: 'rgba(255,255,255,1)',
      border: '2px solid currentColor',
      boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
      '&::before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 20,
      background: 'unset',
      padding: 0,
      width: 60,
      height: 60,
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
      <div className='setWater'
        
      >
        <WaterSlider
          aria-label="Temperature"
          defaultValue={30}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          shiftStep={30}
          step={10}
          min={10}
          max={110}
          marks={marks}
        />

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


