import React, {useEffect, useState, useCallback } from 'react';
import { TextField, Button, Box, Typography, ThemeProvider, createTheme, Grid, Tooltip} from '@mui/material'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PlacesAutocomplete from 'react-places-autocomplete';
import {ValidatePhone, ValidateWhatsapp} from '../../components/validations'


const {palette} = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const themeForButton = createTheme({
  palette: {
    nice: createColor('#e1f5fe'),
  },
});

function ValidateFarmName({farmName, setValidFlag}) {
  const [valid ,setValid] = useState(true);
  
  const isValidFarmName = useCallback(() => {
    const res = farmName !== "";
    setValidFlag(res);
    return res;
  }, [farmName, setValidFlag]);

  useEffect(() => {
    setValid(isValidFarmName());
  }, [farmName, setValidFlag, isValidFarmName]);

  return (
    <div style={{ height: "0px" }}>
      {!valid && <Typography dir="rtl" style={{ marginRight: "-261%" }} variant="body2" color="error">שדה חובה</Typography>}
    </div>
  );
}


function ValidatePhoneNotEmpty({ phoneNumber, setValidFlag }) {
  const [valid, setValid] = useState(true);
  const isValidPhoneNotEmpty =useCallback(() => {
    const res = phoneNumber !== "";
    setValidFlag(res);
    return res;
  }, [phoneNumber, setValidFlag]);
  useEffect(() => {
    setValid(isValidPhoneNotEmpty());
  }, [phoneNumber, setValidFlag,isValidPhoneNotEmpty]);

  return (
    <div style={{ height: "0px" }}>
      {!valid && (
        <Typography dir="rtl" style={{ marginRight: "5.8%" }} variant="body2" color="error">
          שדה חובה
        </Typography>
      )}
    </div>
  );
}


