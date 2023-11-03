import React from 'react'
import { TextField, Box, Typography, Grid, Paper, ThemeProvider, Checkbox, createTheme, Autocomplete, ListItem, Container} from '@mui/material'
import { CheckBox, CheckBoxOutlineBlank, Close } from '@mui/icons-material';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles'
import products from '../../assets/lists';

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

const {palette} = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const themeForButton = createTheme({
  palette: {
    button: createColor('#E8AA42'),
    white: createColor('#ffffff'),
    garbage: createColor('#9e9e9e'),
    hovergarbage: createColor('#37474f'),
    adder: createColor('#f7f1e5'),
    addPicture: createColor('#f7f1e5'),
  },
});

function FormProductsUpload({values, handleChange, setFormValue}) {
  const matchingProducts = products.filter((prod) => 
                values.types_of_products.includes(prod.label));

  const handleChangeCategories = (event, newValue) => {
    console.log(event)
    const types = newValue.map(t => t.label).join();
    setFormValue("types_of_products", types);
  }

  const handleChangePhotoLogo = (e) => {
    if (e.target.files.length > 0) {
      const selectedPhotos = e.target.files;
      for (let i = 0; i < selectedPhotos.length; i++) {
        if (!fileMaxSize(selectedPhotos[i])){
          alert("גודל מקסימלי עבור קובץ הוא 5MB.");
          return;
        }
        if (!fileTypeValidation(selectedPhotos[i])) {
          e.target.value = null; // Clear the input field
          alert("מותר לצרף תמונות בפורמט PNG, JPEG או JPG בלבד.");
          return;
        }
        if (!fileSpecialChars(selectedPhotos[i])) {
          alert("שם הקובץ מכיל תווים לא חוקיים.");
          e.target.value = null; 
          return
        }
      }
      setFormValue("logo_picture", selectedPhotos)
    }
    else {
      setFormValue("logo_picture", "");
    }
  };
  const handleChangePhotoFarm = (e) => {
    if (e.target.files.length > 0) {
      const selectedPhotos = e.target.files;
      if (!filesNumberValidation(selectedPhotos.length)){
        alert("מותר להעלות עד 5 קבצים.");
        e.target.value = null; 
        return
      }
  
      for (let i = 0; i < selectedPhotos.length; i++) {
        if (!fileMaxSize(selectedPhotos[i])){
          alert("גודל מקסימלי עבור קובץ הוא 5MB.");
          return;
        }
        if (!fileTypeValidation(selectedPhotos[i])) {
          alert("מותר לצרף תמונות בפורמט PNG, JPEG או JPG בלבד.");
          e.target.value = null; 
          return;
        }
        if (!fileSpecialChars(selectedPhotos[i])) {
          alert("שם הקובץ מכיל תווים לא חוקיים.");
          e.target.value = null; 
          return
        }
      }
      setFormValue("farm_pictures", selectedPhotos)
    }
    else {
      setFormValue("farm_pictures", "");
    }
  };
  const handleChangePhotoProducts = (e) => {
    if (e.target.files.length > 0) {
      const selectedPhotos = e.target.files;
              if (!filesNumberValidation(selectedPhotos.length)){
          alert("מותר להעלות עד 5 קבצים.");
          e.target.value = null; 
          return
        }
    
        for (let i = 0; i < selectedPhotos.length; i++) {
          if (!fileMaxSize(selectedPhotos[i])){
            alert("גודל מקסימלי עבור קובץ הוא 5MB.");
            return;
          }
          if (!fileTypeValidation(selectedPhotos[i])) {
            alert("מותר לצרף תמונות בפורמט PNG, JPEG או JPG בלבד.");
            e.target.value = null; 
            return;
          }
          if (!fileSpecialChars(selectedPhotos[i])) {
            alert("שם הקובץ מכיל תווים לא חוקיים.");
            e.target.value = null; 
            return
          }
        }
      setFormValue("products_pictures", selectedPhotos)
    }
    else {
      setFormValue("products_pictures", "");
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
  const filesNumberValidation = (numberOfImagesToUpload) => {
    const MAX_FILES = 5;
    if (numberOfImagesToUpload > MAX_FILES) {
      return false
    }
    return true
  }
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
    <ThemeProvider theme={themeForButton}>
    <div>
        <form autoComplete="off" dir="rtl" /*className={classes.root}*/>
    <Box marginTop={5} bgcolor="#f7f1e5" boxShadow={0} borderRadius={2} border={2} display="flex" flexDirection={"column"} width={580} height={142.5} alignItems={"center"} justifyContent={"center"} margin={3} mt={4} padding={20} sx={{border: '1.5px solid #f7f1e5'}}  >
    <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} fontSize={50} mr={2.3} marginTop="-7.9rem" variant='h3' textAlign={"center"}> הרשמת חקלאי </Typography>
    <Typography color="#37474f" fontFamily="aleph" minHeight={45} fontWeight={'bold'} fontSize={22} mr={2} marginBottom={2} marginTop={3} variant='h2'  textAlign={"center"}> שלב 4 - מוצרי המשק החקלאי</Typography>
      <Grid container height={278} style={{ marginTop:"-4rem"}} >
  <Grid item xs={12} style={{ marginBottom:"-1.2rem"}}>
  <Box marginBottom={2} marginTop={8} style={{ marginBottom:"-1rem"}}>
  <Box mb={2} dir="rtl">

    <Autocomplete
    style={{backgroundColor:'white', zIndex: '10000'}}
          multiple
          id="checkboxes-tags-demo"
          // value={categories}
          defaultValue = {matchingProducts}
          onChange={handleChangeCategories}
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
                  maxHeight: '258px',
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
          sx={{ width: '100%'
         }}
          renderInput={(params) => (
            <TextField {...params} sx={{zIndex: '10000'}} placeholder="סוגי מוצרים"  direction= 'rtl' />
          )}
        />
  </Box> 
  <Typography color="#757575"fontFamily="aleph" marginTop={-2} > פירוט מבחר המוצרים ומחיריהם: </Typography>
    <Paper>
      <TextField fullWidth multiline dir="rtl"
        name ="name"
        variant='outlined'
        type="text"
        defaultValue={values.products} 
        onChange={handleChange('products')}
        placeholder='דוגמה: עגבניות - 8 ש"ח לק"ג, ענבים - 25 ש"ח למארז.'
        required="required"
        rows={2}
        rowsMax={5}       
      />
    </Paper> 
  </Box>
  {/* <ProductList /> */}
  <Typography color="#757575"fontFamily="aleph" marginTop={3} marginBottom={-5}> הוספת תמונות: </Typography>

  </Grid> 

<form autoComplete="off" dir="rtl" /*className={classes.root}*/ encType="multipart/form-data">
             <Box style={{marginRight: "10%"}}>              
          <Grid marginTop={8} item xs={6} style={{ marginBottom:"-1rem"}}>
              
              <Box margin={2} border="none" Width={1000} style={{ marginBottom:"2rem"}}>
                <Container
                /*margin={10}*/
                color="addPicture"
                sx={{   display: 'flex',
                justifyContent: 'space-between',width:"450px",fontFamily: "aleph", boxShadow: 'none !important', '&:hover , &:active, &:focus':{color: 'initial',
                backgroundColor: 'initial', 
                boxShadow: 'none !important', opacity: 1,}}}
              >
                <label>
                הוספת לוגו
                </label>
                <input
                  type="file"
                  label =""
                  name="logo_picture"
                  onChange={handleChangePhotoLogo}
                />
              </Container>
            </Box>
          </Grid>
          <Grid item xs={6} style={{ marginBottom:"-1.5rem"}}>
              <Box margin={2.7}>
              </Box>

            </Grid>
            <Grid item xs={12} style={{ marginBottom:"-1rem"}}>
          {/* <Box margin={2} style={{ marginBottom:"0.2rem"}}>
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <FormLabel sx={{ typography: { fontFamily: 'aleph' } }}> כאן תוכלו להוסיף תמונות של המשק שתרצו שנפרסם בפרופיל שלכם! </FormLabel>
              </FormControl>
          </Box> */}
          </Grid>
          <Grid item xs={6} style={{ marginBottom:"-1rem"}}>
              <Box margin={2} border="none" Width={1000} style={{ marginBottom:"-1rem"}}>
                <Container
                /*margin={10}*/
                color="addPicture"
                sx={{    display: 'flex',
                justifyContent: 'space-between',width:"450px",fontFamily: "aleph", boxShadow: 'none !important', '&:hover':{color: 'initial',
                backgroundColor: 'initial', 
                boxShadow: 'none !important', }}}
              >
                <label>
                מוצרי המשק
                </label>
                <input
                  type="file"
                  label =""
                  name = "image"
                  multiple
                  sx={{color:'button'}}
                  onChange={handleChangePhotoProducts}
                />
              </Container>
            </Box>
          </Grid>
          <Grid item xs={6} style={{ marginBottom:"-1rem"}}>
              <Box margin={2.7}>
              </Box>
            </Grid>
            {/* <Box margin={2} marginRight={2} style={{ marginBottom:"-1rem"}}>
              <FormControl sx={{ m: 1, minWidth: 80}}>
                <FormLabel sx={{ typography: { fontFamily: 'aleph' } }}> כאן תוכלו להוסיף לוגו של המשק שלכם! </FormLabel>
              </FormControl>
          </Box> */}
            <Grid item xs={6} >
              <Box margin={2} border="none" Width={1000}>
                <Container
                /*margin={10}*/
                color="addPicture"
                sx={{    display: 'flex',
                justifyContent: 'space-between', width:"450px", mt: "24px"
,                fontFamily: "aleph", boxShadow: 'none !important', '&:hover':{color: 'initial',
                backgroundColor: 'initial', 
                boxShadow: 'none !important', }}}
              >
                <label>תמונות המשק</label>
                <input
                  type="file"
                  label =""
                  name = "farm_photo"
                  multiple
                  onChange={handleChangePhotoFarm}
                />
              </Container>
            </Box>

          </Grid>
          </Box> 
            {/* <Grid item xs={6} style={{ marginBottom:"-1rem"}}>
              <Box marginBottom ={2.8}>
                <Button type="submit">  בדיקה</Button> 
              </Box>
          
            </Grid> */}
                

     
</form>
</Grid>

  </Box> 
     
</form>
    </div>
    </ThemeProvider>

  )
}

export default FormProductsUpload
