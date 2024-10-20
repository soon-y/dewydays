import ToggleButton from '@mui/material/ToggleButton';
import { styled } from '@mui/material/styles';
import { GLOBAL } from '../Global'

export { Toggle }

const Toggle = styled(ToggleButton)(() => ({
  margin: '0',
  width: '14.2%',
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
  '&.Mui-selected:hover': {
    backgroundColor: GLOBAL.backgroundDunkel,
    },
  '&:hover': {
    background: GLOBAL.background,
    },
  })
);