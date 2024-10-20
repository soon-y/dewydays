import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { GLOBAL } from '../Global'

export { MaterialUISwitch }

const MaterialUISwitch = styled(Switch)(({ svg }) => ({
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
        )}" d="${ svg }"/></svg>')`,        
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
      )}" d="${ svg }"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 1,
  },
}));