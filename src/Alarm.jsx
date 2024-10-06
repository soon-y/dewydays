import React, { useState, useEffect } from 'react'

import ReactDOM from 'react-dom/client'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/material';
import { GLOBAL } from './Global'
import ToggleButton from '@mui/material/ToggleButton';
import useTheme from '@mui/material/styles/useTheme';
import Slider, { SliderThumb } from '@mui/material/Slider';
import NumInput from './mui/NumInput.jsx'
import { Link } from 'react-router-dom'


const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#7ED1FF',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 448 512"><path fill="${encodeURIComponent(
          '#7ED1FF',
        )}" d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg>')`,

      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#D9E1E5',
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: '#fff',},
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
        '#fff',
      )}" d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#8796A5',
    borderRadius: 20 / 2,
  },
}));

export default function Alarm(){
  const head = "Alarm"
  const [active, setActive] = useState(false);

  const theme = useTheme();
  const [value, setTab] = useState(0);
  const [selMon, setSelMon] = useState(false);
  const [selTue, setSelTue] = useState(false);
  const [selWed, setSelWed] = useState(false);
  const [selThu, setSelThu] = useState(false);
  const [selFri, setSelFri] = useState(false);
  const [selSat, setSelSat] = useState(false);
  const [selSun, setSelSun] = useState(false);


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
        <div className='margin-bottom center'>
          <FormControlLabel sx={{ color: 'white' }}
          control={<MaterialUISwitch sx={{ m: 1 }}
          onChange={(event, val) => setActive(val)} />}
          label= {<Typography sx={{ fontFamily: "Varela Round" }}>
            Notification </Typography>}
          labelPlacement="start"
          />
        </div>  

        <div className='margin-bottom center'>

          <Box sx={{ width: '100%' }}>

            <StyledTabs
              value={value}
              onChange={(event,val) => setTab(val)}
              aria-label="styled tabs example"
              sx={{ marginBottom: '20px' }}
            >
              <StyledTab disabled= {!active} label="Set Alarm periodically"/>
              <StyledTab disabled= {!active} label="Add time manually"/>

            </StyledTabs>

            <TabPanel value={value} index={0} dir={theme.direction} disabled= {!active}>
            <CustomToggle value="monday" aria-label="days" onClick={ () => setSelMon(!selMon) } selected = { selMon }> 
              M
            </CustomToggle>
            <CustomToggle value="tuesday" aria-label="days" onClick={ () => setSelTue(!selTue) } selected = { selTue }> 
              T
            </CustomToggle>
            <CustomToggle value="wednesday" aria-label="days" onClick={ () => setSelWed(!selWed) } selected = { selWed }> 
              W
            </CustomToggle>
            <CustomToggle value="thursday" aria-label="days" onClick={ () => setSelThu(!selThu) } selected = { selThu }> 
              T
            </CustomToggle>
            <CustomToggle value="friday" aria-label="days" onClick={ () => setSelFri(!selFri) } selected = { selFri }> 
              F
            </CustomToggle>
            <CustomToggle value="saturday" aria-label="days" onClick={ () => setSelSat(!selSat) } selected = { selSat }> 
              S
            </CustomToggle>
            <CustomToggle value="sunday" aria-label="days" onClick={ () => setSelSun(!selSun) } selected = { selSun }> 
              S
            </CustomToggle>

            <Typography sx={{ marginTop:'30px', color: 'white', fontFamily: GLOBAL.fontFamily }}>
              Time ragne
            </Typography>

            <CustomSlider
            sx = {{marginTop: '50px'}}
            slots={{ thumb: ThumbComponent }}
            getAriaLabel={(index) => (index === 0 ? 'Start' : 'End')}
            valueLabelDisplay="on"
            min={0}
            max={24}
            defaultValue={[9, 22]}
            />

            <Typography>Notify me every</Typography> 
            <NumInput
            label={ "alarm" }
            min={ 0 }
            max={ 60*5 }
            placeholder={ "" }
            unit = { "min" }
            keyName={ "alarm" }
          />   

            </TabPanel>
            
            <TabPanel value={value} index={1} dir={theme.direction} disabled= {!active}>
            Item Two
            </TabPanel>


          </Box>
        </div>

        
      </div>
    </div>
  )
}

function TabPanel(props) {
  const { children, value, index, disabled,...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      opacity = { 0 }
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, opacity: disabled == true? 0 : 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    width: '100%',
    backgroundColor: GLOBAL.backgroundNotSelect,
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    minWidth: '50%',
    fontFamily:  "Varela Round",
    backgroundColor: GLOBAL.background,
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    color: 'rgba(255, 255, 255, 0.5)',
    '&.Mui-selected': {
      color: '#fff',
      backgroundColor: GLOBAL.background,
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 1)',
    },
    '&.Mui-disabled': {
      display: 'none',
    },
  })
);

const CustomToggle = styled(ToggleButton)(({ theme }) => ({
  width: '50px',
  height: '50px',
  borderRadius: '50px',
  marginRight: '10px',
  marginLeft: '10px',
  fontFamily: GLOBAL.fontFamily,
  color: 'white',
  borderColor: 'white',
  '&.Mui-selected': {
    backgroundColor: 'white',
    color: GLOBAL.background,
    },
  })
);

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: 'white',
  height: 3,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
    '& .airbnb-bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 3,
  },
  '& .MuiSlider-rail': {
    color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
    opacity: theme.palette.mode === 'dark' ? undefined : 1,
    height: 3,
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1,
    fontSize: 16,
    background: 'unset',
    padding: 0,
    width: 36,
    height: 36,
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
  }
}));

function ThumbComponent(props) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}

ThumbComponent.propTypes = {
  children: PropTypes.node,
};
