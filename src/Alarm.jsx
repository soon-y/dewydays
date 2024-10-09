import React, { useState, useEffect } from 'react'
import { GLOBAL } from './Global'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Typography } from '@mui/material'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import useTheme from '@mui/material/styles/useTheme';
import Slider, { SliderThumb } from '@mui/material/Slider';
import NumInput from './mui/NumInput.jsx'
import { Link } from 'react-router-dom'

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
    <>
    <div className='bg'></div>
      <h1 className='head'>{head}</h1>
      
      <Link to='/'>
      <div className='bubble navPos close' key="close">
        <FontAwesomeIcon icon={faXmark} className='navIcon ' />
      </div>
      </Link>

      <div className='content center'>
        <div className='center'>
          <FormControlLabel sx={{ color: 'white' }}
          control={<MaterialUISwitch sx={{ m: 1 }}
          onChange={(event, val) => setActive(val)} />}
          label= {<Typography sx={{ 
            fontFamily: GLOBAL.fontFamily,
            fontWeight: '700',
          }}>
            Notification </Typography>}
          labelPlacement="start"
          />
        </div>  

        <Box sx={{ 
          paddingLeft: '1rem',
          paddingRight:'1rem',
          }}>
            
          <StyledTabs
            value={value}
            onChange={(event,val) => setTab(val)}
            aria-label="tabs"
          >
            <StyledTab disabled= {!active} index={0} label="Set Routines"/>
            <StyledTab disabled= {!active} index={1} label="Set Alarms"/>
          </StyledTabs>

          <TabPanel value={value} index={0} dir={theme.direction} disabled= {!active}>
            <p className='alarmText'> Repeat every </p>
            <ToggleButtonGroup
              exclusive
              aria-label="day selection"
              //value={alignment}
              //onChange={handleAlignment}
              style={{ 
                width: '100%',
                justifyContent: 'center',
              }}
            >
            <CustomToggle value="monday" aria-label="days" onClick={ () => setSelMon(!selMon) } selected = { selMon }> Mo
            </CustomToggle>
            <CustomToggle value="tuesday" aria-label="days" onClick={ () => setSelTue(!selTue) } selected = { selTue }> Tu
            </CustomToggle>
            <CustomToggle value="wednesday" aria-label="days" onClick={ () => setSelWed(!selWed) } selected = { selWed }> We
            </CustomToggle>
            <CustomToggle value="thursday" aria-label="days" onClick={ () => setSelThu(!selThu) } selected = { selThu }> Th
            </CustomToggle>
            <CustomToggle value="friday" aria-label="days" onClick={ () => setSelFri(!selFri) } selected = { selFri }> Fr
            </CustomToggle>
            <CustomToggle value="saturday" aria-label="days" onClick={ () => setSelSat(!selSat) } selected = { selSat }> Sa
            </CustomToggle>
            <CustomToggle value="sunday" aria-label="days" onClick={ () => setSelSun(!selSun) } selected = { selSun }> Su
            </CustomToggle>
            </ToggleButtonGroup>

            <p data-text="Time range" className='alarmText'> Time range </p>

            <TimeRangeSlider
            sx={{ marginTop: '3.6rem'}}
            slots={{ thumb: ThumbComponent }}
            getAriaLabel={(index) => (index === 0 ? 'Start' : 'End')}
            valueLabelDisplay="on"
            min={1}
            max={24}
            defaultValue={[9, 22]}
            />

            <p className='alarmText'> Notify me every </p>

            <NumInput
            label={ "alarm" }
            min={ 0 }
            max={ 60*5 }
            placeholder={ "" }
            unit = { "mins" }
            keyName={ "alarm" }
            />   

            <div className='btn'>
            <Link to='/'>
              <button>save</button>
            </Link>
            </div>
          </TabPanel>
          

          <TabPanel value={value} index={1} dir={theme.direction} disabled= {!active}> 
          <FontAwesomeIcon icon={faPlus} className='plus' />
          <ToggleButtonGroup
              exclusive
              aria-label="day selection"
              //value={alignment}
              //onChange={handleAlignment}
              style={{ 
                width: '100%',
                justifyContent: 'center',
                paddingTop: '1rem',
              }}
            >
            <CustomToggle value="monday" aria-label="days" onClick={ () => setSelMon(!selMon) } selected = { selMon }> Mo
            </CustomToggle>
            <CustomToggle value="tuesday" aria-label="days" onClick={ () => setSelTue(!selTue) } selected = { selTue }> Tu
            </CustomToggle>
            <CustomToggle value="wednesday" aria-label="days" onClick={ () => setSelWed(!selWed) } selected = { selWed }> We
            </CustomToggle>
            <CustomToggle value="thursday" aria-label="days" onClick={ () => setSelThu(!selThu) } selected = { selThu }> Th
            </CustomToggle>
            <CustomToggle value="friday" aria-label="days" onClick={ () => setSelFri(!selFri) } selected = { selFri }> Fr
            </CustomToggle>
            <CustomToggle value="saturday" aria-label="days" onClick={ () => setSelSat(!selSat) } selected = { selSat }> Sa
            </CustomToggle>
            <CustomToggle value="sunday" aria-label="days" onClick={ () => setSelSun(!selSun) } selected = { selSun }> Su
            </CustomToggle>
            </ToggleButtonGroup>

              <div className='alarmComp'>
                <div className='time'>13:00</div>
                <div className='tag'>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                </div>
                <FontAwesomeIcon icon={faMinus} className='minus'/>
              </div>

              <div className='alarmComp'>
                <div className='time'>13:00</div>
                <div className='tag'>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                </div>
                <FontAwesomeIcon icon={faMinus} className='minus'/>
              </div>

              <div className='alarmComp'>
                <div className='time'>13:00</div>
                <div className='tag'>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                </div>
                <FontAwesomeIcon icon={faMinus} className='minus'/>
              </div>

              <div className='alarmComp'>
                <div className='time'>13:00</div>
                <div className='tag'>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                </div>
                <FontAwesomeIcon icon={faMinus} className='minus'/>
              </div>

              <div className='alarmComp'>
                <div className='time'>13:00</div>
                <div className='tag'>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                </div>
                <FontAwesomeIcon icon={faMinus} className='minus'/>
              </div>

              <div className='alarmComp'>
                <div className='time'>13:00</div>
                <div className='tag'>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                </div>
                <FontAwesomeIcon icon={faMinus} className='minus'/>
              </div>

              <div className='alarmComp'>
                <div className='time'>13:00</div>
                <div className='tag'>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                </div>
                <FontAwesomeIcon icon={faMinus} className='minus'/>
              </div>

              <div className='alarmComp'>
                <div className='time'>13:00</div>
                <div className='tag'>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                </div>
                <FontAwesomeIcon icon={faMinus} className='minus'/>
              </div>
              


          </TabPanel>


        </Box>

        
      </div>
    </>
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
        <Box sx={{ 
          marginBottom: '1rem',
          paddingLeft: '1rem', 
          paddingRight: '1rem',
          paddingBottom: '2rem',
          opacity: disabled == true? 0 : 1, 
          backgroundColor: GLOBAL.backgroundDunkel,
          borderRadius: index == 0? '0 1rem 1rem 1rem' : '1rem 0 1rem 1rem',
          }}>
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
  },
  '& .MuiTabs-indicatorSpan': {
    width: '100%',
    backgroundColor: GLOBAL.backgroundDunkel,
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    minWidth: '50%',
    fontFamily:  GLOBAL.fontFamily,
    backgroundColor: GLOBAL.background,
    textTransform: 'none',
    fontSize: theme.typography.pxToRem(15),
    color: 'rgba(255, 255, 255, 0.8)',
    '&.Mui-selected': {
      color: '#fff',
      fontWeight: '700',
      backgroundColor: GLOBAL.backgroundDunkel,
      borderRadius: '1rem 1rem 0 0',
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
  margin: '0',
  width: '50px',
  height: '50px',
  fontFamily: GLOBAL.fontFamily,
  color: 'white',
  borderColor: 'rgba(255,255,255,0.4)',
  borderWidth: '0.2rem',
  background: GLOBAL.background,
  textTransform: 'capitalize',
  borderRadius: '1rem',
  '&.Mui-selected': {
    backgroundColor: GLOBAL.backgroundDunkel,
    color: 'white',
    },
  })
);

const TimeRangeSlider = styled(Slider)(({ theme }) => ({
  color: 'rgba(255,255,255,0.7)',
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: '1.5rem',
    width: '1.5rem',
    backgroundColor: '#fff',
    border: 'none',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
  },
  '& .MuiSlider-track': {
    height: '0.2rem',
  },
  '& .MuiSlider-rail': {
    color: 'rgba(255,255,255,0.5)',
    opacity: 1,
    height: '0.2rem',
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1,
    fontSize: '1.2rem',
    fontWeight: '700',
    fontFamily: GLOBAL.fontMain,
    background: 'rgba(255,255,255,0.8)',
    color: GLOBAL.backgroundDunkeler,
    padding: 0,
    width: '2.4rem',
    height: '2.4rem',
    borderRadius: '50% 50% 50% 0%',
    borderColor: 'rgba(255,255,255,1)',
    borderWidth:'1rem',
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
    </SliderThumb>
  );
}

ThumbComponent.propTypes = {
  children: PropTypes.node,
};

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
          GLOBAL.backgroundDunkel,
        )}" d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg>')`,
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
        '#aaa',
      )}" d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#8796A5',
    borderRadius: 20 / 2,
  },
}));