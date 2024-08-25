import { Button, Box, ThemeProvider, createTheme, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import jwt_decode from "jwt-decode"

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const themeForButton = createTheme({
  palette: {
    nice: createColor('#37474f'),
    button: createColor('#E8AA42'),
  },
});

const FormLogin = (props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const modalTextStyle = {
    fontSize: 'larger',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "5%",
  };

  const navigate = useNavigate();

  const handleCallbackResponse = (response) => {
    const userObject = jwt_decode(response.credential);

    axios({
      method: 'POST',
      url: 'https://farmers2u-backend.onrender.com/logintoken',
      data: {
        email: userObject.email
      }
    })
      .then(function (response) {
        console.log(response);
        props.setToken(response.data.access_token);
        localStorage.setItem('email', userObject.email);
        localStorage.setItem('farmName', response.data.userName);
        localStorage.setItem('profilePicture', response.data.profilePicture)
        setShowPopup(true);
        setTimeout(() => {
          navigate('/bullboard');
          window.location.reload();
        }, 3000);
      })
      .catch(function (error) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response && error.response.status === 401) {
          setErrorMessage('משתמש לא רשום');
        }
      });

  };

  const initializeGoogleSignIn = () => {
    if (typeof window.google !== 'undefined' && typeof window.google.accounts !== 'undefined') {
      window.google.accounts.id.initialize({
        client_id: '680549546132-otkla53o4j4sp9uavffgpi480lm4rcim.apps.googleusercontent.com',
        callback: handleCallbackResponse
      });

      window.google.accounts.id.renderButton(document.getElementById('signInDiv'), {
        theme: 'outline',
        size: 'large'
      });
    } else {
      // Google's library is not loaded yet, let's try again in a moment
      setTimeout(initializeGoogleSignIn, 5);
    }
  };

  useEffect(() => {
    initializeGoogleSignIn();
  },); // Watch buttonText changes

  return (
    <ThemeProvider theme={themeForButton}>
      <div dir="rtl" style={{ height: '100vh', alignContent: 'center', alignItems: 'center'}} >
        {/*<button onClick={ (e) => handleSignOut(e)}>Sign Out</button>  GOOGLE SIGNOUT BUTTON, incomplete. needs to adapt to regular signout  */}
        <form autoComplete="off" /*onSubmit={handleSubmit}*/>
          <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} fontSize={50} marginBottom={'10vh'} variant='h3' textAlign={"center"} marginTop={'20vh'}> התחברות חקלאי </Typography>
          <Box display='flex' justifyContent='center'>
            <div id="signInDiv" style={{ alignSelf: 'center', marginBottom: '3vh' }}></div>
          </Box>
            {errorMessage && (
              <div>
                <Typography
                  fontSize={13}
                  color="red"
                  textAlign="center"
                  sx={{
                    fontFamily: 'aleph',
                    textAlign: 'center'
                  }}
                >
                  {errorMessage || "\u00A0"}
                </Typography>
              </div>
            )}
            <Box mt={1} display='flex' justifyContent='center'>
              <a href="/signup">
                <Button
                  variant="text"
                  size="medium"
                  sx={{
                    fontFamily: 'aleph',
                    mt: 4,
                    borderRadius: 4,
                  }}
                  color="nice"
                >
                  מעבר להרשמה
                </Button>
              </a>
            </Box>
          {showPopup && (
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
                width: '400px',
                height: "100px",        // Set a width
                textAlign: 'center',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                border: '3px solid #ffb74d'   // Added a subtle shadow for depth
              }}>
                <div style={modalTextStyle}>
                  {'ברוך שובך!'.replace(' ', '\u00A0').split('').map((char, index) => (
                    <span key={index} style={{ animationDelay: `${index * 0.1}s` }} className={char === ' ' ? '' : "fade-in"}>
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

        </form>
      </div>
    </ThemeProvider>

  )
}

export default FormLogin
