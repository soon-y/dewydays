import React, { forwardRef, useState, useEffect } from 'react'
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel';
import { GLOBAL } from '../Global'
import ActiveLocalStorage from '../ActiveLocalStorage';

export default function ActiveSwitch({ label, keyName }) {
  const [value, set] = ActiveLocalStorage();

  return<>
    <FormControlLabel sx={{ 
      color: 'white',
      margin: 0,
    }}
      control={
        <MaterialUISwitch sx={{ m: 0 }}
        onChange={(event, val) => set(val)} 
        />}
      label= {<Typography sx={{ 
        fontFamily: GLOBAL.fontFamily, 
        fontWeight: 700,
        marginRight: '0.8rem',
        }}>
        { label } </Typography>}
      labelPlacement="start"
    />
  </>
}

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    transform: 'translateX(6px)',

    '&.Mui-checked': {
      color: '#7ED1FF',
      transform: 'translateX(24px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 448 512"><path fill="${encodeURIComponent(
          GLOBAL.backgroundDunkel,
        )}" d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288l111.5 0L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7l-111.5 0L349.4 44.6"/></svg>')`,        
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: GLOBAL.backgroundDunkeler,
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: ' #e6f7ff'},
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#C4C4C4',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 448 512"><path fill="${encodeURIComponent(
        '#eaeaea',
      )}" d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288l111.5 0L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7l-111.5 0L349.4 44.6"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 1,
  },
}));