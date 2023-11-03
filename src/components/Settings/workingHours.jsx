import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

// day, setOpenening, setClosing
export default function WorkingHours(props) {
  // const [value2, setValue2] = React.useState(dayjs('2022-04-17T17:300'));
  
  const handle1 = (newValue) => {
    props.setOpening(newValue);
  }

  const handle2 = (newValue) => {
    props.setClosing(newValue);
  }

  const [validRange, setValidRange] = useState(true);
  const [valid, setValid] = useState(true);

  const open = props.opening;
  const close = props.closing;

  useEffect(() => {
    function validateHours()
    {
      if (!(open) && !(close)) // in this day the business does not work
      {
        setValid(true);
        setValidRange(true);
        props.setValidFlag(true);
      }
      else if (open && close)
      {
        if (!(open.isValid() && close.isValid())) // not valid hours
        {
          setValid(false);
          setValidRange(true);
          props.setValidFlag(false);
        }
        else if(open.isAfter(close, 'minute')) // not valid hours range
        {
          setValidRange(false);
          setValid(true);
          props.setValidFlag(false);
        }
        else // valid hours range
        {
          setValidRange(true);
          setValid(true);
          props.setValidFlag(true);
        }
      }
      else // at least one of the hour fields (open, close) is empty
      {
        if(open && !open.isValid()) // open is notempty and npt valid
        {
          setValid(false);
          setValidRange(true);
          props.setValidFlag(false);
        }
        else if(close && !close.isValid()) // close is not empty and not valid
        {
          setValid(false);
          setValidRange(true);
          props.setValidFlag(false);
        }
        else // both are valid, but only one is not empty
        {
          setValidRange(false);
          setValid(true);
          props.setValidFlag(false);
        }
      }
    }
    validateHours();
  }, [props.opening, props.closing, props.setValidFlag, close, open, props]);


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <Box gap={2} display= 'grid' gridTemplateColumns= '1fr 3fr 3fr' paddingTop={2} paddingRight={2} paddingLeft={2} sx={{direction: 'rtl'}} direction= 'row' alignItems= 'center'>
        <Typography variant='h5' color= 'rgb(2, 0, 99)' fontSize={20} fontWeight= {540}>{props.day}:</Typography>
        <TimeField
          direction= 'rtl'
          label="פתיחה"
          value={props.opening}
          onChange={handle1}
          format='HH:mm'
          sx={{
          "& label":{left: "unset",
          right: "1.75rem",
          transformOrigin: "right"},
          "& legend": {
            textAlign: "right",
          }}}
        />
        <TimeField
          label="סגירה"
          value={props.closing}
          onChange={handle2}
          format='HH:mm'
          sx={{
          "& label":{left: "unset",
          right: "1.75rem",
          transformOrigin: "right"},
          "& legend": {
            textAlign: "right",
          }}}
        />
      </Box>
      {validRange ? null :
      <div style={{height:0}}>
      <Typography variant='body2' color='error'>
        נא להזין טווח שעות תקין
      </Typography>
      </div>}
      {valid ? null :
      <div style={{height:0}}>
      <Typography variant='body2' color='error'>
        נא להזין שעה תקינה
      </Typography>
      </div>}
    </LocalizationProvider>
  );
}