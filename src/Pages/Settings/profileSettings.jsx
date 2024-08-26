import { Autocomplete, Box, Button, Checkbox, Container, InputAdornment, InputBase, ListItem, Stack, Switch, TextField, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState, useRef } from 'react'
import './profileSettings.css'
import { AssignmentInd, CheckBox, CheckBoxOutlineBlank, Close, Facebook, Home, Instagram, Language, Person2, Phone, WhatsApp } from '@mui/icons-material'
import AddPost from '../../components/Post/AddPost'
import WorkingHours from '../../components/Settings/workingHours'
import axios from 'axios'
import PlacesAutocomplete from 'react-places-autocomplete';
import {styled} from '@mui/material/styles'
import Slider from '../ShowFarmerProfile/ImageSlider'
import dayjs from 'dayjs'
import UserPosts from './userPosts'
import './userPosts.css'
import PropTypes from 'prop-types';
import {ValidateFacebook, ValidateFarmName, ValidateFarmerName, ValidateInstagram, ValidatePhone, ValidateWebsite, ValidateWhatsapp} from '../../components/validations'

import products from '../../assets/lists';
import CircularProgress from '@mui/material/CircularProgress';

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

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

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
        left: 8,
      },
      '&:before': {
        content: '"לא"',
        right: 5,
      },
    },
  }));




