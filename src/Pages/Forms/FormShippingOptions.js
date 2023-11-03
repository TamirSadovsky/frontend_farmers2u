import React, {useEffect, useState, useCallback } from 'react'
import { TextField, Box, Typography, Grid } from '@mui/material'
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: '80px',
  height: '28px',
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: "1px",
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: "translateX(51px) !important",
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#E8AA42',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: "25px",
    height: "25px",
    margin: "1px"
  },
  '& .MuiSwitch-track': {
    borderRadius: '20px',
    backgroundColor: '#1d3c45',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    "&:after, &:before": {
      color: "white",
      fontSize: "18px",
      position: "absolute",
      top: "3px"
    },
    '&:after': {
      content: '"כן"',
      left: 9,
    },
    '&:before': {
      content: '"לא"',
      right: 4.8,
    },
  },
}));

function ValidateShippingDistance({isShipping, val, setValidFlag }) {
  const [valid, setValid] = useState(true);
  const isValidShippingDistance = useCallback(() => {
    const res = (!isShipping) || (isShipping && val !== "" && val > 0);
    setValidFlag(res);
    return res;
  }, [isShipping, val, setValidFlag]);
  useEffect(() => {
    setValid(isValidShippingDistance());
  }, [isShipping, val, setValidFlag, isValidShippingDistance]);

  return (
    <div style={{ height: "0px" }}>
      {!valid && (
        <Typography dir="rtl" style={{marginTop:"60%"}} variant="body2" color="error">
          שדה חובה
        </Typography>
      )}
    </div>
  );
}



function FormShippingOptions({values, handleChange, setFormValue, setIsFormShippingOptionsValid}) {
  const {shipping_distance
  } = values
  const [isShipping, setIsShipping] = useState(values.is_shipping || false)
  const [isValidShippingDistance, setIsValidShippingDistance] = useState('');
  const formValid = isValidShippingDistance;

  useEffect(() => {
    setIsFormShippingOptionsValid(formValid);
}, [formValid, setIsFormShippingOptionsValid]);

  const handleSwitch = (event) => {
    setIsShipping(event.target.checked);
    setFormValue("is_shipping", event.target.checked)
    console.log(values.is_shipping)
  };


  const handleDistanceChange = (event) => {
    const val = event.target.value;
    // Regular expression to match numbers from 1 to 999, disallowing leading zeros
    const regex = /^[1-9][0-9]{0,2}$/;
    if (regex.test(val) || val === '') {
      setFormValue("shipping_distance", val); // Update the form value
    }
  };

   console.log(values, handleChange,setFormValue);
  return (
    <div>
    <form autoComplete="off" dir="rtl" /*className={classes.root}*/>
    <Box marginTop={5} bgcolor="#f7f1e5" boxShadow={0} borderRadius={2} border={2} display="flex" flexDirection={"column"} width={580} height={160.2} alignItems={"center"} justifyContent={"center"} mt={3.8} mr={2.3} padding={20} sx={{border: '1.5px solid #f7f1e5'}}  >
    <Box style={{marginTop: "-9.1%", marginBottom: "5%"}}>
    <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} fontSize={50} marginTop="-7.3rem" variant='h3' textAlign={"center"}> הרשמת חקלאי </Typography>
    <Typography color="#37474f" fontFamily="aleph" minHeight={45} fontWeight={'bold'} fontSize={22}  mr={-0.8} marginBottom={2} marginTop={3} variant='h2'  textAlign={"center"}> שלב 3 - משלוחים והזמנות</Typography>
    </Box>
      <Grid container style={{ marginBottom:"-30px"}}>
      <Grid item xs={12} style={{ marginTop:"-40px"}}>
      <Stack direction='row' gap={5} alignItems="center" display='flex' justifyContent='center'>
          <Typography fontFamily="aleph" fontSize= '18px' color= 'rgb(23, 23, 91)'>העסק עושה משלוחים?</Typography>
          <IOSSwitch checked = {isShipping} onChange= {handleSwitch}/>
      </Stack>
      <Stack marginRight={17.5} direction='row' alignItems="center" display='flex' justifyContent='flex-start'>
      {isShipping && <Typography fontFamily="aleph" marginBottom={-10} marginTop={2} marginLeft={6.8} fontSize= '18px' color= 'rgb(23, 23, 91)'>טווח המשלוח (בק"מ):</Typography>}
      {isShipping && 
        <TextField 
          onChange={handleDistanceChange} 
          disabled={!isShipping}
          value={shipping_distance} 
          type="text"
          placeholder='0' 
          inputProps={{ maxLength: 3 }} 
          sx={{marginLeft:1, marginTop:2, width: '4em', marginBottom:-10, backgroundColor:"#ffffff" }}
        />
      }
      <ValidateShippingDistance isShipping={values.is_shipping} val={values.shipping_distance} setValidFlag={setIsValidShippingDistance}></ValidateShippingDistance>
      </Stack>

        {/* מרחק המשלוח*/}
        {/*!isShipping */}

  <Box margin={2} >
        <TextField
          fullWidth
          multiline
          dir="rtl"
          name="name"
          variant="outlined"
          type="text"
          placeholder={`מדיניות הזמנות ומשלוחים:
ציינו את כל הפרטים הרלוונטיים כמו: מינימום הזמנה, מחיר משלוח משתנה
בהתאם למיקום / סכום הזמנה וכו'.`}
          required="required"
          defaultValue={values.delivery_details}
          onChange={handleChange('delivery_details')}
          rows={3}
          rowsMax={5}
          sx={{ marginTop: 10, backgroundColor: "#ffffff" }}
      />
  </Box>
  </Grid>


</Grid>
  </Box>    
</form>
</div>
  )
}

export default FormShippingOptions
