import React from 'react'
import { Box, Typography} from '@mui/material'

function FormSubmitted() {
  return (
    <div>
    <Box marginTop={5} bgcolor="#e1f5fe" boxShadow={2} borderRadius={2} border={2} display="flex" flexDirection={"column"} width={580} height={200} alignItems={"center"} justifyContent={"center"} margin={3} mt={4} padding={20} sx={{border: '1.5px solid #bf360c'}}  >
    <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} fontSize={50} marginBottom={"0px"} variant='h3' textAlign={"center"}> תודה על הרשמתך! </Typography>
    <Typography color="#37474f" fontFamily="aleph" minHeight={45} fontWeight={'bold'} fontSize={22}  margin={5} variant='h2'  textAlign={"center"}> בדקות הקרובות ישלח אלייך מייל לאישור ההרשמה.</Typography>
  </Box>    
</div>
  )
}

export default FormSubmitted
