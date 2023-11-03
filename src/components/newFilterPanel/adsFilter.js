import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
import { useState } from 'react';
import { Autocomplete, Box, Button, Checkbox, ListItem, Slider, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import axios from 'axios'
import PropTypes from 'prop-types';
import products from "../../assets/lists"
import { useEffect } from 'react';
import './ads.css';





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

  const AdsFilter = ({filteredPosts, setFilteredPosts}) => {
    const [address, setAddress] = useState("")
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [distance, setDistance] = useState(0);
    const handleDistanceChange = (event, newValue) => {
        setDistance(newValue);
      };
    
    const [isRealAddress, setIsRealAddress] = useState(true);

    const distanceWithoutAddress = address === "" && distance !== 0;
    const addressWithoutDistance = isRealAddress && address !== "" && distance === 0;
    const [validDatesRange, setValidDatesRange] = useState(true);
    const [validDates, setValidDates] = useState(true);
    const notValidRequest = distanceWithoutAddress || !isRealAddress || !validDatesRange || !validDates || addressWithoutDistance;

    useEffect(() => {
      console.log("start: " + startDate)
      console.log("end: " + endDate)
      if(!startDate && !endDate) { // both are null
        setValidDatesRange(true);
        setValidDates(true);
      }
      else if (startDate && endDate) // both are not null
      {
        if(startDate.isValid() && endDate.isValid()) // valid dates
        {
          if(startDate.isBefore(endDate)) // valid range
          {
            setValidDatesRange(true);
            setValidDates(true);
          }
          else { // valid dates, invalid range
            setValidDatesRange(false);
            setValidDates(true);
          }
        }
        else { // at least one of them is invalid
          setValidDates(false);
          setValidDatesRange(true);
        }
      }
      else if(startDate && !startDate.isValid()) { // start is not valid and end is null
        setValidDates(false);
        setValidDatesRange(true);
      }
      else if(endDate && !endDate.isValid()) // end is not valid and start is null
      {
        setValidDates(false);
        setValidDatesRange(true);
      }
      else { // one of them is valid and the other is null
        setValidDates(true);
        setValidDatesRange(false);
      }
    } ,[startDate, endDate]);

    const [coordinates,setCoordinates] = useState({
      lat: null,
      lng: null,
    })    
    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        setCoordinates(latLng);
        setIsRealAddress(true);
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

    const [categories, setCategories] = useState([])
    
    const [organic, setOrganic] = useState(false)
    const handleOrganic = (event) => {
        setOrganic(event.target.checked);};
    
    const [vegan, setVegan] = useState(false)
    const handleVegan = (event) => {
        setVegan(event.target.checked);};

    const handleClear = () => {
      setOrganic(false);
      setVegan(false);
      setDistance(0);
      setCategories([]);
      setAddress('');
      setIsRealAddress(true);
      setCoordinates({
        lat: null,
        lng: null,
      });
      setEndDate(null);
      setStartDate(null);
      axios
      .get('https://farmers2u-backend.onrender.com/api/getposts')
      .then((response) => {
        setFilteredPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    }


    const handleFilter = () => { /* The actual object to extract to the backend */
      const formData = new FormData();

      if (categories && categories.length > 0) {
        const products = categories.map((p) => p.label);
        formData.append('products', products);
      }

      let end = endDate;
      let start = startDate;
      
      if(!end && !start) {
        end = dayjs().add(14, 'day');
        start = dayjs();
      }

      formData.append('isVegan', vegan);
      formData.append('isOrganic', organic);
      formData.append('distance', distance);
      formData.append('startDate', start.format('YYYY-MM-DD'));
      formData.append('endDate', end.format('YYYY-MM-DD'));
      formData.append('isRealAddress', isRealAddress);
      formData.append('latitude', coordinates.lat);
      formData.append('longitude', coordinates.lng);
      formData.append('address', address);

    
      const handleRequest = () => {
        axios
          .post("https://farmers2u-backend.onrender.com/api/filter_posts", formData)
          .then((response) => {
            console.log(response.data)
            setFilteredPosts(response.data)
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
    
    return (
      <div style={{marginRight:"5%", paddingLeft:'8px', direction: 'rtl'}}>
        <FormGroup display='flex' justifyContent='center' sx={{display: 'flex', flexDirection:'column', justifyContent:'center'}}>
            {/* <Typography sx={{marginTop:"-8%", fontFamily:'aleph', fontSize: '36px', color: '#1d3c45', display: 'flex', justifyContent: 'center'}}>סינון מתקדם</Typography> */}
        
       {/* טווח תאריכים */}
        <Typography sx={{fontSize: '20px', color: '#1d3c45', display: 'flex', justifyContent: 'center'}}>
            {'טווח תאריכים'}
        </Typography>
        <Typography sx={{fontSize: '15px', color: 'rgb(141, 141, 138)',display: 'flex', justifyContent: 'center'}}>
               להצגת מכירות בתאריכים הרלוונטיים
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style={{display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 2, justifyContent: 'center'}}>
              <div style={{paddingBottom:' 5%', paddingTop:' 5%', display: 'flex', justifyContent: 'center'}}>
               <DatePicker label={'תאריך התחלה'} views={['day']} sx={{
                  "& label":{left: "unset",
                  right: "1.75rem",
                  transformOrigin: "right"},
                  "& legend": {
                    textAlign: "right",
                  },
                }}
              value={startDate} onChange={(newValue) => setStartDate(newValue)} format='DD/MM/YYYY'/>
               </div>
              <div style={{display: 'flex', justifyContent: 'center'}}>
              <DatePicker label={'תאריך סיום'} views={['day']} sx={{
                 "& label":{left: "unset",
                 right: "1.75rem",
                 transformOrigin: "right"},
                 "& legend": {
                   textAlign: "right",
                 },
                }}
              value={endDate} onChange={(newValue) => setEndDate(newValue)} format='DD/MM/YYYY'/>
              </div>
              {validDates? null
                : 
                <div>
                  <Typography variant='body2' color='error' sx={{textAlign: 'center'}}>יש להזין תאריכים בפורמט תקין</Typography>
                </div>}
                {validDatesRange? null
                : 
                <div>
                  <Typography variant='body2' color='error' sx={{textAlign: 'center'}}>יש להזין טווח תאריכים תקין</Typography>
                </div>}
                {!endDate && !startDate ?
                <div>
                  <Typography variant='body2' color='#E8AA42' sx={{textAlign: 'center'}}>כאשר התאריכים ריקים הטווח הינו השבועיים הקרובים</Typography>
                </div> 
                : null
                }
            </div>
            
          </LocalizationProvider>


        {/* נקודת מוצא */}
        <Typography sx={{paddingTop: '5%', fontSize: '20px', color: '#1d3c45', display: 'flex', justifyContent: 'center'}}>
            {'מיקום נוכחי'}
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
             הכתובת ממנה מגיעים למקום המכירה
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
        <Stack>
             <Typography sx={{fontSize: '20px', color: '#1d3c45', display: 'flex', justifyContent: 'center', paddingTop: '5%'}}>מרחק ממיקום המודעה (בק"מ)</Typography>
             <PrettoSlider
        aria-label="distance"
        defaultValue={0}
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
        </Stack>
        {/* מוצרים */}
        <Typography sx={{fontSize: '20px', color: '#1d3c45', display: 'flex', justifyContent: 'center', paddingTop: '5%'}}>סינון לפי מוצרים</Typography>
        <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      value={categories}
      onChange={(event, newValue) => {
        setCategories([
          ...newValue
        ]);
      }}
      options={products}
      direction= 'rtl'
      disableCloseOnSelect
      getOptionLabel={(option) => option.label}
      ListboxProps={
        {
          style:{
              border: '2px solid #E8AA42',
          }
        }
      }
      noOptionsText = 'אין תוצאות'
      renderOption={(props, option, { selected }) => (
        <ListItem direction = 'rtl' {...props} sx={{direction: 'rtl', fontSize: '18px', position: 'relative',
        '&:hover': {backgroundColor: '#E8AA42!important'}, '&&.Mui-selected':{color: '#E8AA42!important'}}}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
            direction = 'rtl'
            sx={{direction: 'rtl', '&.Mui-checked':{color: "black"}}}
          />
          <div style={{direction: 'rtl'}}>{option.label}</div>
        </ListItem>
      )}
      style={{ width: '100%', direction: 'rtl'}}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <StyledTag label={option.label} {...getTagProps({ index })} />
      ))}
      renderInput={(params) => (
        <TextField {...params} placeholder="סוגי מוצרים"  direction= 'rtl'/>
      )}
      sx={{paddingTop:'0%', direction: 'rtl'}}
    />
        {/* אורגני,טבעוני */}
        <div className='vegan_organic'
        style={{display:'flex', mt:'11px', justifyContent:'center', direction: 'ltr'}}>
                <FormControlLabel control={<Checkbox checked={organic} onChange={handleOrganic} sx={{fontFamily:'aleph','&.Mui-checked':{color: "#E8AA42"}}} />} label={<Typography 
                  sx={{fontSize: '1.25rem'}}>אורגני</Typography>}
                  sx={{
                    width:'100%',
                    display: 'flex',
                    alignItems: 'center',
                    
                    direction: 'rtl'
                }} />
                <FormControlLabel control={<Checkbox checked={vegan} onChange={handleVegan} sx={{fontFamily:'aleph','&.Mui-checked':{color: "#E8AA42"}}} />} label={<Typography 
                  sx={{fontSize: '1.25rem'}}>טבעוני</Typography>}
                  sx={{
                    width:'100%',
                    display: 'flex',
                    alignItems: 'center',
                    
                    direction: 'rtl'
                }} />
        </div>
        </FormGroup>
        <Box display= 'flex' justifyContent='center' paddingBottom= '5px' paddingTop= '5%' gap= {3} sx={{direction: 'rtl'}}>
            <Button disabled = {notValidRequest} sx={{fontFamily:'aleph',backgroundColor: '#E8AA42', color: 'black',
            ":hover": {
            bgcolor: "#E8AA42",
            color: "white"
            }, display: 'flex', alignSelf: 'center'
            }} onClick={handleFilter}>הפעלת סינון</Button>
            <Button onClick={handleClear} sx={{fontFamily:'aleph',backgroundColor: '#1d3c45', color: 'white',
                ":hover": {
                bgcolor: "#1d3c45",
                color: "#E8AA42"
                }, 
                display: 'flex', alignSelf: 'center'
                }}>ניקוי
            </Button>
        </Box>
        
      </div>
    )
  }
  
  export default AdsFilter