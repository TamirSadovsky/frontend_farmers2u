import React, { useEffect, useCallback, useState } from 'react'
import { Stack, Typography } from '@mui/material';
import {Client} from '@googlemaps/google-maps-services-js';

// export function ValidateEmail({email, setValidFlag}) {
//     useEffect(() => {
//         isValidEmail();
//     }, [email, setValidFlag])

//     function isValidEmail() {
//         const regexp = new RegExp('^.+@[^\\.].*\\[a-z]{2,}$');
//         const res = regexp.test(email);
//         if(!res) {
//             setValidFlag(false);
//         }
//         else {
//             setValidFlag(true);
//         }
//         return res;
//       }

//     return (
//         isValidEmail()? null
//         :
//         <Stack sx={{color: 'red'}}>נא להזין כתובת מייל תקינה</Stack>
//     )
// }

export function ValidateWhatsapp({whatsapp, setValidFlag}) {

    // Regex for 10 digit numbers starting with 05 or 07
    const tenDigitPattern = /^0[57][0-9]{8}$/;

    // Regex for 9 digit numbers starting with 02, 03, 04, 08 or 09
    const nineDigitPattern = /^0[23489][0-9]{7}$/;

    const [valid, setValid] = useState(true);
    const isValid = tenDigitPattern.test(whatsapp) || nineDigitPattern.test(whatsapp);

    useEffect(() => {
      function isValidWhatsapp() {
        //const regexp = new RegExp('^[0][5][0|2|3|4|5|9]{1}[-]{0,1}[0-9]{7}$', 'g');
        const res = isValid || whatsapp === "";
        setValidFlag(res);
        return res;
      }
        setValid(isValidWhatsapp());
    }, [whatsapp, setValidFlag, isValid]);

    return (
      <div style={{ height: "0px" }}>
      {!valid && <Typography variant="body2" color="error">טלפון לא חוקי</Typography>}
    </div>
  );
}

export function ValidatePhone({ phone, setValidFlag }) {
  const [valid, setValid] = useState(true);

  const isValidPhone = useCallback(() => {
    const tenDigitPattern = /^0[57][0-9]{8}$/;
    const nineDigitPattern = /^0[23489][0-9]{7}$/;
    const isValid =
      tenDigitPattern.test(phone) || nineDigitPattern.test(phone);
    setValidFlag(isValid || phone === "");
    return isValid || phone === "";
  }, [phone, setValidFlag]);

  useEffect(() => {
    setValid(isValidPhone());
  }, [isValidPhone]);

  return (
    <div style={{ height: "0px" }}>
      {!valid && (
        <Typography variant="body2" color="error">
          טלפון לא חוקי
        </Typography>
      )}
    </div>
  );
}

export function ValidateWebsite({ url, setValidFlag }) {
  const [valid, setValid] = useState(true);

  const isValidWebsite = useCallback(() => {
    const regexp = new RegExp('(https:\\/\\/www\\.|http:\\/\\/www\\.|https:\\/\\/|http:\\/\\/)?[a-zA-Z]{2,}(\\.[a-zA-Z]{2,})(\\.[a-zA-Z]{2,})?\\/[a-zA-Z0-9]{2,}|((https:\\/\\/www\\.|http:\\/\\/www\\.|https:\\/\\/|http:\\/\\/)?[a-zA-Z]{2,}(\\.[a-zA-Z]{2,})(\\.[a-zA-Z]{2,})?)|(https:\\/\\/www\\.|http:\\/\\/www\\.|https:\\/\\/|http:\\/\\/)?[a-zA-Z0-9]{2,}\\.[a-zA-Z0-9]{2,}\\.[a-zA-Z0-9]{2,}(.[a-zA-Z0-9]{2,})?');
    const res = regexp.test(url) || url === "";
    setValidFlag(res);
    return res;
  }, [url, setValidFlag]);

  useEffect(() => {
    setValid(isValidWebsite());
  }, [isValidWebsite]);

  return (
    <div style={{ height: "0px" }}>
      {!valid && <Typography variant="body2" color="error">קישור לא תקין</Typography>}
    </div>
  );
}

export function ValidateInstagram({ instagram, setValidFlag }) {
  const [valid, setValid] = useState(true);

  useEffect(() => {
    function isValidInstagram() {
      const regexp = new RegExp("(http(s?)://)?(?:www.)?(?:instagram|instagr).([a-z])+/(\\w*)?/?", 'gs');
      const res = regexp.test(instagram) || instagram === "";
      setValidFlag(res);
      return res;
    }

    setValid(isValidInstagram());
  }, [instagram, setValidFlag]);

  return (
    <div style={{ height: "0px" }}>
      {!valid && <Typography variant="body2" color="error">קישור לא תקין</Typography>}
    </div>
  );
}


