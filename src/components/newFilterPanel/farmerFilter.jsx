import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
import { useState } from 'react';
import { Autocomplete, Box, Button, Checkbox, ListItem, Slider, TextField } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import axios from 'axios';
import { Close } from '@mui/icons-material';
import PropTypes from 'prop-types';
import products from '../../assets/lists';


  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 25,
      label: '25',
    },
    {
      value: 50,
      label: '50',
    },
    {
      value: 75,
      label: '75',
    },
    {
      value: 100,
      label: '100',
    },
    {
      value: 150,
      label: '150',
    },
  ];


const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="24" height="24" viewBox="0 0 24 24"%3E%3Cpath fill="currentColor" d="M3 4a2 2 0 0 0-2 2v11h2a3 3 0 0 0 3 3a3 3 0 0 0 3-3h6a3 3 0 0 0 3 3a3 3 0 0 0 3-3h2v-5l-3-4h-3V4m-7 2l4 4l-4 4v-3H4V9h6m7 .5h2.5l1.97 2.5H17M6 15.5A1.5 1.5 0 0 1 7.5 17A1.5 1.5 0 0 1 6 18.5A1.5 1.5 0 0 1 4.5 17A1.5 1.5 0 0 1 6 15.5m12 0a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5Z"%2F%3E%3C%2Fsvg%3E')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#E8AA42' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#E8AA42',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="24" height="24" viewBox="0 0 24 24"%3E%3Cpath fill="currentColor" fill-rule="evenodd" d="M9 8a3 3 0 1 1 6 0H9ZM7 8a5 5 0 0 1 10 0h3a1 1 0 0 1 .996 1.09l-.835 9.182A3 3 0 0 1 17.174 21H6.826a3 3 0 0 1-2.987-2.728L3.004 9.09A1 1 0 0 1 4 8h3Z" clip-rule="evenodd"%2F%3E%3C%2Fsvg%3E')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));


