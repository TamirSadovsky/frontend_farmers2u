import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  Typography
} from '@mui/material';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

function FormSignUpInfo({values, setFormValue, setIsFormSignUpInfoValid }) {
  const [buttonText, setButtonText] = useState('הירשם עם Google');
  const [errorMessage, setErrorMessage] = useState('');



  useEffect(() => {
    setIsFormSignUpInfoValid(values.is_valid_email);
}, [values.is_valid_email, setIsFormSignUpInfoValid]);




  useEffect(() => {
    const handleCallbackResponse = (response) => {
      const userObject = jwt_decode(response.credential);
  
  
      const data = new FormData();
      data.append("jsonData", JSON.stringify({
        email: userObject.email,
      }));
  
      axios.post("https://farmers2u-backend.onrender.com/signup", data, {
        withCredentials: true,
      })
        .then(function (response) {
          setErrorMessage("");
          setFormValue("email", userObject.email);
          setFormValue("google_name", userObject.given_name);
          setFormValue("google_family_name", userObject.name);
          setFormValue("google_profile_picture", userObject.picture);
          setButtonText(`הירשם עם Google (${userObject.given_name} ${userObject.name})`);
          setFormValue("is_valid_email", true);
        })
        .catch(function (error) {
          if (error.response && error.response.status === 409) {
            setErrorMessage("משתמש זה כבר רשום במערכת");
            setFormValue("email", userObject.email);
            setFormValue("google_name", userObject.given_name);
            setFormValue("google_family_name", userObject.name);
            setFormValue("google_profile_picture", userObject.picture);
            setFormValue("is_valid_email", false);
          }
        });
    };

    const initializeGoogleSignUp = () => {
      if (typeof window.google !== 'undefined' && typeof window.google.accounts !== 'undefined') {
        window.google.accounts.id.initialize({
          client_id: '396819999377-n5p4a1t8qnv0d57jr1meh6tu1hfa14bt.apps.googleusercontent.com',
          callback: handleCallbackResponse
        });

        window.google.accounts.id.renderButton(document.getElementById('signUpDiv'), {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          text: buttonText 
        });
      } else {
        setTimeout(initializeGoogleSignUp, 100);
      }
    };

    initializeGoogleSignUp();
  }, [buttonText, setErrorMessage, setFormValue]); 
  
  return (

        <form autoComplete="off">
          
          <Box marginTop={5} bgcolor="#f7f1e5" boxShadow={0} borderRadius={2} border={2} display="flex" flexDirection={"column"} width='100%' height={164.7} alignItems={"center"} justifyContent={"center"}  mt={0.8} paddingTop={20} paddingBottom={20} sx={{border: '1.5px solid #f7f1e5'}}  >
              <Box style={{marginTop: "-19.1%"}}>
              <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} fontSize={50} mr={2.52} marginTop="-5.5rem" variant='h3' textAlign={"center"}> הרשמת חקלאי </Typography>
              <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} mt={2} fontSize={22} marginBottom={8} marginTop={3} variant='h2'  textAlign={"center"}> שלב 1 - חשבון גוגל</Typography>
              </Box>
            <Box>
            <form>
                <Box height={65}>
                  <Box display='flex' justifyContent='center'>
                  <div
                    id="signUpDiv"
                    style={{ width: "210px", paddingTop: '25px' }}
                  ></div>
                  </Box>
                  {errorMessage && (
                  <Typography
                    mb={-2.4}
                    fontSize={13}
                    color="red"
                    textAlign="center"
                    sx={{
                      fontFamily: 'aleph',
                      marginRight: '-1.2rem' // Add a right margin to move the error message to the right
                    }}
                  >
                    {errorMessage || "\u00A0"}
                  </Typography>
                )}
                </Box>
              </form>
            </Box>
            <Box ml={3} mt={1} display= 'flex' justifyContent='center'>
              <a href='/login'>
                <Button disableRipple variant='text' size='medium'
                sx={{fontFamily:"aleph",  mt: 4, borderRadius: 4, fontSize: 16}} color='inherit'> משתמש קיים? לחץ כאן</Button>  
              </a>
            </Box>
          </Box>  
        </form>
  );
};

export default FormSignUpInfo;