const ProfileSettings = (props) => {

    const [loading, setLoading] = useState(true);
    const [logoFlag, setLogoFlag] = useState(false);
    const [productsFlag, setProductsFlag] = useState(false);
    const [farmFlag, setFarmFlag] = useState(false);
    const [newLogo, setNewlogo] = useState("");
    const [productsImagesToDelete, setProductsImagesToDelete] = useState([]);
    const [productsImagesToAdd, setProductsImagesToAdd] = useState([]);
    const [productsImagesToAddIndex, setProductsImagesToAddIndex] = useState([]);
    const [farmImagesToDelete, setFarmImagesToDelete] = useState([]);
    const [farmImagesToAdd, setFarmImagesToAdd] = useState([]);
    const [farmImagesToAddIndex, setFarmImagesToAddIndex] = useState([]);
    const [farmName, setFarmName] = useState("");
    const [email, setEmail] = useState("");
    const [about, setAbout] = useState("");
    const [whatsApp, setWhatsapp] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [menu,setMenu] = useState("");
    const [categories, setCategories] = useState([])
    
    const handleSelect = value => {
        setAddress(value);
        setValidAddress(true);
      };
    const [farmer, setFarmer] = useState("");
    const [delivery, setDelivery] = useState('');
    const [shipping_distance, setShippingDist] = useState(0);
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [website, setWebsite] = useState("");
    const [isShipping, setIsShipping] = useState(false)
    const [logo, setLogo] = useState("");
    const [farmImages, setFarmImages] = useState([]);
    const [productsImages, setProductsImages] = useState([]);
    const [sundayOpening, setSundayOpening] = useState(null);
    const [sundayClosing, setSundayClosing] = useState(null);
    const [mondayOpening, setMondayOpening] = useState(null);
    const [mondayClosing, setMondayClosing] = useState(null);
    const [tuesdayOpening, setTuesdayOpening] = useState(null);
    const [tuesdayClosing, setTuesdayClosing] = useState(null);
    const [wednesdayOpening, setWednesdayOpening] = useState(null);
    const [wednesdayClosing, setWednesdayClosing] = useState(null);
    const [thursdayOpening, setThursdayOpening] = useState(null);
    const [thursdayClosing, setThursdayClosing] = useState(null);
    const [fridayOpening, setFridayOpening] = useState(null);
    const [fridayClosing, setFridayClosing] = useState(null);
    const [saturdayOpening, setSaturdayOpening] = useState(null);
    const [saturdayClosing, setSaturdayClosing] = useState(null);

    const [validPhone, setValidPhone] = useState(true);
    const [validWhatsapp, setValidWhatsapp] = useState(true);
    const [validWebsite, setValidWebsite] = useState(true);
    const [validFacebook, setValidFacebook] = useState(true);
    const [validInstagram, setValidInstagram] = useState(true);
    const [validAddress, setValidAddress] = useState(true);
    const [ValidFarmer, setValidFarmer] = useState(true);
    const [validFarmName, setValidFarmName] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);

    const [validSunday, setValidSunday] = useState(true);
    const [validMonday, setValidMonday] = useState(true);
    const [validTuesday, setValidTuesday] = useState(true);
    const [validWednesday, setValidWednesday] = useState(true);
    const [validThursday, setValidThursday] = useState(true);
    const [validFriday, setValidFriday] = useState(true);
    const [validSaturday, setValidSaturday] = useState(true);

    const [disabledLogo, setDisabledLogo] = useState(Array(2).fill(false)); //disable: [delete logo, replace logo]
    const validDays = validSunday && validMonday && validTuesday && validWednesday && validThursday && validFriday && validSaturday;
    const shipppingWithoutDist = isShipping && (shipping_distance === '0' || shipping_distance === "");
    const validForm = validPhone && validWhatsapp && validWebsite && validFacebook && validInstagram && validDays && validAddress && ValidFarmer && validFarmName && address && address !== "" && phone && phone !== "" && !shipppingWithoutDist;
  
  
  

    const handleSwitch = (event) => {
        const val = event.target.checked;
        setIsShipping(val);
        if(val === false){
            setShippingDist(0);
        }
        
      };
    
      const handleChangeAddress = value => {
        setAddress(value);
        if (value === "") {
          setValidAddress(true);
        }
        else{
          setValidAddress(false);
        }
        console.log(value);
      };
    
    function checkNull(val , alternative, format) {
        if (format === true){
            const ret1 = val !== null? val.format() : alternative;
            return(ret1)
        }
        else{
            const ret2 = val !== "none"? dayjs(val) : alternative;
            return (ret2);
        }

    }

    function put_hours(open){
        if(open === true){
            const res1 = checkNull(sundayOpening, "none", true) + "," 
            + checkNull(mondayOpening, "none", true) + ","
            + checkNull(tuesdayOpening, "none", true) + ","
            + checkNull(wednesdayOpening, "none", true) + ","
            + checkNull(thursdayOpening, "none", true) + ","
            + checkNull(fridayOpening, "none", true) + ","
            + checkNull(saturdayOpening, "none", true);
            return res1;
        }
        else{
            const res2 = checkNull(sundayClosing, "none", true) + "," 
            + checkNull(mondayClosing, "none", true) + ","
            + checkNull(tuesdayClosing, "none", true) + ","
            + checkNull(wednesdayClosing, "none", true) + ","
            + checkNull(thursdayClosing, "none", true) + ","
            + checkNull(fridayClosing, "none", true) + ","
            + checkNull(saturdayClosing, "none", true);
            return res2;
        }
    }

    const storedEmail = localStorage.getItem('email');
    const profileEmail = props.token?.profile_email || storedEmail || '';
    const token = useRef(props.token).current;
    const getUsers = useCallback(() => {
      axios({
        method: 'GET',
        url: `https://farmers2u-backend.onrender.com/settings/${profileEmail}`,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((response) => {
          console.log(response);
          const res = response.data;
          setFarmName(res.farm_name);
          setEmail(profileEmail);
          setAbout(res.about);
          setWhatsapp(res.phone_number_whatsapp);
          setPhone(res.phone_number_official);
          setAddress(res.address);
          setAbout(res.about);
          setFacebook(res.facebook);
          setInstagram(res.instagram);
          setWebsite(res.farm_site);
          setMenu(res.products);
          setIsShipping(JSON.parse(res.is_shipping));
          setShippingDist(res.shipping_distance);
          setDelivery(res.delivery_details);
          setFarmer(res.farmer_name);
          
          setLogo(res.logo_picture);
          setFarmImages(res.farm_images_list);
          setProductsImages(res.products_images_list);

          
          const open = res.opening_hours.split(",");

          setSundayOpening(checkNull(open[0], null, false));
          setMondayOpening(checkNull(open[1], null, false));
          setTuesdayOpening(checkNull(open[2], null, false));
          setWednesdayOpening(checkNull(open[3], null, false));
          setThursdayOpening(checkNull(open[4], null, false));
          setFridayOpening(checkNull(open[5], null, false));
          setSaturdayOpening(checkNull(open[6], null, false));


          const close = res.closing_hours.split(",");
          setSundayClosing(checkNull(close[0], null, false));
          setMondayClosing(checkNull(close[1], null, false));
          setTuesdayClosing(checkNull(close[2], null, false));
          setWednesdayClosing(checkNull(close[3], null, false));
          setThursdayClosing(checkNull(close[4], null, false));
          setFridayClosing(checkNull(close[5], null, false));
          setSaturdayClosing(checkNull(close[6], null, false));

          
          let types = null;
          if(res.types_of_products === ''){
              types = [];
          }
          else{
            const products_list = res.types_of_products.split(',');
            const matchingProducts = products.filter((prod) => 
              products_list.includes(prod.label));
              types = matchingProducts;
          }
          setCategories(types);
          setIsInitialized(true);
          setLoading(false);
        })

        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    }, [profileEmail, token]);

    useEffect(() => {
        setIsInitialized(false);
        getUsers();
      }, [props.token, props.profileEmail, getUsers]);
  


      const handleSave = (data) => {
        data.preventDefault();
        const data_update = new FormData(); 
        data_update.append("jsonData", JSON.stringify({
          //email: "golan@gmail.com",
          email: email,
          //google_name: values.google_name,
          //google_family_name: values.google_family_name,
          //google_profile_picture: values.google_profile_picture,
          shipping_distance: shipping_distance,
          is_shipping: isShipping,
          opening_hours: put_hours(true),
          closing_hours: put_hours(false),
          farm_name: farmName,
          about: about,
          phone_number_official: phone,
          phone_number_whatsapp: whatsApp,
          phone_number_telegram: "0",
          address: address,
          types_of_products: categories.map((category) => (category.label)).join(','),
          farmer_name: farmer,
          delivery_details: delivery,
          products: menu,
          farm_site: website,
          facebook: facebook,
          instagram: instagram

        }))
        if (newLogo && newLogo !== "https://storage.cloud.google.com/farmers2u_images/farmers2u_logo.png"){
          //alert(newLogo)
          for (let i = 0; i < newLogo.length; i++) {
            //alert(logo[i])
            console.log(newLogo)
            data_update.append("files[]", newLogo[i]);
            data_update.append("labels[]", "1");
          }
        }
        if (logoFlag){
          setLogoFlag(false)
          data_update.append("labels[]", "4");
        }

        if (productsFlag) {
          setProductsFlag(false);

          if (productsImagesToDelete !== 0){
            // need to add check in the delete if it's an image that was added and than deleted 
            console.log("productsImagesToDelete", productsImagesToDelete)
            const imagesToDeleteString = `5@${productsImagesToDelete.join('@')}`;
            data_update.append("labels[]", imagesToDeleteString);
          }
          if (productsImagesToAdd !== 0){
            let imagesIndexToAdd = ""
            for (let j = 0; j < productsImagesToAddIndex.length; j++){
              imagesIndexToAdd = `2@${productsImagesToAddIndex.join('@')}`;
              data_update.append("labels[]", imagesIndexToAdd);
            }

            for (let i = 0; i < productsImagesToAdd.length; i++) {
                console.log(productsImagesToAdd)
                data_update.append("files[]", productsImagesToAdd[i]);
              }
          }

        }

        if (farmFlag){
          setFarmFlag(false)
          console.log("FARMIMAGESTODELETE", farmImagesToDelete)
          if (farmImagesToDelete !== 0){
            // need to add check in the delete if it's an image that was added and than deleted 
            const imagesToDeleteString = `6@${farmImagesToDelete.join('@')}`;
            data_update.append("labels[]", imagesToDeleteString);
          }
          if (farmImagesToAdd !== 0){
            let imagesIndexToAdd = ""
            for (let j = 0; j < farmImagesToAddIndex.length; j++){
              imagesIndexToAdd = `3@${farmImagesToAddIndex[j]}`;
              data_update.append("labels[]", imagesIndexToAdd);
            }
            for (let i = 0; i < farmImagesToAdd.length; i++) {
                console.log(farmImagesToAdd)
                data_update.append("files[]", farmImagesToAdd[i]);
              }
          }
        }

          axios.put(`https://farmers2u-backend.onrender.com/settings/${profileEmail}`, data_update, {
            headers: {
              Authorization: 'Bearer ' + props.token,
            }
          })
          .then(function (response) {
            //handle success
            console.log(response)
            localStorage.setItem('farmName', farmName)
            localStorage.setItem('profilePicture', response.data.profilePicture)
            alert('המשתמש עודכן בהצלחה.'); 
            window.location.href = '/settings'
      })
      .catch(function (response) {
        //handle error
        console.log(response)
        if (response.status === 400) {
            alert("שגיאה");
        }
    });
    }

    const handleDeletePhotoLogo = () => {
        setLogoFlag(true)
        setLogo("https://storage.cloud.google.com/db_storage_farmers2u/farmers2u_logo.png")
        setNewlogo("")
        const disable = [...disabledLogo];
        disable[1] = true;
        setDisabledLogo(disable);
    }

    /*
    const checkValidNumberOfImages = (number, e) => {
      if (!filesNumberValidation(number)){
        alert("מותר להעלות עד 5 קבצים.");
        e.target.value = null; 
        return e;
      }

    }
    */
    const checkValidImage = (image, e) => {
      if (!fileMaxSize(image)){
        alert("גודל מקסימלי עבור קובץ הוא 5MB.");
        return e;
      }
      if (!fileTypeValidation(image)) {
        e.target.value = null; // Clear the input field
        alert("מותר לצרף תמונות בפורמט PNG, JPEG או JPG בלבד.");
        return e;
      }
      if (!fileSpecialChars(image)) {
        alert("שם הקובץ מכיל תווים לא חוקיים.");
        e.target.value = null; 
        return e
      }

    }
    const handleChangePhotoLogo = (e) => {
      let disable;
      if (e.target.files.length > 0) {
        const selectedPhotos = e.target.files;
        disable = [...disabledLogo];
        disable[0] = true;
        setDisabledLogo(disable);
        for (let i = 0; i < selectedPhotos.length; i++) {
          e = checkValidImage(selectedPhotos[i], e)
        }
        setNewlogo(selectedPhotos);
        setLogoFlag(false);
        console.log(selectedPhotos);
      }
      else {
        disable = [...disabledLogo];
        disable[0] = false;
        setDisabledLogo(disable);
      }
    };

    /*const handleAddImages = (newImages, clickIndex, farmOrProducts) => {
      console.log("New Images")
      console.log(newImages)
      let indexImageListToAdd = []

      if (farmOrProducts == "farm"){
        setFarmImagesToAdd(newImages)
        indexImageListToAdd[0] = "3"
        indexImageListToAdd[1] = len(newImages)

        setFarmImagesToAddIndex([
          ...(farmImagesToAddIndex ?? []),
          indexImageListToAdd
        ]);
      }
      else if (farmOrProducts == "products"){
        setProductsImagesToAdd(newImages)
        indexImageListToAdd[0] = "2"
        indexImageListToAdd[1] = len(newImages)

        setProductsImagesToAddIndex()

      }

    }*/
    const handleAddImages = (newImages, sliderKey, clickIndex, farmOrProducts, updatedSlides) => {
      let imageToAdd = [];
      let indexImageToAdd
    
      if (farmOrProducts === "farm") {
        imageToAdd = [...farmImagesToAdd, ...newImages]; // Add the deleted image to the deletion list
        indexImageToAdd = [...farmImagesToAddIndex, clickIndex]

        setFarmImagesToAddIndex(indexImageToAdd)
        setFarmImagesToAdd(imageToAdd)
        setFarmFlag(true);

        console.log(indexImageToAdd)
        console.log(imageToAdd)

       setFarmImages(updatedSlides)

      } else if (farmOrProducts === "products") {
        imageToAdd = [...productsImagesToAdd, ...newImages]; // Add the deleted image to the deletion list
        indexImageToAdd = [...productsImagesToAddIndex, clickIndex]
        console.log(indexImageToAdd)
        console.log(imageToAdd)

        setProductsImagesToAddIndex(indexImageToAdd)
        setProductsImagesToAdd(imageToAdd)
        setProductsFlag(true)


        setProductsImages(updatedSlides)
      }
    };
    
    const handleDeleteImages = (indexToDelete, farmOrProducts) => {
      let updatedImages = [];
      let imageToDelete;
      let imagesToDelete = [];
  
      if (farmOrProducts === "farm") {
          updatedImages = farmImages.slice(); // Create a shallow copy of farmImages
          imageToDelete = updatedImages.splice(indexToDelete, 1)[0]; // Remove and store the deleted image
          setFarmImages(updatedImages); // Update state with the new array
          imagesToDelete = [...farmImagesToDelete, imageToDelete]; // Add the deleted image to the deletion list
          setFarmFlag(true);
          setFarmImagesToDelete(imagesToDelete); // Update the images to delete
  
          if (farmImagesToAdd != null) {
              // Update indices for images to be added
              for (let i = 0; i < farmImagesToAddIndex.length; i++) {
                  if (farmImagesToAddIndex[i] < indexToDelete) {
                      // do nothing
                  } else if (farmImagesToAddIndex[i] === indexToDelete) {
                      farmImagesToAdd.splice(i, 1);
                      farmImagesToAddIndex.splice(i, 1);
                      i--; // Adjust loop index due to removal
                  } else {
                      farmImagesToAddIndex[i] -= 1;
                  }
              }
          }
      } else if (farmOrProducts === "products") {
          updatedImages = productsImages.slice(); // Create a shallow copy of productsImages
          imageToDelete = updatedImages.splice(indexToDelete, 1)[0]; // Remove and store the deleted image
          setProductsImages(updatedImages); // Update state with the new array
          imagesToDelete = [...productsImagesToDelete, imageToDelete]; // Add the deleted image to the deletion list
          setProductsFlag(true);
          setProductsImagesToDelete(imagesToDelete); // Update the images to delete
  
          if (productsImagesToAdd != null) {
              // Update indices for images to be added
              for (let i = 0; i < productsImagesToAddIndex.length; i++) {
                  if (productsImagesToAddIndex[i] < indexToDelete) {
                      // do nothing
                  } else if (productsImagesToAddIndex[i] === indexToDelete) {
                      productsImagesToAdd.splice(i, 1);
                      productsImagesToAddIndex.splice(i, 1);
                      i--; // Adjust loop index due to removal
                  } else {
                      productsImagesToAddIndex[i] -= 1;
                  }
              }
          }
      }
  };

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
  /*
    const filesNumberValidation = (numberOfImagesToUpload) => {
      const MAX_FILES = 5;
      if (numberOfImagesToUpload > MAX_FILES) {
        return false
      }
      return true
    }
  */
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


    

  return (
    // <ThemeProvider theme={themeForButton}>
    <Box sx={{
        direction: 'rtl',
        dispaly: 'flex',
        flexDirection:'column'
    }}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div style={{flex: 0.5}}></div>
        <Typography mt={4} fontFamily="Secular One" fontWeight="bold" variant='h2' sx={{
        flex: 5,
        display: 'flex',
        justifyContent: 'center',
        color: "#ffb74d",
        WebkitTextStroke: "0.1px #757575"
        }}> {`אזור אישי`}
        </Typography>
        <div style={{flex: 0.5}}>
        <AddPost vert={{ mt: 4}} notFixed={true}/>
        </div>
      </div>
      {loading ?
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CircularProgress style={{ color: '#E8AA42', width: '70px', height: '70px' }} />
        <span className="loadingText" style={{ color: '#1d3c45', fontSize: '18px', marginTop: '1rem' }}>
          טוען מידע...
        </span>
      </Box>
    </div>
      :
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: '4fr 4fr'
        }}>
            <Container sx={{
                flex: 5,
                width: '100%',
            }}>
                <form>
                <Box gap={3} sx={{display: 'flex'}}>
                <Box gap= {1}  sx={{
                        mt: '2rem', flex: 4
                    }}>
                        <label className='inputLabel'>שם העסק:</label>
                        <Box width= '100%' border='2px solid #1d3c45' borderRadius='1rem'
                        alignItems='center' display= 'flex' gap='1rem' overflow='hidden'>
                            <Box fontSize='2rem' bgcolor= '#1d3c45' padding= '0.5rem 1rem'
                            color='white' display= 'grid' cursor='pointer'>
                                <Person2/>
                            </Box>
                            <TextField
                            InputProps={{ disableUnderline: true }}
                            variant='standard'
                            width= '100%'
                            type='text'
                            value= {farmName}
                            onChange={(event) => {
                                setFarmName(event.target.value);
                            }}
                            className='Form_box_input'
                            />
                        </Box>
                        <ValidateFarmName farmName={farmName} setValidFlag={setValidFarmName} isInitialized={isInitialized}/>
                    </Box>
                    <Box gap= {1}  sx={{
                        mt: '2rem', flex: 2.5
                    }}>
                        <label className='inputLabel'>טלפון:</label>
                        <Box width= '100%' border='2px solid #1d3c45' borderRadius='1rem'
                        alignItems='center' display= 'flex' gap='1rem' overflow='hidden'>
                            <Box fontSize='2rem' bgcolor= '#1d3c45' padding= '0.5rem 1rem'
                            color='white' display= 'grid' cursor='pointer'>
                                <Phone />
                            </Box>
                            <TextField
                            InputProps={{ disableUnderline: true }}
                            variant='standard'
                            width= '100%'
                            type='text'
                            value={phone}
                            onChange={(event) => {
                                setPhone(event.target.value);
                            }}
                            className='Form_box_input'
                            sx={{direction : 'ltr', paddingLeft: '8%'}}
                            />
                        </Box>
                        <ValidatePhone phone={phone} setValidFlag={setValidPhone}/>
                        {phone === "" && validPhone && isInitialized ?
                        <div style={{height:0}}>
                          <Typography variant='body2' color="error">שדה חובה</Typography>
                        </div>
                        : null
                        }
                    </Box>
                    </Box>
                    <Box gap={3} sx={{display: 'flex'}}>
                    
                    <Box gap= {1}  sx={{
                            mt: '2rem', flex: 2.5
                        }}>
                            <label className='inputLabel'>וואטסאפ:</label>
                            <Box width= '100%' border='2px solid #1d3c45' borderRadius='1rem'
                            alignItems='center' display= 'flex' gap='1rem' overflow='hidden'>
                                <Box fontSize='2rem' bgcolor= '#1d3c45' padding= '0.5rem 1rem'
                                color='white' display= 'grid' cursor='pointer'>
                                    <WhatsApp />
                                </Box>
                                <TextField
                                InputProps={{ disableUnderline: true, style: { textAlign: 'center' } }}
                                type='text'
                                variant='standard'
                                value={whatsApp}
                                onChange={(event) => {
                                    setWhatsapp(event.target.value);
                                }}
                                className='Form_box_input'
                                sx={{paddingLeft: '8%',width:'100%', border: '0', bgcolor: 'transparent', outline:'none', height: '30px', direction: 'ltr'}}
                                />
                            </Box>
                            <ValidateWhatsapp whatsapp={whatsApp} setValidFlag={setValidWhatsapp}/>
                    </Box>
                    <Box gap= {1}  sx={{
                        mt: '2rem', flex: 4
                    }}>
                        <label className='inputLabel'>שם איש קשר:</label>
                        <Box width= '100%' border='2px solid #1d3c45' borderRadius='1rem'
                        alignItems='center' display= 'flex' gap='1rem' overflow='hidden'>
                            <Box fontSize='2rem' bgcolor= '#1d3c45' padding= '0.5rem 1rem'
                            color='white' display= 'grid' cursor='pointer'>
                                <AssignmentInd />
                            </Box>
                            <TextField
                            InputProps={{ disableUnderline: true }}
                            variant='standard'
                            width= '100%'
                            type='text'
                            value={farmer}
                            onChange={(event) => {
                                setFarmer(event.target.value);
                            }}
                            className='Form_box_input'
                            />
                        </Box>
                        <ValidateFarmerName name={farmer} setValidFlag={setValidFarmer} />
                    </Box>
                    </Box>
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
                <Box gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <label className='inputLabel'>כתובת/מיקום:</label>
                        <Box width= '100%' border='2px solid #1d3c45' borderRadius='1rem'
                        alignItems='center' display= 'flex' gap='1rem' overflow='hidden'>
                            <Box fontSize='2rem' bgcolor= '#1d3c45' padding= '0.5rem 1rem'
                            color='white' display= 'grid' cursor='pointer'>
                                <Home/>
                            </Box>
                <InputBase
                inputProps={{disableUnderline:true, ...getInputProps({
                    disableUnderline: true,
                    className: 'underline',
                    direction: 'rtl',
                  })}}
                  variant='standard'
                  width= '100%'
                  type='text'
                  disableUnderline= {true}
                  height= '100%'
                  sx={{
                    direction: 'rtl',
                    WebkitTextUnderlinePosition: 'none',
                    width: '100%',
                    position: 'relative',
                    fontSize: '16px',
                    border: 'none'
                }}
                />
                </Box>
                    </Box>
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
                {validAddress ? null : 
                        <div>
                          <Typography variant='body2' color="error">יש ללחוץ על כתובת מבין האופציות המוצעות</Typography>
                        </div>
                }
                { address === "" && isInitialized ?
                <div>
                  <Typography variant='body2' color="error">שדה חובה</Typography>
                </div>
                : null
                }
              </div>
            )}
          </PlacesAutocomplete>
                    <Box gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <label className='inputLabel'>ימי ושעות עבודה:</label>
                        <Box width= '100%' border='2px solid #1d3c45' borderRadius='1rem'
                        alignItems='center' display= 'flex' flexDirection= 'column' gap='1rem' overflow='hidden'>
                            <WorkingHours day = 'ראשון' setValidFlag = {setValidSunday} opening = {sundayOpening} closing = {sundayClosing} setOpening = {setSundayOpening} setClosing={setSundayClosing}/>
                            <WorkingHours day = 'שני' setValidFlag = {setValidMonday} opening = {mondayOpening} closing = {mondayClosing} setOpening = {setMondayOpening} setClosing={setMondayClosing}/>
                            <WorkingHours day = 'שלישי' setValidFlag = {setValidTuesday} opening = {tuesdayOpening} closing = {tuesdayClosing} setOpening = {setTuesdayOpening} setClosing={setTuesdayClosing}/>
                            <WorkingHours day = 'רביעי' setValidFlag = {setValidWednesday} opening = {wednesdayOpening} closing = {wednesdayClosing} setOpening = {setWednesdayOpening} setClosing={setWednesdayClosing}/>
                            <WorkingHours day = 'חמישי' setValidFlag = {setValidThursday} opening = {thursdayOpening} closing = {thursdayClosing} setOpening = {setThursdayOpening} setClosing={setThursdayClosing}/>
                            <WorkingHours day = 'שישי' setValidFlag = {setValidFriday} opening = {fridayOpening} closing = {fridayClosing} setOpening = {setFridayOpening} setClosing={setFridayClosing}/>
                            <div className="lastHour">
                            <WorkingHours day = 'שבת' setValidFlag = {setValidSaturday} opening = {saturdayOpening} closing = {saturdayClosing} setOpening = {setSaturdayOpening} setClosing={setSaturdayClosing}/>
                            </div>
                        </Box>
                    </Box>
                    <Box  gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <label className='inputLabel'>תיאור:</label>
                        <TextField 
                        id="outlined-multiline-static"
                        multiline
                        rows={8}
                        fullwidth
                        width= '100%'
                        value= {about}
                        onChange={(event) => {
                            setAbout(event.target.value);
                        }}
                        sx={{
                            width: '100%'
                        }} />
                    </Box>
                    <Box gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <label className='inputLabel'>סוגי מוצרים:</label>
                        {/* <CheckboxMenu handleClick={handleClick} anchorEl={anchorEl} selectedItems={selectedItems} handleRemove={handleRemove} handleClose={handleClose} labels={labels} checked={checked} handleToggle={handleToggle}/> */}
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
                        style={{ width: '100%', direction: 'rtl'}}
                        value={categories}
                        onChange={(event, newValue) => {
                          console.log(newValue);
                          setCategories([
                            ...newValue
                          ]);
                        }}
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
                            sx={{
                              direction: 'rtl',
                            }}
                          />
                          </div>
                        )}
                      />
                    </Box>
                    <Box gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <label className='inputLabel'>מחירון:</label>
                        <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={8}
                        fullwidth
                        width= '100%'
                        value= {menu}
                        onChange={(event) => {
                            setMenu(event.target.value);
                        }}
                        sx={{
                            width: '100%'
                        }} />
                    </Box>
                    <Box gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <Stack direction='row' gap={3} alignItems="center" display='flex' justifyContent='center'>
                            <Typography fontSize= '20px' color= 'rgb(23, 23, 91)'>העסק עושה משלוחים?</Typography>
                            <IOSSwitch checked = {isShipping} onChange= {handleSwitch}/>
                        </Stack>
                    </Box>
                    
                    {isShipping? 
                    <Box gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <Box display='flex' justifyContent='center'>
                            <TextField
                            label='טווח משלוחים'
                            type = 'number'
                            sx={{alignSelf:'center',direction: 'ltr', m: 1, width: '12ch', 
                            "& label":{left: "unset",
                            right: "1.75rem",
                            transformOrigin: "right"},
                            "& legend": {
                            textAlign: "right",
                            }}}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">ק"מ</InputAdornment>,
                                inputProps: { min: "0", max: "150", step: "1" }
                            }}
                            value = {shipping_distance}
                            onChange={(event) => {
                                console.log(event.target.value);
                                setShippingDist(event.target.value);
                            }}
                            />
                        </Box>
                        {shipppingWithoutDist ? 
                            <div style={{hight:0}}>
                              <Typography variant='body2' color= 'error' sx={{textAlign:'center'}}>יש להזין טווח משלוחים</Typography>
                            </div>
                            : null}
                    </Box>: null}
                    <Box gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <label className='inputLabel'>מדיניות משלוחים והזמנות:</label>
                        <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={8}
                        fullwidth
                        width= '100%'
                        value = {delivery}
                        onChange={(event) => {
                            setDelivery(event.target.value);
                        }}
                        sx={{
                            width: '100%',
                        }} />
                    </Box>
                    <Box gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <label className='inputLabel'>קישור לאתר:</label>
                        <Box width= '100%' border='2px solid #1d3c45' borderRadius='1rem'
                        alignItems='center' display= 'flex' gap='1rem' overflow='hidden'>
                            <Box fontSize='2rem' bgcolor= '#1d3c45' padding= '0.5rem 1rem'
                            color='white' display= 'grid' cursor='pointer'>
                                <Language />
                            </Box>
                            <TextField
                            InputProps={{ disableUnderline: true }}
                            variant='standard'
                            width= '100%'
                            type='text'
                            value={website}
                            onChange={(event) => {
                                setWebsite(event.target.value);
                            }}
                            sx={{direction: 'ltr',  paddingLeft: '4%'}}
                            className='Form_box_input'
                            />
                        </Box>
                        <ValidateWebsite url={website} setValidFlag={setValidWebsite}/>
                    </Box>
                    <Box gap= {1}  sx={{
                            mt: '2rem', flex: 4
                        }}>
                            <label className='inputLabel'>קישור לפייסבוק:</label>
                            <Box width= '100%' border='2px solid #1d3c45' borderRadius='1rem'
                            alignItems='center' display= 'flex' gap='1rem' overflow='hidden'>
                                <Box fontSize='2rem' bgcolor= '#1d3c45' padding= '0.5rem 1rem'
                                color='white' display= 'grid' cursor='pointer'>
                                    <Facebook/>
                                </Box>
                                <TextField
                                InputProps={{ disableUnderline: true }}
                                type='text'
                                variant='standard'
                                value= {facebook}
                                onChange={(event) => {
                                    setFacebook(event.target.value);
                                }}
                                className='Form_box_input'
                                sx={{direction: 'ltr',justifyContent:'center' ,width:'100%', border: '0', bgcolor: 'transparent', outline:'none', height: '30px',  paddingLeft: '4%'}}
                                />
                            </Box>
                            <ValidateFacebook facebook={facebook} setValidFlag={setValidFacebook}/>
                        </Box>
                    <Box gap= {1}  sx={{
                            mt: '2rem', flex: 4
                        }}>
                            <label className='inputLabel'>קישור לאינסטגרם:</label>
                            <Box width= '100%' border='2px solid #1d3c45' borderRadius='1rem'
                            alignItems='center' display= 'flex' gap='1rem' overflow='hidden'>
                                <Box fontSize='2rem' bgcolor= '#1d3c45' padding= '0.5rem 1rem'
                                color='white' display= 'grid' cursor='pointer'>
                                    <Instagram />
                                </Box>
                                <TextField
                                InputProps={{ disableUnderline: true }}
                                type='text'
                                variant='standard'
                                value = {instagram}
                                onChange={(event) => {
                                    setInstagram(event.target.value);
                                }}
                                className='Form_box_input'
                                sx={{direction: 'ltr',justifyContent:'center' ,width:'100%', border: '0', bgcolor: 'transparent', outline:'none', height: '30px',  paddingLeft: '4%'}}
                                />
                            </Box>
                            <ValidateInstagram instagram={instagram} setValidFlag={setValidInstagram}/>
                        </Box>
                    <Box display= 'flex' mt={5} mb={5} justifyContent='center' sx={{color: '#1d3c45'}}>
                    <Button disabled = {!validForm} variant='contained' color= 'success' onClick={handleSave} sx={{justifyContent: 'center'}}>שמירת פרטים</Button>
                    </Box>
                </form>
            </Container>
            <Container>
                <Box gap={10} sx={{display: 'grid',gridTemplate: '1fr', justifyContent: 'center'}}>
                    <Box className='account_box_img' sx={{
                        mt: '2rem',
                        position: 'relative',
                        textAlign: 'center'
                    }}>
                        <img
                        alt='logo'
                        src = {logo}
                        width= {150}
                        height= {150}
                        className= 'profileImg'
                        sx={{marginBottom: '10px'}}
                        />
                        <div style={{display: 'flex', justifyContent: 'space-around'}}>
                          <div>
                          <label className='inputLabel'>החלפת תמונה</label>
                        <Box width= '100%' border='2px solid #1d3c45' borderRadius='1rem'
                        alignItems='center' display= 'flex' gap='1rem' overflow='hidden'>
                        <input
                                type="file"
                                label =""
                                name="logo_picture"
                                onChange={handleChangePhotoLogo}
                                disabled = {disabledLogo[1]}
                              />
                        </Box>
                          </div>
                          <Button disabled = {disabledLogo[0]}
                          sx={{
                            fontFamily: 'aleph',
                            backgroundColor: '#E8AA42',
                            color: 'black',
                            marginTop: '5px',
                            ':hover': {
                              bgcolor: '#E8AA42',
                              color: 'white',
                            },
                          }}
                          onClick={handleDeletePhotoLogo}
                        >
                          מחיקת הלוגו הקיים
                        </Button>
                        </div>
                    </Box>
                    <Box sx={{
                            width: '580px',
                            height: '300px',
                            marginBottom: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                    <Box display= 'flex' justifyContent='center'>
                    <Typography  sx={{fontWeight: '600', fontSize: '30px',justifySelf: 'center', color: '#1d3c45'}}>תמונות המקום</Typography>
                    </Box>
                    <Box sx={{ minWidth: '580px', minHeight: '300px', marginBottom: '20px'}}>
                      <Slider sliderKey="farmSlider" key="farmImages" initialSlides={farmImages} farm={false} handleDeleteImages={handleDeleteImages} handleAddImages={handleAddImages} farmOrProducts={"farm"}/>
                    </Box>
                    </Box>
                    <Box sx={{
                                width: '580px',
                                height: '300px',
                                marginTop: '40px',
                                marginBottom: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                        <Box display= 'flex' justifyContent='center'>
                        <Typography sx={{fontWeight: '600', fontSize: '30px',justifySelf: 'center', color: '#1d3c45'}}>תמונות מוצרי העסק</Typography>
                        </Box>
                        <Box sx={{ minWidth: '580px', minHeight: '300px'}}>
                          <Slider sliderKey="productsSlider" key="productsImages" initialSlides={productsImages} farm={false} handleDeleteImages={handleDeleteImages} handleAddImages={handleAddImages} farmOrProducts={"products"} />
                        </Box>
                    </Box>
                    <Box sx={{
                                width: '580px',
                                height: '380px',
                                marginBottom: '80px',
                                marginLeft: '10%',
                            }}>
                                <Box display= 'flex' justifyContent='center'>
                                    <Typography  sx={{fontWeight: '600', fontSize: '30px',justifySelf: 'center', color: '#1d3c45'}}>מודעות שפורסמו</Typography>
                                </Box>
                                <div className='userPosts' style={{border: '5px solid #1d3c45',
                                direction: 'ltr'}}>
                                    <UserPosts width={'100%'} height={660} email={storedEmail} token={props.token}/>
                                </div>
                            </Box>
                </Box>
                <Container sx={{paddingTop: '30px', display: 'flex', justsifyContent: 'center'}}>
                           {/* <Typography>מקום לתמונות</Typography>*/}
                </Container>
            </Container>
        </Box>}
    </Box>
    // </ThemeProvider>
  )
}

export default ProfileSettings;