const PrettoSlider = styled(Slider)({
    width:'90%',
    alignSelf:'center',
    color: '#E8AA42',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#E8AA42',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });

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

  const FarmerFilter = (props) => {
    const [address, setAddress] = useState("")

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        console.log(latLng);
        setIsRealAddress(true);
        setAddress(value);
      };

      const handleChangeAddress = value => {
        setAddress(value);
        if (value === "") {
          setIsRealAddress(true);
        }
        else{
          setIsRealAddress(false);
        }
        console.log(value);
      };

    const [isShipping, setIsShipping] = useState(true)

    const handleSwitch = (event) => {
        setIsShipping(event.target.checked);
      };

    const [distance, setDistance] = useState(0)
    const handleDistanceChange = (event, newValue) => {
        setDistance(newValue);
      };

    const [categories, setCategories] = useState([])

    const [isRealAddress, setIsRealAddress] = useState(true);
    const distanceWithoutAddress = !isShipping && address === "" && distance !== 0;
    const addressWithoutDistance = !isShipping && isRealAddress && address !== "" && distance === 0;
    const notValidRequest = distanceWithoutAddress || !isRealAddress || addressWithoutDistance

    const handleFilter = (data) => {
      console.log("start of filter handler");
      data.preventDefault();
      const categories_list = categories.map((category) => (category.label));
      console.log("isRealAddress: " + isRealAddress);
      console.log("isShipping: " + isShipping);
  
      axios({
        method: 'POST',
        url: `https://farmers2u-backend.onrender.com/farmerFilter`,
        headers: {
          Authorization: 'Bearer ',
        },
        data: {shipping: isShipping, address: address, isRealAddress: isRealAddress, distance: distance, categories: categories_list},
      })
      .then(function (response) {
          //handle success
          console.log(response.data)
          props.setFilteredCards(response.data);
          // props.setCurrentCards(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const handleClear = (data) => {
    data.preventDefault();
    props.setFilteredCards(props.cards);
    props.setCurrentCards(props.cards);
    setCategories([]);
    setDistance(0);
    setAddress('');
    setIsRealAddress(true);
    props.setSearchTerm('');
  }
    
    return (
      <div style={{display: 'flex'}}>
        <Box className='filter' flex='1' sx={{'&::-webkit-scrollbar': { display: 'none' }, direction: 'rtl',borderLeft: 'solid 0.5px #1d3c45',overflowY:'scroll', height: '70vh'}}>
          <FormGroup display='flex' justifyContent='center' sx={{display: 'flex', flexDirection:'column', justifyContent:'center', paddingLeft:'8px'}}>
            <Typography sx={{ fontSize: '20px', color: '#1d3c45', display: 'flex', justifyContent: 'center'}}>אפשרויות צריכה</Typography>
            <Stack direction="row" spacing={0.5} alignItems="center" display='flex' justifyContent='center'>
                <Typography>משלוחים</Typography>
                <MaterialUISwitch sx={{ m: 1 }} checked = {isShipping} onChange= {handleSwitch}/>
                <Typography> רכישה בעסק</Typography>
            </Stack>
            {/* נקודת מוצא */}
            <Typography sx={{paddingTop: '5%', fontSize: '20px', color: '#1d3c45', display: 'flex', justifyContent: 'center'}}>
                {isShipping? 'יעד המשלוח' : ' מיקום נוכחי'}
            </Typography>
           
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
                <Typography sx={{fontSize: '15px', color: 'rgb(141, 141, 138)',display: 'flex', justifyContent: 'center'}}>
                  {isShipping?' זוהי הכתובת אליה תרצו שיגיע המשלוח' : ' זוהי הכתובת ממנה תרצו להגיע לבית העסק'}
                </Typography>
                
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
                    fontSize: '16px',}}
                />
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
                {isRealAddress? null
                : 
                <div>
                  <Typography variant='body2' color='error' sx={{textAlign: 'center'}}>יש ללחוץ על כתובת מבין האופציות המוצעות</Typography>
                </div>}
                {addressWithoutDistance ?
                <div>
                  <Typography variant='body2' color='error' sx={{textAlign: 'center'}}>על מנת לסנן לפי כתובת יש לבחור מרחק</Typography>
                </div>
                : null
                }
              </div>
            )}
          </PlacesAutocomplete>
            {/* מרחק מבית העסק בק"מ*/}
            {isShipping ? null :
            <Stack>
                <Typography sx={{ fontSize: '20px', color: '#1d3c45', display: 'flex', justifyContent: 'center', paddingTop: '5%'}}>מרחק מבית העסק (בק"מ)</Typography>
                <PrettoSlider
            aria-label="distance"
            defaultValue={5}
            value = {distance}
            onChange={handleDistanceChange}
            // getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={1}
            marks = {marks}
            min={0}
            max={100}
          />
          {distanceWithoutAddress ?
          <div>
          <Typography variant='body2' color= 'error'sx={{textAlign: 'center'}}>יש להזין כתובת כדי לסנן לפי מרחק</Typography>
          </div>
          : null
          }
                </Stack>}
            {/* מוצרים */}
            <Typography sx={{ fontSize: '20px', color: '#1d3c45', display: 'flex', justifyContent: 'center', paddingTop: '5%'}}>סינון לפי מוצרי העסק</Typography>
            <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          value={categories}
          onChange={(event, newValue) => {
            console.log(newValue);
            setCategories([
              ...newValue
            ]);
          }}
          options={products}
          direction= 'rtl'
          disableCloseOnSelect
          disablePortal
          position='relative'
          placement='top'
          noOptionsText = 'אין תוצאות'
          ListboxProps={
            {
              style:{
                  maxHeight: '100px',
                  border: '2px solid #E8AA42',
                  direction: 'ltr'
              }
            }
          }
          getOptionLabel={(option) => option.label}
          renderOption={(props, option, { selected }) => (
            <ListItem {...props} sx={{direction: 'rtl', fontSize: '18px', position: 'relative', overflowY: 'scroll',
            '&:hover': {backgroundColor: '#E8AA42!important'}, '&&.Mui-selected':{color: '#E8AA42!important'}}}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
                sx={{direction: 'rtl', '&.Mui-checked':{color: "black"} }}
              />
              {option.label}
            </ListItem>
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <StyledTag label={option.label} {...getTagProps({ index })} />
          ))}
          sx={{ width: '100%',
         }}
          renderInput={(params) => (
            <TextField {...params} placeholder="סוגי מוצרים"  direction= 'rtl' />
          )}
        />
            <Box display= 'flex' justifyContent='center' gap= {3} paddingBottom= '10px' paddingTop= '5%'>
                <Button disabled = {notValidRequest} onClick={handleFilter} sx={{fontFamily:'aleph', backgroundColor: '#E8AA42', color: 'black',
                ":hover": {
                bgcolor: "#E8AA42",
                color: "white"
                }, 
                display: 'flex', alignSelf: 'center'
                }}>הפעלת סינון</Button>
                <Button onClick={handleClear} sx={{fontFamily:'aleph',backgroundColor: '#1d3c45', color: 'white',
                ":hover": {
                bgcolor: "#1d3c45",
                color: "#E8AA42"
                }, 
                display: 'flex', alignSelf: 'center'
                }}>ניקוי</Button>
            </Box>
          </FormGroup>
        </Box>
      </div>
    )
  }
  
  export default FarmerFilter