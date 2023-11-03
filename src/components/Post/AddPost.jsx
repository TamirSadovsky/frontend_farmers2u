import styled from '@emotion/styled'
import { Add, AddPhotoAlternate, Close } from '@mui/icons-material'
import {
  Avatar, Box, Button,
  Fab, FormControlLabel,
  Checkbox, IconButton,
  Modal, Autocomplete,
  TextField, Tooltip, Typography, ThemeProvider, createTheme, ListItem
} from '@mui/material'
import {
  DatePicker, LocalizationProvider,
  TimeField
} from '@mui/x-date-pickers'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import axios from 'axios'
import dayjs from 'dayjs'
import 'dayjs/locale/he';
import React, { useState, useRef, useEffect } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import products from "../../assets/lists"
import PropTypes from 'prop-types';



const StyledModal = styled(Modal)({
  direction: 'rtl',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const UserBox = styled(Box)({
  direction: 'rtl',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  marginBottom: '10px'
})

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <Close onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  color: ${'black'};
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#E8AA42'
  };
  border: 1.5px solid ${theme.palette.mode === 'dark' ? '#1d3c45' : '#1d3c45'};
  border-radius: 22px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: '#E8AA42';
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }

`,
);

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const themeForButton = createTheme({
  palette: {
    button: createColor('#E8AA42'),
  },
});


const AddPost = ( { vert, notFixed}) => {
  const pos = notFixed? 'relative' : 'fixed';
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [pfpAndName] = useState({
    profilePicture: localStorage.getItem('profilePicture'),
    profileName: localStorage.getItem('farmName'),
  })
  const [postData, setPostData] = useState({
    isOrganic: false,
    isVegan: false,
  });
  const [image, setImage] = useState(null);
  const inputRef = useRef(null);
  const storedEmail = localStorage.getItem('email');
  const [isRealAddress, setIsRealAddress] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  })
  const [address, setAddress] = useState("")
  const [validDescription, setValidDescription] = useState(false);
  const [validDate, setValidDate] = useState(false);
  const [validHours, setValidHours] = useState(false);
  const [validRange, setValidRange] = useState(false);
  const [isDirty, setIsDirty] = useState(Array(5).fill(false)); // desc,addr,date,hours,products
  const [isRelevantDate, setIsRelevantDate] = useState(false);
  const [validProducts, setValidProducts] = useState(false);
  const [productsText] = useState("")
  const validForm = isDirty.every(element => element === true) && validDescription && validDate && validHours && validRange && isRealAddress && validProducts;

  const relevantDate = () => {
    const now = dayjs();
    const startingMinutes = value2.minute();
    const startingHour = value2.hour();
    const startingTime = value.hour(startingHour).minute(startingMinutes);
    const endingMinutes = value3.minute();
    const endingHour = value3.hour();
    const endingTime = value.hour(endingHour).minute(endingMinutes);
    if (startingTime.isAfter(now, 'minute') || endingTime.isAfter(now, 'minute')) {
      return true;
    }
    else {
      return false;
    }
  }

const handleSelect = async value => {
  const results = await geocodeByAddress(value);
  const latLng = await getLatLng(results[0]);
  setAddress(value);
  setCoordinates(latLng);
  setIsRealAddress(true);
  if (isDirty[1] !== true) {
    const curr = [...isDirty];
    curr[1] = true;
    setIsDirty(curr);
  }
};


const handleProductChange = (event, value) => {
  setSelectedProducts(value);
  console.log(value)
  if (isDirty[4] !== true) {
    const curr = [...isDirty];
    curr[4] = true;
    setIsDirty(curr);
  }
  setValidProducts(value && value.length > 0);
};


const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (!fileSpecialChars(file)) {
    alert("שם הקובץ מכיל תווים לא חוקיים.");
    event.target.value = null;
    return;
  }
  if (!fileMaxSize(file)) {
    alert("גודל מקסימלי עבור קובץ הוא 5MB.");
    event.target.value = null;
    return;
  }
  if (!fileTypeValidation(file)) {
    alert("מותר לצרף תמונות בפורמט PNG, JPEG או JPG בלבד.");
    event.target.value = null;
    return;
  }
  setImage(file);
};

const fileMaxSize = (file) => {
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
  if (file.size > MAX_FILE_SIZE) {
    return false
  }
  return true
}
  
const fileSpecialChars = (file) => {
  const fileName = file.name;
  if (/[^A-Za-z0-9_.-]/.test(fileName)) {
    return false
  }
  return true;
}

const fileTypeValidation = (file) => {
  if (
    file.type !== "image/png" &&
    file.type !== "image/jpg" &&
    file.type !== "image/jpeg"
  ) {
    return false;
  }
  return true;
};


const handleChange = (event) => {
  const { name, value } = event.target;
  if (name === 'isOrganic' || name === 'isVegan') {
    const { checked } = event.target;
    const updatedValue = checked;
    setPostData({
      ...postData,
      [name]: updatedValue,
    })
  }
  else {
    if (isDirty[0] !== true) {
      const curr = [...isDirty];
      curr[0] = true;
      setIsDirty(curr);
    }

    if (value === "") {
      setValidDescription(false);
    } else {
      setValidDescription(true);
    }
    setPostData({
      ...postData,
      [name]: value,
    });
  }

};

const handleClickAddr = value => {
  if (value === "")
  {
    setIsRealAddress(false);
  }
  if (isDirty[1] !== true) {
    const curr = [...isDirty];
    curr[1] = true;
    setIsDirty(curr);
  }
}



const handleChangeAddress = async value => {
  console.log(value)
  setAddress(value);
  setIsRealAddress(false);
  if (isDirty[1] !== true) {
    console.log(isDirty)
    const curr = [...isDirty];
    curr[1] = true;
    setIsDirty(curr);
  }
  try {
    const results = await geocodeByAddress(value);

    const latLng = await getLatLng(results[0]);

    if (latLng && latLng.lat && latLng.lng) {
      setCoordinates(latLng);
    }
    console.log("Latitude and Longitude: ", latLng)
  } catch (error) {
    console.log(error);
  }
};


useEffect(() => { // every time the modal is opened or closed, remove the validation and the values
  setIsDirty(Array(5).fill(false));
  setValidDescription(true);
  setIsRealAddress(true);
  setValidDate(true);
  setValidHours(true);
  setValidRange(true);
  setIsRelevantDate(true);
  setValidProducts(true);
  
  setAddress('');
  setValue(null);
  setValue2(null);
  setValue3(null);
  setSelectedProducts([]);
  setPostData({
    isOrganic: false,
    isVegan: false,
    text: "",
  });
}, [open])

// useEffect(() => {
//   setIsRelevantDate(relevantDate());
// }, [value, value2, value3]);

const handleChangeDate = value => {
  console.log(value);
  if (isDirty[2] !== true) {
    const curr = [...isDirty];
    curr[2] = true;
    setIsDirty(curr);
  }
  setValue(value);
  if(!value) {
    setValidDate(false);
  }
  else if (!(value.isValid())){
      setValidDate(false);
  }
  else {
    setValidDate(true);
  }
}

const handleChangeValue2 = value => {
  setValue2(value);
  if (isDirty[3] !== true) {
    const curr = [...isDirty];
    curr[3] = true;
    setIsDirty(curr);
  }
}

const handleChangeValue3 = value => {
  setValue3(value);
  if (isDirty[3] !== true) {
    const curr = [...isDirty];
    curr[3] = true;
    setIsDirty(curr);
  }
}

useEffect(() => {
  if (!(value2) || !(value3)) {
    if (!value2 && !value3)// both are empty
    {
      setValidRange(false);
      setValidHours(true);
    }
    else if (value2 && !value2.isValid()) // open is not empty and not valid
    {
      setValidHours(false);
      setValidRange(true);
    }
    else if (value3 && !value3.isValid()) // close is not empty and not valid
    {
      setValidHours(false);
      setValidRange(true);
    }
    else { // one is empty and the other is valid
      setValidRange(false);
      setValidHours(true);
    }
  }
  else if (value2 && value3) {
    if (!(value2.isValid() && value3.isValid())) // not valid hours
    {
      setValidHours(false);
      setValidRange(true);
    }
    else if (value2.isAfter(value3, 'minute')) // not valid hours range
    {
      setValidRange(false);
      setValidHours(true);
    }
    else // valid hours range
    {
      setValidRange(true);
      setValidHours(true);
    }
  }
}, [value2, value3]);


const handlePost = () => { /* The actual object to extract to the backend */
  if (!relevantDate()) {
    setIsRelevantDate(false);
    setTimeout(function () {
      setIsRelevantDate(true);
    }, 3000);
  }
  else {
    const formData = new FormData();
    formData.append('isRealAddress', isRealAddress);
    formData.append('text', postData.text);
    formData.append('location', address);
    formData.append('date', value.format('YYYY-MM-DD'));
    formData.append('startTime', value2.format('HH:mm'));
    formData.append('endTime', value3.format('HH:mm'));
    formData.append('image', image);
    formData.append('email', storedEmail);
    formData.append('isVegan', postData.isVegan);
    formData.append('isOrganic', postData.isOrganic);
    formData.append('latitude', coordinates.lat);
    formData.append('longitude', coordinates.lng);

    if (selectedProducts && selectedProducts.length > 0) {
      const products = selectedProducts.map((p) => p.label);
      formData.append('products', products);
    }



    const handleRequest = () => {
      axios
        .post("https://farmers2u-backend.onrender.com/api/posts", formData)
        .then(() => {
          window.location.reload()
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.error) {
            const errorMessage = error.response.data.error;
            window.alert(errorMessage);
          } else {
            console.error(error);
          }
        })
    }
    handleRequest()
  }
}


return (
  <div className='addPost-wrapper' style={{ display: 'flex', flexDirection: 'column' }}>
    <ThemeProvider theme={themeForButton}>
      <Tooltip onClick={() => setOpen(true)} title="פרסום מודעה"
        sx={{ position: pos, ...vert }}>
        <Fab color="button" aria-label="add">
          <Add />
        </Fab>
      </Tooltip>
      <StyledModal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={400} height={'80%'} bgcolor="white" p={3} borderRadius={1}
          sx={{ direction: 'ltr', overflowY: 'scroll' }}>
          <Typography variant="h6" color="gray" textAlign="center">
            ערכו מודעה
          </Typography>
          <UserBox>
            <Avatar src={pfpAndName.profilePicture} sx={{ width: 30, height: 30 }} />
            <Typography fontWeight={500} variant="span">
              {console.log(pfpAndName.profileName)}
              {pfpAndName.profileName.length > 20 ? pfpAndName.profileName.slice(0, 21) + "..." : pfpAndName.profileName}
            </Typography>
          </UserBox>
          <TextField
            sx={{ width: '100%', direction: 'rtl' }}
            id="standard-multiline-static"
            multiline
            rows={4}
            placeholder="מה תרצו לפרסם?"
            variant="standard"
            name="text"
            value={postData.text || ''}
            onChange={handleChange}
            onClick={handleChange}
          />
          {validDescription ? null :
            <div>
              <Typography variant='body2' color="error" sx={{ textAlign: 'center' }}>יש למלא את שדה התיאור</Typography>
            </div>}
          <PlacesAutocomplete
            value={address}
            onChange={handleChangeAddress}
            onSelect={handleSelect}
            searchOptions={{
              types: ['address'],
              region: 'il',
              language: 'iw',
            }}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <TextField
                  {...getInputProps({
                    placeholder: 'כתובת',
                    className: 'location-search-input',
                    direction: 'rtl'
                  })}
                  onClick={handleClickAddr}
                  sx={{
                    direction: 'rtl',
                    alignSelf: 'center',
                    width: '100%',
                    position: 'relative',
                    paddingTop: '5px',
                    fontSize: '16px',
                    marginTop: '1rem'
                  }}
                />
                <Typography variant='body2' color='gray' textAlign='center'>מיקום המכירה</Typography>
                <div className="autocomplete-dropdown-container">
                  {loading && <div>טוען...</div>}
                  {suggestions.map((suggestion, index) => {
                    const style = {
                      //position: 'absolute',
                      //zIndex: '1000',
                      width: '90%',
                      color: 'black',
                      backgroundColor: suggestion.active ? "#E8AA42" : "white",
                      cursor: 'pointer',
                      padding: '10px',
                      direction: 'rtl'
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
                {isRealAddress || address === '' ? null :
                  <div>
                    <Typography variant='body2' color="error" sx={{ textAlign: 'center' }}>יש ללחוץ על כתובת מבין האפשרויות המוצעות</Typography>
                  </div>}
                {address === ""  && isDirty[1] === true?
                <div>
                  <Typography variant='body2' color='error' sx={{ textAlign: 'center' }}>יש למלא כתובת</Typography>
                </div> 
                : null}
              </div>
            )}
          </PlacesAutocomplete>
          <LocalizationProvider dateAdapter={AdapterDayjs} locale="he">
            <Box display="flex" paddingTop={2} justifyContent="center" >
              <DatePicker label={'תאריך '} views={['day']} format='DD/MM/YYYY'
                value={value} onChange={handleChangeDate} sx={{
                  direction: 'rtl',
                  "& label":{left: "unset",
              right: "1.75rem",
              transformOrigin: "right"},
              "& legend": {
                textAlign: "right",
              },
                }} />
            </Box>
            {!value && isDirty[2]  
            ? 
            <div>
             <Typography variant='body2' color='error' sx={{textAlign: 'center'}}>יש להכניס תאריך</Typography>
            </div>
            : null}
            {!validDate && value
            ? 
            <div>
             <Typography variant='body2' color='error' sx={{textAlign: 'center'}}>יש להכניס תאריך תקין</Typography>
            </div>
            : null}
            <Box display="flex" gap={2} paddingTop={2}>
              <TimeField label="שעת סיום" format="HH:mm" value={value3}
                onChange={handleChangeValue3} sx={{
                  "& label": {
                    left: "unset",
                    right: "1.75rem",
                    transformOrigin: "right"
                  },
                  "& legend": {
                    textAlign: "right",
                  }
                }} />
                <TimeField label="שעת התחלה" format="HH:mm" value={value2}
                onChange={handleChangeValue2} sx={{
                  "& label": {
                    left: "unset",
                    right: "1.75rem",
                    transformOrigin: "right"
                  },
                  "& legend": {
                    textAlign: "right",
                  }
                }} />
            </Box>
            {validRange || !isDirty[3] ? null 
            : 
            <div>
              <Typography variant='body2' color='error' sx={{textAlign: 'center'}}>יש להזין טווח שעות תקין</Typography>
            </div>
            }
            {validHours ? null 
            : 
            <div>
              <Typography variant='body2' color='error' sx={{textAlign: 'center'}}>יש להזין שעות תקינות</Typography>
            </div>
            }
          </LocalizationProvider>
          <Box display="flex" gap={3} paddingTop={2} sx={{ direction: 'rtl' }} justifyContent="center">
            <Autocomplete
              multiple
              id="areas-autocomplete"
              options={products}
              disableCloseOnSelect
              direction= 'rtl'
              getOptionLabel={(option) => option.label}
              renderOption={(props, option, { selected }) => (
                <ListItem {...props} sx={{direction: 'rtl', '&:hover': {backgroundColor: '#E8AA42!important'}, '&&.Mui-selected':{color: '#E8AA42!important'}}}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    direction="rtl"
                    checked={selected}
                    sx={{'&.Mui-checked':{color: "black"}, direction: 'rtl'}}
                  />
                  {option.label}
                </ListItem>
              )}
              style={{ width: 239, direction: 'rtl'}}
              value={selectedProducts}
              onChange={handleProductChange}
              noOptionsText="לא נמצאו תוצאות"
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <StyledTag label={option.label} {...getTagProps({ index })} />
              ))}
              renderInput={(params) => (
                <div>
                <TextField
                value={productsText}
                  {...params}
                  placeholder="סוגי מוצרים"
                  dir="rtl"
                  sx={{
                    direction: 'rtl',
                  }}
                />
                   <Typography variant='body2' color='gray' textAlign='center'>סוגי המוצרים הרלוונטיים למודעה</Typography>
                </div>
              )}
            />
          </Box>
          {validProducts ? null :
            <div>
              <Typography variant='body2' color='error' sx={{textAlign: 'center'}}>יש לבחור לפחות אפשרות אחת</Typography>
            </div>
            }
          <div style={{ display: 'flex', direction: 'rtl', justifyContent: 'center' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={postData.isVegan}
                  onChange={handleChange}
                  name="isVegan"
                  sx={{ transform: 'scale(1.3)', '&.Mui-checked':{color: '#E8AA42'}}}
                />
              }
              label={<Typography sx={{ fontSize: '1.1rem' }}>טבעוני?</Typography>}
              sx={{ marginLeft: '1.4rem' }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={postData.isOrganic}
                  onChange={handleChange}
                  name="isOrganic"
                  sx={{ transform: 'scale(1.3)', '&.Mui-checked':{color: '#E8AA42'}}}
                />
              }
              label={<Typography sx={{ fontSize: '1.1rem' }}>אורגני?</Typography>}
              sx={{ marginRight: '1.4rem' }}
            />
          </div>
          {isDirty.some(element => element === false) ?
          <div>
            <Typography variant='body2' color='primary' sx={{textAlign: 'center'}}>יש למלא את כל הפרטים הנדרשים</Typography>
          </div>
          : null
          }
          {isRelevantDate? null :
          <div>
             <Typography variant='body2' color='error' style={{textAlign: 'center'}}>לא ניתן לפרסם מודעה על אירוע שהתקיים בעבר</Typography>
          </div>
           }
          <div style={{ display: "flex", justifyContent: 'center', paddingTop: '2', direction: 'rtl' }}>
            <input type="file"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              ref={inputRef} />
              <div>
                <IconButton aria-label="העלה תמונה"
                onClick={() => inputRef.current.click()} sx={{flex: '1', color: '#E8AA42', cursor: 'pointer'}}>
                <AddPhotoAlternate />
                </IconButton>
              </div>
            <div style={{ flex: '6', display: 'flex', justifyContent: 'center' }}>
              <Button disabled={!validForm} variant="contained"
                sx={{ direction: 'rtl', backgroundColor: '#E8AA42', ":hover": {
                  bgcolor: "#E8AA42",
                  color: "white"
                  }, 
                }} onClick={handlePost}>
                פרסום
              </Button>
            </div>
            <div style={{ flex: 1 }}></div>
          </div>
        </Box>
      </StyledModal>
    </ThemeProvider>
  </div>
)
}

export default AddPost


