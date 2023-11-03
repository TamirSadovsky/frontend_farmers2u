import styled from '@emotion/styled'
import { AddPhotoAlternate, Close } from '@mui/icons-material'
import { Avatar, Box, Button, 
    FormControlLabel, 
    Checkbox, IconButton, 
    Modal, Autocomplete, 
    TextField, Typography, ThemeProvider, createTheme, ListItem 
} from '@mui/material'
import { DatePicker, LocalizationProvider, 
    TimeField } from '@mui/x-date-pickers'
    import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import axios from 'axios'
import dayjs from 'dayjs'
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

const {palette} = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const themeForButton = createTheme({
  palette: {
    button: createColor('#E8AA42'),
  },
});

/* initial_text, initial_value, initial_value2, initial_value3,
     initial_products, initial_address, initial_vegan, initial_organic, id, */
const EditPost = ({ post, open, onClose }) => {
  const [value, setValue] = useState(post.initial_value);
  const [value2, setValue2] = useState(post.initial_value2);
  const [value3, setValue3] = useState(post.initial_value3);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [pfpAndName] = useState({
    profilePicture: localStorage.getItem('profilePicture'),
    profileName: localStorage.getItem('farmName'),
  })
  const [postData, setPostData] = useState({
    isOrganic: post.initial_organic || false,
    isVegan: post.initial_vegan || false,
    text: post.initial_text,
  });  
  const [image, setImage] = useState(null);
  const inputRef = useRef(null);
  const storedEmail = localStorage.getItem('email');
  const [isRealAddress, setIsRealAddress] = useState(true);
  const [coordinates,setCoordinates] = useState({
    lat: null,
    lng: null
  })
  const [address, setAddress] = useState(post.initial_address)

  const [validDescription, setValidDescription] = useState(true);	
  const [validDate, setValidDate] = useState(true);	
  const [validHours, setValidHours] = useState(true);	
  const [validRange, setValidRange] = useState(true);	
  const [isRelevantDate, setIsRelevantDate] = useState(true);	
  const [validProducts, setValidProducts] = useState(true);	
  const validForm = validDescription && validDate && validHours && validRange && isRealAddress && validProducts;

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
  };


    const handleProductChange = (event, value) => {
    setSelectedProducts(value);
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

  const handleChangeAddress = async value => {
    setAddress(value);	
    setIsRealAddress(false);
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


  	
const handleChangeDate = value => {	
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

useEffect(() => { // every time the modal is opened or closed, remove the validation and the values
  if(open === true)
  {
  setValidDescription(true);	
  setIsRealAddress(true);	
  setValidDate(true);	
  setValidHours(true);	
  setValidRange(true);	
  setIsRelevantDate(true);	
  setValidProducts(true);	
  	
  setAddress(post.initial_address);	
  setValue(post.initial_value);	
  setValue2(post.initial_value2);	
  setValue3(post.initial_value3);	
  setSelectedProducts(products.filter((prod) => 
  post.initial_products.includes(prod.label)
  ));	
  setPostData({	
    isOrganic: post.initial_organic || false,
    isVegan: post.initial_vegan || false,
    text: post.initial_text,
  });
}
}, [open, post.initial_address, post.initial_organic, 
  post.initial_text, post.initial_value, post.initial_value2,
   post.initial_value3, post.initial_vegan, post.initial_products])

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



  const handleEdit = () => { /* The actual object to extract to the backend */
    if (!relevantDate()) {	
      setIsRelevantDate(false);	
      setTimeout(function () {	
        setIsRelevantDate(true);	
      }, 3000);	
    }	
    else {
      const formData = new FormData();
      formData.append('text', postData.text);
      formData.append('isRealAddress', isRealAddress);
      formData.append('location', address);
      formData.append('latitude', coordinates.lat);
      formData.append('longitude', coordinates.lng);
      formData.append('date', value.format('YYYY-MM-DD'));
      formData.append('startTime', value2.format('HH:mm'));
      formData.append('endTime', value3.format('HH:mm'));
      formData.append('image', image);
      formData.append('email', storedEmail);
      formData.append('isVegan', postData.isVegan);
      formData.append('isOrganic', postData.isOrganic);
      formData.append('post_id', post.id);

      if (selectedProducts && selectedProducts.length > 0) {
        const products = selectedProducts.map((p) => p.label);
        formData.append('products', products);
      }

      const handleRequest = () => {
        axios
          .post("https://farmers2u-backend.onrender.com/api/update_post", formData)
          .then((response) => {
              console.log(response.data)
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
    <div className='editPost-container' style={{ display: 'flex', flexDirection: 'column' }}>
      <ThemeProvider theme={themeForButton}>
      <StyledModal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={400} height={'80%'} bgcolor="white" p={3} borderRadius={1} 
        sx={{ direction: 'ltr', overflowY: 'scroll' }}>
          <Typography variant="h6" color="gray" textAlign="center">
            ערכו מודעה
          </Typography>
          <UserBox>
            <Avatar src = {pfpAndName.profilePicture} sx={{ width: 30, height: 30 }} />
            <Typography fontWeight={500} variant="span">
            {pfpAndName.profileName && pfpAndName.profileName.length > 20 ? pfpAndName.profileName.slice(0, 21) + "..." : pfpAndName.profileName}
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
            value={postData.text}
            onChange={handleChange}
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
                placeholder:'כתובת',
                className: 'location-search-input',
                direction: 'rtl'
              })}
              sx={{
                direction: 'rtl',
                alignSelf:'center',
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
                {address === ""?	
                <div>	
                  <Typography variant='body2' color='error' sx={{ textAlign: 'center' }}>יש למלא כתובת</Typography>	
                </div> 	
                : null}
          </div>
        )}
        </PlacesAutocomplete>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box display="flex" paddingTop={2} justifyContent="center">
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
            {!value	
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
              onChange={(newValue) => setValue3(newValue)} sx={{"& label":{left: "unset",
              right: "1.75rem",
              transformOrigin: "right"},
              "& legend": {
                textAlign: "right",
              }}}/>
              <TimeField label="שעת התחלה" format="HH:mm" value={value2} 
              onChange={(newValue) => setValue2(newValue)} sx={{"& label":{left: "unset",
              right: "1.75rem",
              transformOrigin: "right"},
              "& legend": {
                textAlign: "right",
              }}}/>
            </Box>
            {validRange ? null 	
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
            getOptionLabel={(option) => option.label}
            renderOption={(props, option, { selected }) => (
              <ListItem {...props} sx={{direction: 'rtl', '&:hover': {backgroundColor: '#E8AA42!important'}, '&&.Mui-selected':{color: '#E8AA42!important'}}}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  dir="rtl"
                  checked={selected}
                  sx={{'&.Mui-checked':{color: "black"}, direction: 'rtl'}}
                  />
                {option.label}
                </ListItem>
            )}
            style={{ width: 239 }}
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
              {...params}
              placeholder="סוגי מוצרים"
              dir="rtl"
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
          <Box display="flex" sx={{ direction: 'rtl', justifyContent: 'center'}}>
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
          </Box>
          {isRelevantDate? null :	
          <div>	
             <Typography variant='body2' color='error' style={{textAlign: 'center'}}>לא ניתן לפרסם מודעה על אירוע שהתקיים בעבר</Typography>	
          </div>	
           }
          <div style={{ display: "flex", justifyContent: 'center', paddingTop: '2', direction: 'rtl' }}>
            <input type="file" 
            onChange={handleImageChange}
            style={{display: 'none'}}
            ref={inputRef} />
            <div>
            <IconButton aria-label="העלה תמונה" color="primary"
            onClick={() => inputRef.current.click()} sx={{flex: '1', color: '#E8AA42', cursor: 'pointer'}}>
              <AddPhotoAlternate />
            </IconButton>
            </div>
            <div style={{ flex: '6', display: 'flex', justifyContent: 'center' }}>
            <Button disabled={!validForm} variant="contained" 
            sx={{ direction: 'rtl', backgroundColor: '#E8AA42', ":hover": {	
              bgcolor: "#E8AA42",	
              color: "white"	
              }}} onClick={handleEdit}>
              שמירת שינויים
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

export default EditPost;