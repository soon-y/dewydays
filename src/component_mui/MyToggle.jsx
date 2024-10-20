import React, { forwardRef, useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from '@mui/material/ToggleButtonGroup';
import { GLOBAL } from '../Global'


export default function MyToggle({ label, values, keyName }) {
  const [gender, setGender] = useState(values[0]);

  return<>
          <StyledToggleButtonGroup
            color="primary"
            value={ gender }
            exclusive
            //onChange={(event, val) => setGender(val)}
            aria-label= { label }
          >

            {/* //to do: mapping
          <ToggleButton value="male">{ values[0] }</ToggleButton>
          <ToggleButton value="female">Female</ToggleButton>
          <ToggleButton value="undefined">Other</ToggleButton> */}


          { [...Array(values)].map((value, index) =>
                <ToggleButton
                  key={ index }
                  value = { value }>
                    { value }
                  </ToggleButton>
            ) }



          </StyledToggleButtonGroup>
  </>
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: theme.spacing(0.5),
    border: 0,
    borderRadius: '55px',
    fontFamily: GLOBAL.fontFamily,
    color: "white",
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: 0,
    },
    [`&.${toggleButtonGroupClasses.selected}`]: {
      backgroundColor: GLOBAL.background,
    },
  },
  [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
    {
      marginLeft: 0,
      borderLeft: '1px solid transparent',
    },
}));