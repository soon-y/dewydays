import React, { forwardRef } from 'react'
import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import { GLOBAL } from '../Global'

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

const StyledInputRoot = styled('div')(
  ( ) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  color: '#9DA8B7';
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;`,
);

const StyledInput = styled('input')(
  () => `
  font-size: 0.875rem;
  font-family: ${ GLOBAL.fontFamily };
  font-weight: 400;
  line-height: 1.375;
  color: #000 ;
  background: #fff;
  border: 1px solid #DAE2ED;
  box-shadow: 0px 2px 4px rgba(0,0,0, 0.05);
  border-radius: 8px;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:focus {
    border-color: ${ GLOBAL.strokeColor };
  }

  &:focus-visible {
    outline: 0;
  }
  
  &:disabled {
    color: #6B7A90;
    background: #DAE2ED;
  }
`,
);

const StyledButton = styled('button')(
  () => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 999px;
  border-color: #DAE2ED;
  background: #E5EAF2;
  color: #1C2025;
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
    border-color: #DAE2ED;
    color: #F3F6F9;
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }`,
);

const InputAdornment = styled('div')(
  () => `
  font-family: ${ GLOBAL.fontFamily };
  color: #6B7A90;
  margin-left: 0.2rem;
  margin-right: 0.8rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  grid-row: 1/3;
  };`,
);

export { NumberInput, InputAdornment };