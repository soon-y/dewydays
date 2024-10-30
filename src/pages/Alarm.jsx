import React, { useEffect, useState, useRef } from 'react'
import { animated, useSpring, useTrail } from '@react-spring/web'
import { Link } from 'react-router-dom'
import { GLOBAL } from '../Global.js'
import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { styled } from '@mui/material/styles';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Typography } from '@mui/material'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/material';
import { SliderThumb } from '@mui/material/Slider';
import useTheme from '@mui/material/styles/useTheme';
import { CustomSlider } from '../component_mui/Slider.jsx'
import { MaterialUISwitch } from '../component_mui/Switch.jsx'
import { NumberInput, InputAdornment } from '../component_mui/NumInput.jsx'
import { Toggle } from '../component_mui/Toggle.jsx'

export default function Alarm(){
  const head = "Alarm"
  const svg = "M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"
  const [alarmDataFiltered, setAlarmData] = useState(GLOBAL.alarmData);
  const [index, setIndex] = useState(true);
  const [active, setActive] = useState(GLOBAL.notification)
  const [move, setMove] = useState(100);
  const alarmComp = useRef([])
  const alarmCompTime = useRef([])

  const theme = useTheme()
  const [value, setTab] = useState(GLOBAL.tabNum)
  const [interval, setInterval] = useState(GLOBAL.interval)
  const [timeRange, setTimeRange] = useState([GLOBAL.timeRangeStart,GLOBAL.timeRangeEnd])
  const [repeatMon, setRepeatMon] = useState(GLOBAL.repeatMon)
  const [repeatTue, setRepeatTue] = useState(GLOBAL.repeatTue)
  const [repeatWed, setRepeatWed] = useState(GLOBAL.repeatWed)
  const [repeatThu, setRepeatThu] = useState(GLOBAL.repeatThu)
  const [repeatFri, setRepeatFri] = useState(GLOBAL.repeatFri)
  const [repeatSat, setRepeatSat] = useState(GLOBAL.repeatSat)
  const [repeatSun, setRepeatSun] = useState(GLOBAL.repeatSun)

  const [filterMon, setFilterMon] = useState(GLOBAL.filterMon)
  const [filterTue, setFilterTue] = useState(GLOBAL.filterTue)
  const [filterWed, setFilterWed] = useState(GLOBAL.filterWed)
  const [filterThu, setFilterThu] = useState(GLOBAL.filterThu)
  const [filterFri, setFilterFri] = useState(GLOBAL.filterFri)
  const [filterSat, setFilterSat] = useState(GLOBAL.filterSat)
  const [filterSun, setFilterSun] = useState(GLOBAL.filterSun)

  const [selMon, setSelMon] = useState(false)
  const [selTue, setSelTue] = useState(false)
  const [selWed, setSelWed] = useState(false)
  const [selThu, setSelThu] = useState(false)
  const [selFri, setSelFri] = useState(false)
  const [selSat, setSelSat] = useState(false)
  const [selSun, setSelSun] = useState(false)

  const updateNotification = (val) => {
    setActive(val)
    GLOBAL.notification = val
  }

  const slide = useSpring({
    transform: `translateX(${move}vw)`,
  })
  let hour = 0
  let min = 0
  let hourArray = []
  let minArray = []
  let timeScrollHour = useRef()
  let timeScrollMin = useRef()
  let alarmAddition = useRef()
  let nbsp = "\u00A0"

  for(let i = 0; i < 2; i++){
    hourArray.push(nbsp)
    minArray.push(nbsp)
  }

  while (hour < 24) {
    hourArray.push((hour < 10) ? '0' + hour : hour)
    hour++
  }
  while (min < 60) {
    minArray.push((min < 10) ? '0' + min : min)
    min++
  }

  function getFinalNum() {
    const finalHour = Math.round(((timeScrollHour.current.scrollTop)/32))
    const finalMin = Math.round(((timeScrollMin.current.scrollTop)/32))

    let tag= []
    if(selMon) tag.push("Mon")
    if(selTue) tag.push("Tue")
    if(selWed) tag.push("Wed")
    if(selThu) tag.push("Thu")
    if(selFri) tag.push("Fri")
    if(selSat) tag.push("Sat")
    if(selSun) tag.push("Sun")
    let d = { hour: finalHour, min: finalMin, tags: tag }
    GLOBAL.alarmData.push(d)

    setMove(100)
    setSelMon(false)
    setSelTue(false)
    setSelWed(false)
    setSelThu(false)
    setSelFri(false)
    setSelSat(false)
    setSelSun(false)
  }

  useEffect(()=> {
    const d = new Date()
    const hour = d.getHours()
    const min = d.getMinutes()
    timeScrollHour.current.scrollTop = hour * 32
    timeScrollMin.current.scrollTop = min * 32
  }, [move])

  const saveRoutine = () =>{
    GLOBAL.repeatMon = repeatMon
    GLOBAL.repeatTue = repeatTue
    GLOBAL.repeatWed = repeatWed
    GLOBAL.repeatThu = repeatThu
    GLOBAL.repeatFri = repeatFri
    GLOBAL.repeatSat = repeatSat
    GLOBAL.repeatSun = repeatSun
    GLOBAL.interval = interval
    GLOBAL.timeRangeStart = timeRange[0]
    GLOBAL.timeRangeEnd = timeRange[1]
  }

  const saveTab = (val) =>{
    setTab(val)
    GLOBAL.tabNum = val
  }

  const deleteAlarm = (val) =>{
    setIndex(!index)
    GLOBAL.alarmData.splice(val,1)
  }

  useEffect(() => {
    const d = new Date()
    const hour = d.getHours()
    const min = d.getMinutes()

    if(alarmComp.current.length != 0){
      GLOBAL.filterMon = filterMon
      GLOBAL.filterTue = filterTue
      GLOBAL.filterWed = filterWed
      GLOBAL.filterThu = filterThu
      GLOBAL.filterFri = filterFri
      GLOBAL.filterSat = filterSat
      GLOBAL.filterSun = filterSun
      for (const i in alarmDataFiltered) {
        alarmComp.current[i].style.display = 'none'
    }

    if(filterMon){
      for (const i in alarmDataFiltered) {
        if (alarmDataFiltered[i].tags.includes("Mon")){
          alarmComp.current[i].style.display = 'block'
        }
      }
    }
    if (filterTue) {
      for (const i in alarmDataFiltered) {
        if (alarmDataFiltered[i].tags.includes("Tue")){
          alarmComp.current[i].style.display = 'block'
        }
      }
    }
    if (filterWed) {
      for (const i in alarmDataFiltered) {
        if (alarmDataFiltered[i].tags.includes("Wed")){
          alarmComp.current[i].style.display = 'block'
        }
      }
    }
    if (filterThu) {
      for (const i in alarmDataFiltered) {
        if (alarmDataFiltered[i].tags.includes("Thu")){
          alarmComp.current[i].style.display = 'block'
        }
      }
    }
    if (filterFri) {
      for (const i in alarmDataFiltered) {
        if (alarmDataFiltered[i].tags.includes("Fri")){
          alarmComp.current[i].style.display = 'block'
        }
      }
    }
    if (filterSat) {
      for (const i in alarmDataFiltered) {
        if (alarmDataFiltered[i].tags.includes("Sat")){
          alarmComp.current[i].style.display = 'block'
        }
      }
    }
    if (filterSun) {
      for (const i in alarmDataFiltered) {
        if (alarmDataFiltered[i].tags.includes("Sun")){
          alarmComp.current[i].style.display = 'block'
        }
      }
    }}
    if (!filterMon && !filterTue && !filterWed && !filterThu && !filterFri && !filterSat && !filterSun)
    for (const i in alarmDataFiltered) {
      if (alarmDataFiltered[i].tags.length == 0){
        alarmComp.current[i].style.display = 'block'
        if(hour >= alarmDataFiltered[i].hour && min >= alarmDataFiltered[i].min){
          alarmCompTime.current[i].style.color = GLOBAL.backgroundHell
        }else{
          alarmCompTime.current[i].style.color = 'white'
        }
      }
    }
  }, [filterMon, filterTue, filterWed, filterThu, filterFri, filterSat, filterSun, index, move]);

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
          <FormControlLabel sx={{ 
            color: 'white',
            marginBottom: '1rem',
            }}
          control={
            <MaterialUISwitch sx={{ m: 0 }}
            onChange={(event, val) => updateNotification(val)} 
            svg = { svg }
            checked = {GLOBAL.notification}
            />}
          label= {
          <Typography sx={{ 
            fontFamily: GLOBAL.fontFamily, 
            fontWeight: 700,
            marginRight: '0.8rem',
            }}>
            { "Notification" } 
          </Typography>}
          labelPlacement="start"
          />
        </div>  

        <Box sx={{ 
          paddingLeft: '1rem',
          paddingRight:'1rem',
          }}>
            
          <StyledTabs
            value={value}
            onChange={(event,val) => saveTab(val)}
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
              style={{ 
                width: '100%',
                justifyContent: 'center',
              }}
            >
            <Toggle value="monday" aria-label="days" onClick={ () => setRepeatMon(!repeatMon) } selected = { repeatMon }> Mo
            </Toggle>
            <Toggle value="tuesday" aria-label="days" onClick={ () => setRepeatTue(!repeatTue) } selected = { repeatTue }> Tu
            </Toggle>
            <Toggle value="wednesday" aria-label="days" onClick={ () => setRepeatWed(!repeatWed) } selected = { repeatWed }> We
            </Toggle>
            <Toggle value="thursday" aria-label="days" onClick={ () => setRepeatThu(!repeatThu) } selected = { repeatThu }> Th
            </Toggle>
            <Toggle value="friday" aria-label="days" onClick={ () => setRepeatFri(!repeatFri) } selected = { repeatFri }> Fr
            </Toggle>
            <Toggle value="saturday" aria-label="days" onClick={ () => setRepeatSat(!repeatSat) } selected = { repeatSat }> Sa
            </Toggle>
            <Toggle value="sunday" aria-label="days" onClick={ () => setRepeatSun(!repeatSun) } selected = { repeatSun }> Su
            </Toggle>
            </ToggleButtonGroup>

            <p data-text="Time range" className='alarmText'> Time range </p>

            <CustomSlider
              sx={{ marginTop: '3.6rem'}}
              slots={{ thumb: ThumbComponent }}
              getAriaLabel={(index) => (index === 0 ? 'Start' : 'End')}
              valueLabelDisplay="on"
              min={1}
              max={24}
              defaultValue={[GLOBAL.timeRangeStart, GLOBAL.timeRangeEnd]}
              onChange={(event, val) => setTimeRange(val)} 
            />

            <p className='alarmText'> Notify me every </p>

            <NumberInput 
              aria-label={ "alarm" }
              min={ 0 } 
              max={ 60 * 5 } 
              value={ GLOBAL.interval }
              onChange={(event, val) => setInterval(val)}
              placeholder= { "" }
              endAdornment={<InputAdornment> { "mins" } </InputAdornment>}
              disabled= { repeatMon||repeatTue||repeatWed||repeatThu||repeatFri||repeatSat||repeatSun ? false : true }
            />  

            <div className='btn'>
            <Link to='/'>
              <button onClick={ saveRoutine() }>SAVE</button>
            </Link>
            </div>
          </TabPanel>
          
          <TabPanel value={value} index={1} dir={theme.direction} disabled= {!active}> 
            <ToggleButtonGroup
                exclusive
                aria-label="day selection"
                style={{ 
                  width: '100%',
                  justifyContent: 'center',
                  paddingTop: '1rem',
                  paddingBottom: '0.6rem',
                }}
              >
              <Toggle value="monday" aria-label="days" onClick={ () => setFilterMon(!filterMon) } selected = { filterMon }> Mo
              </Toggle>
              <Toggle value="tuesday" aria-label="days" onClick={ () => setFilterTue(!filterTue) } selected = { filterTue }> Tu
              </Toggle>
              <Toggle value="wednesday" aria-label="days" onClick={ () => setFilterWed(!filterWed) } selected = { filterWed }> We
              </Toggle>
              <Toggle value="thursday" aria-label="days" onClick={ () => setFilterThu(!filterThu) } selected = { filterThu }> Th
              </Toggle>
              <Toggle value="friday" aria-label="days" onClick={ () => setFilterFri(!filterFri) } selected = { filterFri }> Fr
              </Toggle>
              <Toggle value="saturday" aria-label="days" onClick={ () => setFilterSat(!filterSat) } selected = { filterSat }> Sa
              </Toggle>
              <Toggle value="sunday" aria-label="days" onClick={ () => setFilterSun(!filterSun) } selected = { filterSun }> Su
              </Toggle>
            </ToggleButtonGroup>

            {alarmDataFiltered.map((el, index) => (
              <div key={ index } ref={(element) => alarmComp.current[index] = element} style={{ borderBottom: '0.1rem solid '+ GLOBAL.backgroundHell}}>  
                <div className='time' ref={(element) => alarmCompTime.current[index] = element} style ={{
                    textAlign: 'left',
                    fontFamily: GLOBAL.fontFamily,
                    fontWeight: 400,
                    fontSize: '2.4rem',
                    color: 'white',
                }}>{ el.hour < 10? '0'+ el.hour : el.hour }:{ el.min < 10? '0'+ el.min : el.min}</div>
                <div className='alarmTag' style={{ height: '1rem'}}>
                {el.tags.map((x, index) => (
                  <span key={ index }>{ x }</span>
                ))}
                <FontAwesomeIcon icon={faMinus} className='minus' onClick={ (e) => deleteAlarm(index) }/>
                </div>
              </div>
            ))}
            <FontAwesomeIcon icon={faPlus} className='plus' onClick={()=> setMove(0)}/>
          </TabPanel>
        </Box>     
      </div>

      <animated.div className = 'bg gradient addAlarm' style ={ slide } ref= { alarmAddition } >
      <div className='bubble navPos close' key="close"  onClick={ () => setMove(100)}>
        <FontAwesomeIcon icon={faXmark} className='navIcon' />
      </div>
        <div className='content' style={{
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
        <h1 className='head' style={{ 
          transform: 'translate(-50%, -150%)'
          }}> Add Alarm </h1>
          <ToggleButtonGroup
              exclusive
              aria-label="day selection"
              style={{ 
                position: 'relative',
                left: '50%',
                transform: 'translate(-50%, 0)',
                width: '80%',
                justifyContent: 'center',
                paddingTop: '1rem',
                paddingBottom: '0.6rem',
              }}
            >
            <Toggle value="monday" aria-label="days" onClick={ () => setSelMon(!selMon) } selected = { selMon }> Mo
            </Toggle>
            <Toggle value="tuesday" aria-label="days" onClick={ () => setSelTue(!selTue) } selected = { selTue }> Tu
            </Toggle>
            <Toggle value="wednesday" aria-label="days" onClick={ () => setSelWed(!selWed) } selected = { selWed }> We
            </Toggle>
            <Toggle value="thursday" aria-label="days" onClick={ () => setSelThu(!selThu) } selected = { selThu }> Th
            </Toggle>
            <Toggle value="friday" aria-label="days" onClick={ () => setSelFri(!selFri) } selected = { selFri }> Fr
            </Toggle>
            <Toggle value="saturday" aria-label="days" onClick={ () => setSelSat(!selSat) } selected = { selSat }> Sa
            </Toggle>
            <Toggle value="sunday" aria-label="days" onClick={ () => setSelSun(!selSun) } selected = { selSun }> Su
            </Toggle>
          </ToggleButtonGroup>

          <div className='timePickerWrapper' style={{
            display: 'grid',
            gridAutoFlow: 'column',
            width: '100%',
            margin: 'auto',
            marginTop: '1rem',
          }}>
            <div className='selection' style={{
              background: GLOBAL.background,
              height: '2rem',
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
            }}><p style={{
              fontWeight: '900',
              color: 'white',
              fontSize: '1.2rem',
              textAlign: 'center',
              lineHeight: 1.5
            }}>:</p></div>
            <div className='timePicker' ref= { timeScrollHour }>
            {hourArray.map((el, index) => (
            <p key={ index } className='timeArray' style={{
              textAlign: 'right',
            }}>{el} </p>
            ))}
            </div>

            <div className='timePicker' ref= { timeScrollMin }>
            {minArray.map((el, index) => (
            <p key={ index } className='timeArray'style={{
              textAlign: 'left',
            }}>{el}</p>
            ))}
            </div>
          </div>

          <div className='btn center' onClick={ ()=> getFinalNum() }> 
            <button>ADD</button>
          </div>
        </div>       
      </animated.div>  
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
          padding: '0 1rem 2rem 1rem ',
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
  () => ({
    minWidth: '50%',
    fontFamily:  GLOBAL.fontFamily,
    backgroundColor: GLOBAL.background,
    textTransform: 'none',
    fontSize: '1rem',
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

