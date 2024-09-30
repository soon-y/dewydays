import React, { forwardRef, useState, useEffect } from 'react'
import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import { GLOBAL } from '../Global'
import ActiveLocalStorage from '../ActiveLocalStorage';

export default function NumInput({ keyName, label, min, max, placeholder, unit }) {
  let nbsp = "\u00A0"

  const [value, set] = useState(0);
  const [active, setActive] = ActiveLocalStorage();

  useEffect(() => {
    localStorage.setItem( keyName , JSON.stringify(value))
  }, [value]);

  return<>
    <NumberInput 
      aria-label={ label }
      min={ min } 
      max={ max } 
      onChange={(event, val) => set(val)}
      placeholder= { placeholder }
      endAdornment={<InputAdornment> {unit.length>2? unit : unit + nbsp + nbsp } </InputAdornment>} 
      disabled={ label == "exercise" ? !active : false }
      step={ label == "exercise" ? 5 : 1}
      />  
  </>

}

const NumberInput = forwardRef(function CustomNumberInput(props, ref) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: <AddIcon fontSize="small" />,
          className: 'increment',
        },
        decrementButton: {
          children: <RemoveIcon fontSize="small" />,
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

const blue = {
  100: '#daecff',
  200: '#b6daff',
  300: '#66b2ff',
  400: '#3399ff',
  500: '#007fff',
  600: '#0072e5',
  700: '#0059B2',
  800: '#004c99',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const StyledInputRoot = styled('div')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  color: '${theme.palette.mode === 'dark' ? grey[300] : grey[500]}';
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`,
);

const StyledInput = styled('input')(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: ${ GLOBAL.fontFamily };
  font-weight: 400;
  line-height: 1.375;
  color: ${ '#000' };
  background: ${ '#fff' };
  border: 1px solid ${ grey[200] };
  box-shadow: 0px 2px 4px ${'rgba(0,0,0, 0.05)'};
  border-radius: 8px;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
  }

  &:focus-visible {
    outline: 0;
  }
  
  &:disabled {
    color: ${grey[600]};
  }
`,
);

const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 999px;
  border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  width: 32px;
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: ${ GLOBAL.hover };
    border-color: ${ GLOBAL.hover };
    color: ${grey[50]};
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`,
);

const InputAdornment = styled('div')(
  ({ theme }) => `
  font-family: "Varela Round";
  color: ${grey[600]};
  margin: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  grid-row: 1/3;
};
`,
);