export function ValidateFacebook({ facebook, setValidFlag }) {
  const [valid, setValid] = useState(true);

  useEffect(() => {
    function isValidFacebook() {
      const regexp = new RegExp('/(?:https?:\\/\\/)?(?:www\\.)?(mbasic.facebook|m\\.facebook|facebook|fb)\\.(com|me)\\/?(?:(?:\\w\\.)*#!\\/)?(?:pages\\/)?(?:[\\w\\-\\.]*\\/)*([\\w\\-\\.]*)/');
      const res = regexp.test(facebook) || facebook === "";
      setValidFlag(res);
      return res;
    }

    setValid(isValidFacebook());
  }, [facebook, setValidFlag]);

  return (
    <div style={{ height: "0px" }}>
      {!valid && <Typography variant="body2" color="error">קישור לא תקין</Typography>}
    </div>
  );
}


export function ValidateWorkingHours({ open, close, setValidFlag }) {
  const [validRange, setValidRange] = useState(true);

  useEffect(() => {
    function validateHours() {
      if (!open && !close) {
        setValidRange(true);
        setValidFlag(true);
      } else if (open && close) {
        if (!(open.isValid() && close.isValid())) {
          setValidRange(true);
          setValidFlag(false);
        } else if (open.diff(close) >= 0) {
          setValidRange(false);
          setValidFlag(false);
        } else {
          setValidRange(true);
          setValidFlag(true);
        }
      } else {
        if (open && !open.isValid()) {
          setValidRange(true);
          setValidFlag(false);
        } else if (close && !close.isValid()) {
          setValidRange(true);
          setValidFlag(false);
        } else {
          setValidRange(false);
          setValidFlag(false);
        }
      }
    }

    validateHours();
  }, [open, close, setValidFlag]);

  return (
    <div style={{ height: "0px" }}>
      {!validRange && <Typography variant="body2" color="error">יש להזין טווח שעות תקין</Typography>}
    </div>
  );
}

export function ValidateFarmerName({name, setValidFlag}){
  const [valid ,setValid] = useState(true);

  useEffect(() => {
    function isValidName(){
      const regexp = new RegExp(/[0-9]/);
      const res =  !regexp.test(name);
      setValidFlag(res);
      return res;
    }
       setValid(isValidName());
  }, [name, setValidFlag]);


  return (
    <div style={{ height: "0px" }}>
    {!valid && <Typography variant="body2" color="error">השם בפורמט לא תקין</Typography>}
  </div>
);
}

export function ValidateFarmName({farmName, setValidFlag, isInitialized}){
  const [valid ,setValid] = useState(true);

  useEffect(() => {
    function isValidFarmName(){
      const res =  (!isInitialized) || (farmName !== "");
      setValidFlag(res);
      return res;
    }
       setValid(isValidFarmName());
  }, [farmName, setValidFlag, isInitialized]);

  return (
    <div style={{ height: "0px" }}>
    {!valid && <Typography variant="body2" color="error">שדה חובה</Typography>}
  </div>
);
}


export function ValidateAddress({ address, setValidFlag, isInitialized }) {
  const [valid, setValid] = useState(true);

  const isValidAddress = useCallback(async () => {
    const client = new Client();
    try {
      const response = await client.geocode({
        params: {
          address: address,
          country: 'il',
          language: 'iw',
          components: 'country: IL',
          key: 'AIzaSyAW-HDgK8fdEceybLwvRN_7wYgI_TtHmQ0'
        }
      });

      if (response.data.status === 'OK') {
        const res = response.data.results;
        const res_0 = res[0];
        console.log(response.data);
        if (res > 1) {
          setValid(false);
          setValidFlag(false);
        } else if (res_0.partial_match) {
          setValid(false);
          setValidFlag(false);
        } else {
          setValid(true);
          setValidFlag(true);
        }
      } else {
        setValid(false);
        setValidFlag(false);
      }
    } catch (error) {
      console.log(error);
      setValid(false);
      setValidFlag(false);
    }
  }, [address, setValidFlag]);

  useEffect(() => {
    if (isInitialized) {
      isValidAddress();
    }
  }, [isValidAddress, isInitialized]);

  return valid ? null : <Stack sx={{ color: 'red' }}> נא לוודא שנבחרה במדויק אופציה מבין הקיימות</Stack>;
}
