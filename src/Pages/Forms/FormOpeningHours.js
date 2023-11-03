import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, InputAdornment, IconButton } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { ValidateWorkingHours } from '../../components/validations';

function FormOpeningHours({ values, setFormValue, setIsFormOpeningHoursValid }) {
  const [openingTimesNew, setOpeningTimesNew] = useState(values.opening_hours || Array(7).fill(null));
  const [closingTimesNew, setClosingTimesNew] = useState(values.closing_hours || Array(7).fill(null));
  const [validSundayHours, setValidSundayHours] = useState(true);
  const [validMondayHours, setValidMondayHours] = useState(true);
  const [validTuesdayHours, setValidTuesdayHours] = useState(true);
  const [validWednesdayHours, setValidWednesdayHours] = useState(true);
  const [validThursdayHours, setValidThursdayHours] = useState(true);
  const [validFridayHours, setValidFridayHours] = useState(true);
  const [validSaturdayHours, setValidSaturdayHours] = useState(true);

  const formValid =
    validSundayHours &&
    validMondayHours &&
    validTuesdayHours &&
    validWednesdayHours &&
    validThursdayHours &&
    validFridayHours &&
    validSaturdayHours;

  useEffect(() => {
    setIsFormOpeningHoursValid(formValid);
  }, [
    setIsFormOpeningHoursValid,
    formValid
  ]);

  const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

  const handleSetOpeningTimeNew = (index, newValue) => {
    const inputTime = newValue;
    const newOpeningTime = [...openingTimesNew];
    newOpeningTime[index] = inputTime;
    setOpeningTimesNew(newOpeningTime);
    setFormValue('opening_hours', newOpeningTime);
  };

  const handleSetClosingTimeNew = (index, newValue) => {
    const inputTime = newValue;
    const newClosingTime = [...closingTimesNew];
    newClosingTime[index] = inputTime;
    setClosingTimesNew(newClosingTime);
    setFormValue('closing_hours', newClosingTime);
  };

  const validDayFlag = (index) => (flag) => {
    if (index === 0) {
      setValidSundayHours(flag);
    } else if (index === 1) {
      setValidMondayHours(flag);
    } else if (index === 2) {
      setValidTuesdayHours(flag);
    } else if (index === 3) {
      setValidWednesdayHours(flag);
    } else if (index === 4) {
      setValidThursdayHours(flag);
    } else if (index === 5) {
      setValidFridayHours(flag);
    } else {
      setValidSaturdayHours(flag);
    }
  };

  return (
    <form autoComplete="off" dir="rtl">
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <Box style={{ marginBottom: '20px'}} marginTop={5}  bgcolor="#f7f1e5" boxShadow={0} borderRadius={2} border={2} display="flex" flexDirection="column" height={140} width={1300} alignItems="center" justifyContent="center" mt={3.8} mr={2.3} padding={20} sx={{ border: '1.5px solid #f7f1e5' }}>
        <Box style={{ marginBottom: '19px'}}>
        <Typography color="#37474f" fontFamily="aleph" fontWeight="bold" fontSize={50} marginTop="-9rem" variant="h3" textAlign="center">הרשמת חקלאי</Typography>
        <Typography color="#37474f" fontFamily="aleph" minHeight={45} fontWeight="bold" fontSize={22} marginBottom={2} marginTop={3} variant="h2" textAlign="center">שלב 5 - שעות פתיחה וימי פעילות</Typography>
        </Box>
        <Grid container spacing={22} mr={24}>
        {days.map((day, index) => (
            <Grid item xs={1} key={day}>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <Box gap={2} display= 'flex' flexDirection='column'  gridTemplateColumns= '1fr 3fr 3fr' paddingTop={2} paddingRight={2} paddingLeft={2} sx={{direction: 'rtl'}} direction= 'row' alignItems= 'center'>
                  <Typography variant='h5' fontFamily="aleph" color= 'rgb(2, 0, 99)' fontSize={20} fontWeight={540}>
                    {day}
                  </Typography>
                  <Box position="relative">
                    <Paper>
                      <TimeField
                        direction= 'rtl'
                        label="פתיחה"
                        value={openingTimesNew[index]}
                        onChange={(newValue) => handleSetOpeningTimeNew(index, newValue)}
                        format='HH:mm'
                        sx={{
                          "& label":{left: "unset",
                          right: "1.75rem",
                          transformOrigin: "right"},
                          "& legend": {
                            textAlign: "right",
                          },
                          width: '150px',
                        }}
                        InputProps={{
                          endAdornment: (
                              <InputAdornment position="end">
                                  <IconButton
                                      edge="end"
                                      onClick={() => handleSetOpeningTimeNew(index, null)}
                                  >
                                      x
                                  </IconButton>
                              </InputAdornment>
                          ),
                      }}
                      />
                    </Paper>
                  </Box>
                  <Paper>
                  <TimeField
                    label="סגירה"
                    value={closingTimesNew[index]}
                    onChange={(newValue) => handleSetClosingTimeNew(index, newValue)}
                    format='HH:mm'
                    sx={{
                      "& label": { left: "unset", right: "1.75rem", transformOrigin: "right" },
                      "& legend": {
                        textAlign: "right",
                      },
                      width: '150px',
                    }}
                    InputProps={{
                      endAdornment: (
                          <InputAdornment position="end">
                              <IconButton
                                  edge="end"
                                  onClick={() => handleSetClosingTimeNew(index, null)}
                              >
                                  x
                              </IconButton>
                          </InputAdornment>
                      ),
                  }}
                  />
                  <ValidateWorkingHours open={openingTimesNew[index]} close={closingTimesNew[index]} setValidFlag={validDayFlag(index)}/>
                </Paper>
                </Box>
              </LocalizationProvider>
            </Grid>
        ))}
        </Grid>
      </Box>
      </LocalizationProvider>
    </form>
  );
}

export default FormOpeningHours;