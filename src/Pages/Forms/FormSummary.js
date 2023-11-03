import React, { useState, useEffect } from 'react';
import {
    Grid,
    Button,
    Box,
    ThemeProvider,
    createTheme,
    Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import './Forms.css';


const theme = createTheme({
  typography: {
    fontFamily: 'aleph',
  },
});


const FormSummary = ({ values , props, isFormValid, isFormSignUpInfoValid, isFormShippingOptionsValid, isFormOpeningHoursValid}) => {
    const modalTextStyle = {
      fontSize: 'larger', 
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: "5%",
  };
  const modalTextSmallStyle = {
    ...modalTextStyle,
    fontSize: 'smaller', 
  };
    const navigate = useNavigate();
    let shipping
    let km
    let concatenatedNamesProducts = "" 
    let concatenatedNamesFarm = ""
    let logoName = "" 
    if (values.is_shipping){
        shipping = "כן"
        km = values.shipping_distance
        if (values.shipping_distance){

        }
        else{
            values.shipping_distance = "0"
        }
    }
    else{
        shipping = "לא"
        km = ""
        values.shipping_distance = "0"
        values.is_shipping = false
    }
    if (values.logo_picture){
        logoName = values.logo_picture[0].name
    }
    if (values.products_pictures){
        let fileNamesProducts = Array.from(values.products_pictures).map(file => file.name);
        concatenatedNamesProducts = fileNamesProducts.join(', ');
    }
    if (values.farm_pictures){
        let fileNamesFarm = Array.from(values.farm_pictures).map(file => file.name);
        concatenatedNamesFarm = fileNamesFarm.join(', ');
    }
    function addZero(val) {
        const ret = val < 10 ? "0" + val : val;
        return ret;
    }

    function hoursFormat(start, end) {
        if (start === "none" || end === "none") {
            return "סגור";
        }
        else {
            return addZero(dayjs(end).hour()) + ":" + addZero(dayjs(end).minute()) + " - " + addZero(dayjs(start).hour()) + ":" + addZero(dayjs(start).minute())
        }
    }
    let opening_hours2 = ["none","none","none","none","none","none","none"]
    let closing_hours2 = ["none","none","none","none","none","none","none"]
    if (values.opening_hours !== "") {
        opening_hours2 = values.opening_hours.map(p => {
            return p && p !== "none" ? p.format() : "none";
        });
    }
    if (values.closing_hours !== "") {
        closing_hours2 = values.closing_hours.map(p => {
            return p && p !== "none" ? p.format() : "none";
        });
    }
    const sunday = hoursFormat(opening_hours2[0], closing_hours2[0])
    const monday = hoursFormat(opening_hours2[1], closing_hours2[1])
    const tuesday = hoursFormat(opening_hours2[2], closing_hours2[2])
    const wednesday = hoursFormat(opening_hours2[3], closing_hours2[3])
    const thursday = hoursFormat(opening_hours2[4], closing_hours2[4])
    const friday = hoursFormat(opening_hours2[5], closing_hours2[5])
    const saturday = hoursFormat(opening_hours2[6], closing_hours2[6])

    const days = {
        sunday: sunday,
        monday: monday,
        tuesday: tuesday,
        wednesday: wednesday,
        thursday: thursday,
        friday: friday,
        saturday: saturday
    }
    console.log(days);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const isOpeningHoursEmpty = (days.sunday === "סגור") && (days.monday === "סגור") && (days.tuesday === "סגור") && (days.wednesday === "סגור") && (days.thursday === "סגור") && (days.friday === "סגור") && (days.saturday === "סגור");
    const tenDigitPattern = /^0[57][0-9]{8}$/;
    const nineDigitPattern = /^0[23489][0-9]{7}$/;

    useEffect(() => {   
        window.scrollTo(0, 0); // Scroll to the top of the page
        if (showSuccessMessage) {
          const timer = setTimeout(() => {
            setShowSuccessMessage(false);
            navigate('/bullboard');
          }, 6500);
    
          return () => clearTimeout(timer);
        }
      }, [showSuccessMessage, navigate]);



    const submitHandler = (e) => {
        e.preventDefault();
        let openingHours = "none,none,none,none,none,none,none"
        let closingHours = "none,none,none,none,none,none,none"
        if (values.opening_hours !== "") {
            const opening_hours = values.opening_hours.map(p => {
                return p && p !== "none" ? p.format() : "none";
            });
            openingHours = opening_hours.join(",");
        }
        if (values.closing_hours !== "") {
            const closing_hours = values.closing_hours.map(p => {
                return p && p !== "none" ? p.format() : "none";
            });
            closingHours = closing_hours.join(",");
        }
        const data = new FormData();
        if (values.is_shipping === false) {
            values.shipping_distance = 0
        }

        data.append("jsonData", JSON.stringify({
            //email: "golan@gmail.com",
            email: values.email,
            google_name: values.google_name,
            google_family_name: values.google_family_name,
            google_profile_picture: values.google_profile_picture,
            shipping_distance: values.shipping_distance,
            is_shipping: values.is_shipping,
            opening_hours: openingHours,
            closing_hours: closingHours,
            farm_name: values.farm_name,
            about: values.about,
            phone_number_official: values.phone_number_official,
            phone_number_whatsapp: values.phone_number_whatsapp,
            phone_number_telegram: "0",
            address: values.address,
            types_of_products: values.types_of_products,
            farmer_name: values.farmer_name,
            delivery_details: values.delivery_details,
            products: values.products,
            farm_site: values.farm_site,
            facebook: values.facebook,
            instagram: values.instagram

        }))
        if (values.logo_picture) {
            for (let i = 0; i < values.logo_picture.length; i++) {
                data.append("files[]", values.logo_picture[i]);
                data.append("labels[]", "1");
            }
        }
        if (values.products_pictures) {
            for (let i = 0; i < values.products_pictures.length; i++) {
                data.append("files[]", values.products_pictures[i]);
                data.append("labels[]", "2");
            }
        }
        if (values.farm_pictures) {
            for (let i = 0; i < values.farm_pictures.length; i++) {
                data.append("files[]", values.farm_pictures[i]);
                data.append("labels[]", "3");
            }
        }

        axios.post("https://farmers2u-backend.onrender.com/signup", data)
            .then(function (response) {
                localStorage.setItem('profilePicture', response.data.logo_picture);

                axios({
                    method: 'POST',
                    url: 'https://farmers2u-backend.onrender.com/logintoken',
                    data: {
                        email: values.email
                    }
                })
                    .then(function (response) {
                        props.setToken(response.data.access_token);
                        localStorage.setItem('email', values.email);
                        localStorage.setItem('farmName', values.farm_name)
                        setShowSuccessMessage(true);

                    })
                    .catch(function (error) {
                        if (error.response && error.response.status === 409) {
                            alert('הפרטים שהוזנו שגויים');
                        }
                    });

            })
            .catch(function (error) {
                if (error.response && error.response.status === 409) {
                    alert("שגיאה");
                    alert("המייל שאיתו ביקשתם להירשם כבר רשום במערכת.");
                }
                if (error.response && error.response.status === 405) {
                    alert("שגיאה");
                    alert("יש להירשם עם כתובת גוגל תקינה בעמוד הראשון.");
                }

            });
    };

    return (

        <form autoComplete="off" >
          <ThemeProvider theme={theme}>
            {!showSuccessMessage && (
                <Box bgcolor="#f7f1e5" boxShadow={0} borderRadius={2} mr={2.3} mt={0.1} border={2} display="flex" flexDirection={"column"} width={580} alignItems={"center"} justifyContent={"center"} paddingBottom={3} paddingX={5} paddingTop={20} sx={{ border: '1.5px solid #f7f1e5'}}  >
                <Box>
                <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} fontSize={50} marginTop="-9.2rem" variant='h3' textAlign={"center"}> הרשמת חקלאי </Typography>
                <Typography color="#37474f" fontFamily="aleph" minHeight={45} fontWeight={'bold'} fontSize={22}  mr={-1} marginTop={3} variant='h2'  textAlign={"center"}>שלב 7 - אישור והרשמה</Typography>
                {isFormValid ? 
                <Typography color="#37474f" fontFamily="aleph" minHeight={45} fontWeight={'bold'} fontSize={16}  mr={-1} variant='h2'  textAlign={"center"}>הפרטים ניתנים לשינוי גם לאחר סיום הליך ההרשמה</Typography>
                :
                <Typography dir="rtl" color="error" fontFamily="aleph" minHeight={45} fontWeight={'bold'} fontSize={16}  mr={-1} variant='h2'  textAlign={"center"}>יש לתקן את השדות המסומנים ב-*</Typography>
                }
                </Box>
                <>
                <Grid container direction="column" spacing={2} dir="rtl" style={{ fontFamily: "aleph" }}>
                    <Grid item>
                      {values.farm_name !== "" ? 
                        <Typography variant="body1" color="textSecondary" textAlign={"center"} sx={{textDecoration: 'underline'}}>
                            שם העסק:
                        </Typography>
                        :
                        <Typography variant="body1" color="textSecondary" textAlign={"center"} sx={{textDecoration: 'underline'}}>
                            *שם העסק:
                        </Typography>
                        }
                        <Typography maxWidth={580} variant="body2" color="textPrimary" textAlign={"center"}>
                            {values.farm_name || "---"}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant="body1" color="textSecondary" textAlign={"center"} sx={{textDecoration: 'underline'}}>
                            שם איש הקשר:
                        </Typography>
                        <Typography variant="body2" color="textPrimary" textAlign={"center"}>
                            {values.farmer_name || "---"}
                        </Typography>
                    </Grid>

                    <Grid item>
                      {values.address !== "" ? 
                        <Typography variant="body1" color="textSecondary" textAlign={"center"} sx={{textDecoration: 'underline'}}>
                            כתובת:
                        </Typography>
                        :
                        <Typography variant="body1" color="textSecondary" textAlign={"center"} sx={{textDecoration: 'underline'}}>
                           *כתובת:
                        </Typography> 
                      }
                        <Typography variant="body2" color="textPrimary" textAlign={"center"}>
                            {values.address || "---"}
                        </Typography>
                    </Grid>

                    <Grid item>
                      {isFormSignUpInfoValid ? 
                        <Typography variant="body1" color="textSecondary" textAlign={"center"} sx={{textDecoration: 'underline'}}>
                            כתובת מייל:
                        </Typography>
                        :
                        <Typography variant="body1" color="textSecondary" textAlign={"center"} sx={{textDecoration: 'underline'}}>
                           *כתובת מייל:
                        </Typography> 
                      }
                        <Typography variant="body2" color="textPrimary" textAlign={"center"}>
                            {values.email || "---"}
                        </Typography>
                    </Grid>

                    <Grid item>
                      {((tenDigitPattern.test(values.phone_number_official) || nineDigitPattern.test(values.phone_number_official)) && values.phone_number_official !== "") ? 
                        <Typography variant="body1" color="textSecondary" textAlign={"center"} sx={{textDecoration: 'underline'}}>
                            מספר טלפון של העסק:
                        </Typography>
                        :
                        <Typography variant="body1" color="textSecondary" textAlign={"center"} sx={{textDecoration: 'underline'}}>
                            *מספר טלפון של העסק:
                        </Typography>
                     }
                        <Typography variant="body2" color="textPrimary" textAlign={"center"}>
                            {values.phone_number_official || "---"}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant="body1" color="textSecondary" textAlign={"center"} sx={{textDecoration: 'underline'}}>
                            מספר וואטסאפ:
                        </Typography>
                        <Typography variant="body2" color="textPrimary" textAlign={"center"}>
                            {values.phone_number_whatsapp || "---"}
                        </Typography>
                    </Grid>
                    <Grid item>
                        {isFormOpeningHoursValid ? 
                        <Typography variant="body1" color="textSecondary" textAlign={"center"} sx={{textDecoration: 'underline'}}>
                            שעות פתיחה:
                        </Typography>
                        :
                        <Typography variant="body1" color="textSecondary" textAlign={"center"} sx={{textDecoration: 'underline'}}>
                            *שעות פתיחה:
                        </Typography>
                        }
                        {(isFormOpeningHoursValid && isOpeningHoursEmpty) ? 
                        <Typography variant="body2" color="textPrimary" textAlign={"center"} >
                            לא הוזנו שעות פתיחה
                        </Typography>  
                        :
                        isFormOpeningHoursValid ? 
                        <div>
                        <Typography variant="body2" color="textPrimary" textAlign={"center"}>
                           ראשון{days.sunday === "סגור" ? " - " : ": "}{days.sunday}
                        </Typography>
                        <Typography variant="body2" color="textPrimary" textAlign={"center"}>
                           שני{days.monday === "סגור" ? " - " : ": "}{days.monday}
                        </Typography>
                        <Typography variant="body2" color="textPrimary" textAlign={"center"}>
                           שלישי{days.tuesday === "סגור" ? " - " : ": "}{days.tuesday}
                        </Typography>
                        <Typography variant="body2" color="textPrimary" textAlign={"center"}>
                           רביעי{days.wednesday === "סגור" ? " - " : ": "}{days.wednesday}
                        </Typography>
                        <Typography variant="body2" color="textPrimary" textAlign={"center"}>
                           חמישי{days.thursday === "סגור" ? " - " : ": "}{days.thursday}
                        </Typography>
                        <Typography variant="body2" color="textPrimary" textAlign={"center"}>
                           שישי{days.friday === "סגור" ? " - " : ": "}{days.friday}
                        </Typography>
                        <Typography variant="body2" color="textPrimary" textAlign={"center"}>
                           שבת{days.saturday === "סגור" ? " - " : ": "}{days.saturday}
                        </Typography>
                        </div>
                          : 
                          <Typography variant="body2" color="textPrimary" textAlign={"center"}>
                           לא הוזנו ערכים תקינים
                          </Typography>
                          }
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" color="textSecondary" textAlign={"center"} sx={{textDecoration: 'underline'}}>
                            העסק עושה משלוחים?
                        </Typography>
                        <Typography variant="body2" color="textPrimary" textAlign={"center"}>
                            {shipping}
                        </Typography>
                    </Grid>

                    {shipping === "כן" && (
                        <Grid item>
                            {isFormShippingOptionsValid ? 
                            <Typography variant="body1" color="textSecondary" textAlign={"center"} sx={{textDecoration: 'underline'}}>
                                טווח המשלוח:
                            </Typography>
                            :
                            <Typography variant="body1" color="textSecondary" textAlign={"center"} sx={{textDecoration: 'underline'}}>
                                *טווח המשלוח:
                           </Typography>
                            }
                            <Typography variant="body2" color="textPrimary" textAlign={"center"}>
                                עד {isFormShippingOptionsValid ? km : "__"} ק"מ מ{values.address || "-לא הוזנה כתובת"}
                            </Typography>
                        </Grid>
                    )}
                    <Grid item>
                        <Typography variant="body1" color="textSecondary" textAlign={"center"} sx={{textDecoration: 'underline'}}>
                            מדיניות הזמנות ומשלוחים:
                        </Typography>
                        <Typography style={{ maxWidth: '580px', wordWrap: 'break-word'}} variant="body2" color="textPrimary" textAlign={"center"}>
                            {values.delivery_details || "---"}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant="body1" color="textSecondary" textAlign={"center"} sx={{textDecoration: 'underline'}}>
                            סוגי מוצרים:
                        </Typography>
                        <Typography variant="body2" color="textPrimary" textAlign={"center"}>
                            {values.types_of_products.replace(/,/g, ', ') || "---"}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant="body1" color="textSecondary" textAlign={"center"} sx={{textDecoration: 'underline'}}>
                            מחירון:
                        </Typography>
                        <Typography style={{ maxWidth: '580px', wordWrap: 'break-word'}} variant="body2" color="textPrimary" textAlign={"center"}>
                            {values.products || "---"}
                        </Typography>
                    </Grid>
                    
                    <Grid item>
                        <Typography variant="body1" color="textSecondary" textAlign={"center"} sx={{textDecoration: 'underline'}}>
                            תמונת הלוגו:
                        </Typography>
                        <Typography style={{ maxWidth: '580px', wordWrap: 'break-word'}} variant="body2" color="textPrimary" textAlign={"center"}>
                            {logoName || "---"}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" color="textSecondary" textAlign={"center"} sx={{textDecoration: 'underline'}}>
                            תמונות המוצרים:
                        </Typography>
                        <Typography style={{ maxWidth: '580px', wordWrap: 'break-word'}} variant="body2" color="textPrimary" textAlign={"center"}>
                            {concatenatedNamesProducts.replace(/,/g, ', ') || "---"}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" color="textSecondary" textAlign={"center"} sx={{textDecoration: 'underline'}}>
                            תמונות החווה:
                        </Typography>
                        <Typography style={{ maxWidth: '580px', wordWrap: 'break-word'}} variant="body2" color="textPrimary" textAlign={"center"}>
                            {concatenatedNamesFarm.replace(/,/g, ', ') || "---"}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant="body1" color="textSecondary" textAlign={"center"} sx={{textDecoration: 'underline'}}>
                            אתר העסק:
                        </Typography>
                        <Typography maxWidth={580} variant="body2" color="textPrimary" textAlign={"center"}>
                            {values.farm_site || "---"}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant="body1" color="textSecondary" textAlign={"center"} sx={{textDecoration: 'underline'}}>
                            פייסבוק:
                        </Typography>
                        <Typography maxWidth={580} variant="body2" color="textPrimary" textAlign={"center"}>
                            {values.facebook || "---"}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant="body1" color="textSecondary" textAlign={"center"} sx={{textDecoration: 'underline'}}>
                            אינסטגרם:
                        </Typography>
                        <Typography maxWidth={580} variant="body2" color="textPrimary" textAlign={"center"}>
                            {values.instagram || "---"}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant="body1" color="textSecondary" textAlign={"center"} sx={{textDecoration: 'underline'}}>
                            ספרו על עצמכם:
                        </Typography>
                        <Typography style={{ 
                                maxWidth: '580px', 
                                wordWrap: 'break-word'
                            }}  variant="body2" color="textPrimary" textAlign={"center"}>
                            {values.about || "---"}
                        </Typography>
                    </Grid>

                </Grid>

                </>

            </Box>)}


            {showSuccessMessage && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000 // to ensure the modal is on top
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '40px',       // Increased padding for larger appearance
              borderRadius: '10px',
              fontSize: '40px',      // Increased font size
              width: '800px',
              height: "300px",        // Set a width
              textAlign: 'center',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              border: '3px solid #ffb74d'   // Added a subtle shadow for depth
            }}>
            {/* This is the animated welcome message */}
            <div dir='rtl' style={modalTextStyle}>
                {`שלום ${values.farm_name.length > 25 ? values.farm_name.slice(0,26) + "..." : values.farm_name}!`.replace(/\s/g, '\u00A0').split('').map((char, index) => (
                    <span key={index} style={{animationDelay: `${index * 0.05}s` }} className={char === ' ' ? '' : "fade-in"}>
                        {char}
                    </span>
                ))}
            </div>
            <div dir='rtl' style={modalTextStyle}>
                {`כיף שהצטרפתם אלינו ל - U2sremraF!`.replace(/\s/g, '\u00A0').split('').map((char, index) => (
                    <span key={index} style={{animationDelay: `${(index + `שלום ${values.farm_name.length > 25 ? values.farm_name.slice(0,26) + "..." : values.farm_name}!`.length) * 0.05}s` }} className={char === ' ' ? '' : "fade-in"}>
                        {char}
                    </span>
                ))}
            </div>
            <div dir='rtl' style={modalTextSmallStyle}>
                {`מיד תועברו ללוח המודעות`.replace(/\s/g, '\u00A0').split('').map((char, index) => (
                    <span key={index} style={{animationDelay: `${(index + `שלום ${values.farm_name.length > 25 ? values.farm_name.slice(0,26) + "..." : values.farm_name}!`.length + `כיף שהצטרפתם אלינו ל - U2sremraF!`.length) * 0.05}s` }} className={char === ' ' ? '' : "fade-in"}>
                        {char}
                    </span>
                ))}
            </div>
        </div>
    </div>
)}

            </ThemeProvider>
            <Button style={{
                        borderWidth: '1px', minWidth: "30px", backgroundColor: "#ffb74d", 
                        marginTop: '0px',
                        marginLeft: "27%", fontFamily: "aleph", fontSize: 16,
                        color: "#212121",
                    }} disabled={!isFormValid} variant="outlined" sx={{ borderColor: 'black' }} onClick={submitHandler} > אישור ושליחה 
                    </Button>
        </form>
    );
};

export default FormSummary;