function FormPersonalInfo({values, handleChange, setFormValue, setIsFormPersonalInfoValid }) {
  const [addressN, setAddress] = useState(values.address);
  // console.log(addressN);
  // const [coordintes,setCoordinates] = useState({
  //   lat: null,
  //   lng: null
  // })
  const [isValidPhoneNotEmpty, setIsValidPhoneNotEmpty] = useState('');
  const [isValidPhone, setIsValidPhone] = useState('');
  const [isValidWhatsApp, setIsValidWhatsApp] = useState('');
  const [isValidFarmName, setIsValidFarmName] = useState(true);
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const formValid = isValidPhoneNotEmpty && isValidPhone && isValidWhatsApp && isValidFarmName && isValidAddress;

  useEffect(() => {
    setIsFormPersonalInfoValid(formValid);
}, [formValid, setIsFormPersonalInfoValid]);

  const handleSelect = value => {
    //const results = await geocodeByAddress(value);
    //const latLng = await getLatLng(results[0]);
    setAddress(value)
    setIsValidAddress(true);
    setFormValue("address",value)
    //setCoordinates(latLng);
  };

  const {address} = values
  const handleKeyDown = (event) => {
    if (
        !/^[0-9]$/.test(event.key) &&
        !["Backspace", "Delete", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
    ) {
        event.preventDefault();
    }
};

const handleKeyDownFarmer = (event) => {
  if (/^[0-9!@#$%^&*()_+{}[\]:;<>,.?~\\/]$/.test(event.key)) {
      event.preventDefault();
  }
};

  
  const handleChangePhone = (event) => {
    const phoneNumber = event.target.value;
    setFormValue("phone_number_official",phoneNumber)
  };
  
  const handleChangeWhatsApp = (event) => {
    const whatsAppNumber = event.target.value;
    setFormValue("phone_number_whatsapp",whatsAppNumber)
  };

  const handleChangeFarm = (newValue) =>{
    setFormValue("farm_name",newValue.target.value)
  }
  const handleChangeFarmerName = (newValue) =>{
    setFormValue("farmer_name",newValue.target.value)
  }


  return (
    <ThemeProvider theme={themeForButton}>
    <div>
      <form autoComplete="off" >
        <Box marginTop={5} bgcolor="#f7f1e5" boxShadow={0} borderRadius={2} border={2} display="flex" flexDirection={"column"} width={580} height={164.7} alignItems={"center"} justifyContent={"center"} mt={3.2} mr={2.3} padding={20} sx={{border: '1.5px solid #f7f1e5'}}  >
              <Box style={{marginTop:"-20%"}}>
              <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} fontSize={50} marginTop="-4.1rem" variant='h3' textAlign={"center"}> הרשמת חקלאי </Typography>
              <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} mt={2} fontSize={22} mr={-0.5} marginBottom={8} marginTop={3} variant='h2'  textAlign={"center"}> שלב 2 - פרטי המשק החקלאי</Typography>
              </Box>
  <Grid marginLeft={10.5} marginTop={-4} marginBottom={-10} container rowSpacing={3} columnSpacing={4}>
  <Grid marginLeft={4} dir='rtl' item xs={9.57}>
  <PlacesAutocomplete
            value={addressN}
            onChange={(newValue) => {
              setAddress(newValue);
              setIsValidAddress(false);
              console.log(newValue);
            }}
            onSelect={handleSelect}
              
            searchOptions={{
              types: ['address'],
              region: 'il',
              language: 'iw',
            }}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div style={{ position: 'relative' }} >
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <LocationOnIcon style={{ color: 'gray' }} sx={{zIndex: 2, marginRight: 56, mb: -7 }}/>
                </div>
                <input
                  {...getInputProps({
                    placeholder: 'כתובת המשק החקלאי ',
                    className: 'location-search-input',
                    
                    onBlur: () => {
                      console.log(addressN);
                      console.log(address);

                      if (!addressN || addressN === ""){
                        setAddress('');
                        values.address="";
                      } 
                  }
                  })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '16px',
                    height: '35px',
                    border: '1px solid #bdbdbd', 
                    borderRadius: '4px',
                    boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)',
                    fontFamily: 'arial',
                    color: 'black',
                    
                                      
                  }}
                  required
                />
                    <style type="text/css">
                    {`
                      .location-search-input::-webkit-input-placeholder { color: #9e9e9e; }
                      .location-search-input::-moz-placeholder { color: #9e9e9e; }
                      .location-search-input:-ms-input-placeholder { color: #9e9e9e; }
                      .location-search-input:-moz-placeholder { color: #9e9e9e; }
                    `}
                  </style>
                <div style={{position: 'absolute',
                 zIndex: 1000,
                backgroundColor: '#fff', 
                width: '105%', 
                maxWidth: '485px', 
                left: '45.5%', 
                transform: 'translateX(-50%)',
                maxHeight: '220px',
                overflowY: 'auto',
                  }}>
                  {loading && <div>טוען...</div>}
                  {suggestions.map((suggestion, index) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#ffb74d" : "#fff",
                      cursor: 'pointer',
                      padding: '10px',                      
                    };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, { style })}
                        key={index}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
                {(!isValidAddress || address === "") &&
                    <div dir='rtl' style={{ height: "0px" }}>
                    <Typography style={{marginRight:"5%"}} variant="body2" color="error" >שדה חובה - יש לבחור מהרשימה</Typography>
                  </div>
                }
              </div>
            )}
          </PlacesAutocomplete>
  </Grid>
  <Grid container item xs={5}>
  <Tooltip 
        title={<span style={{ fontSize: '12px' }}>יש להזין שם פרטי בלבד</span>}  
        open={!!values.farmer_name && showTooltip} 
        placement="left"
    >
      <TextField fullWidth multiline dir="rtl"
        name ="name"
        variant='outlined'
        type="text"
        placeholder='שם איש קשר'
        defaultValue={values.farmer_name}
        onChange={handleChangeFarmerName}
        onKeyDown={handleKeyDownFarmer}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        required="required"
        rows={1}
        rowsMax={5}
        inputProps={{ maxLength: 15 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position={'end'}>
                <PersonIcon sx={{ ml: -0.5, my: 0.5 }}>
                </PersonIcon>
            </InputAdornment>
          )
          
        }}
        sx={{ 
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0px 1.5px 1.5px rgba(0, 0, 0, 0.25)',
          fontFamily: 'arial'

        }} 
      />
          </Tooltip>
  </Grid>
  <Grid container item xs={5}>
      <TextField fullWidth multiline dir="rtl"
        name ="name"
        variant='outlined'
        type="text"
        placeholder='שם העסק'
        defaultValue={values.farm_name}
        onChange={handleChangeFarm}
        required="required"
        rows={1}
        rowsMax={5}  
        InputProps={{
          endAdornment: (
            <InputAdornment position={'end'}>
                <DriveFileRenameOutlineIcon sx={{ ml: -0.5, my: 0.5 }}>
                </DriveFileRenameOutlineIcon>
            </InputAdornment>
          )
          
        }}
        sx={{ 
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0px 1.5px 1.5px rgba(0, 0, 0, 0.25)',
          fontFamily: 'arial'

        }} 
      />
      <ValidateFarmName farmName={values.farm_name} setValidFlag={setIsValidFarmName}/>
  </Grid>
  <Grid container item xs={5}>
  <div style={{ width: '100%', height: '10px' }}>  
      <TextField fullWidth multiline dir="rtl"
        name ="name"
        variant='outlined'
        type="text"
        placeholder='מספר וואטסאפ'
        onKeyDown={handleKeyDown}
        defaultValue={values.phone_number_whatsapp}
        onChange={handleChangeWhatsApp}
        rows={1}
        inputProps={{
          maxLength: 10,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position={'end'}>
                <WhatsAppIcon sx={{ ml: -0.5, my: 0.5 }}>
                </WhatsAppIcon>
            </InputAdornment>
          )
          
        }}
        sx={{ 
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0px 1.5px 1.5px rgba(0, 0, 0, 0.25)',
          fontFamily: 'arial'

        }} 
      />
        <div style={{marginLeft: "60%"}} >
      <ValidateWhatsapp whatsapp={values.phone_number_whatsapp} setValidFlag={setIsValidWhatsApp}/>
          </div>
          </div>
  </Grid>
  <Grid container item xs={5}>
  <div style={{width: '100%', height: '10px' }}>  
      <TextField fullWidth multiline dir="rtl"
        name ="name"
        variant='outlined'
        type="text"
        placeholder='מספר טלפון של העסק'
        onKeyDown={handleKeyDown}
        defaultValue={values.phone_number_official}
        onChange={handleChangePhone}
        rows={1}
        inputProps={{
          maxLength: 10,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position={'end'}>
                <PhoneIcon sx={{ ml: -0.5, my: 0.5 }}>
                </PhoneIcon>
            </InputAdornment>
          )
          
        }}
        sx={{ 
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0px 1.5px 1.5px rgba(0, 0, 0, 0.25)',
          fontFamily: 'arial'

        }} 
      />
        <div style={{marginLeft: "60%"}} >
        <ValidatePhone phone={values.phone_number_official} setValidFlag={setIsValidPhone}/>
        </div>
        <ValidatePhoneNotEmpty phoneNumber={values.phone_number_official} setValidFlag={setIsValidPhoneNotEmpty} /> 
        </div>

  </Grid>
</Grid>
              <Button disabled variant='text' size='medium' color='nice' sx={{fontFamily:"aleph",  mt: 4, borderRadius: 4, fontSize: 16}} > .</Button>  
          </Box>    
      </form>
    </div>
    </ThemeProvider>
  )
}

export default FormPersonalInfo;