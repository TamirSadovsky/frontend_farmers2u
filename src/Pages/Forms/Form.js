import React, { useState } from 'react';
import FormSignUpInfo from './FormSignUpInfo';
import FormPersonalInfo from './FormPersonalInfo';
import FormOtherInfo from './FormOtherInfo';
import FormShippingOptions from './FormShippingOptions';
import FormProductsUpload from './FormProductsUpload';
import FormOpeningHours from './FormOpeningHours'
import FormSummary from './FormSummary'
import FormSubmitted from './FormSubmitted'
import { Button,Stepper,Step,StepLabel,Typography } from '@mui/material';

const steps = [
    'חשבון גוגל',
    'פרטי המשק',
    'משלוחים והזמנות',
    'מוצרי המשק',
    'שעות פתיחה וימי פעילות',
    'פרטים נוספים',
    'אישור והרשמה',
  ];

  const Form = (props) => {
    const [multiFormValues, setMultiFormValues] = useState({
        farm_name: "",
        email: "",
        is_valid_email: false,
        google_profile_picture: "",
        google_name: "",
        google_family_name: "",
        shipping_distance: "",
        is_shipping: false,
        opening_hours: "",
        closing_hours: "",
        logo_picture: "",
        products_pictures: "",
        types_of_products: "",
        farm_pictures: "",
        phone_number_official: "",
        phone_number_whatsapp: "",
        phone_number_telegram: "",
        about: "",
        address: "",
        farmer_name: "",
        delivery_details: "",
        products: "",
        farm_site: "",
        facebook: "",
        instagram: "",


      })

      function Lines() {
        return (
            <div style={{ position: 'relative', top: '13px', marginRight: '9%', display: 'flex', justifyContent: 'space-between', width: '82%' }}>
                {Array(6).fill().map((_, index) => (
                    <div key={index} style={{flexGrow: 1, height: '1px', backgroundColor: 'lightgray',marginLeft: '0.5%', marginRight: index!==0 ? '5.2%':'0.5%'}} />
                ))}
            </div>
        );
    }

    
    //Handle form value state on change
    const handleChange = (input) => (e) => {
    setMultiFormValues({...multiFormValues, [input]: e.target.value})
    }
    const setFormValue = (input, value) => {
        setMultiFormValues((prevValues) => ({
          ...prevValues,
          [input]: value,
        }));
      };
    const [isFormSignUpInfoValid, setIsFormSignUpInfoValid] = useState(true);
    const [isFormPersonalInfoValid, setIsFormPersonalInfoValid] = useState(true);
    const [isFormShippingOptionsValid, setIsFormShippingOptionsValid] = useState(true);
    const [isFormOpeningHoursValid, setIsFormOpeningHoursValid] = useState(true);
    const [isFormOtherInfoValid, setIsFormOtherInfoValid] = useState(true);
    const isFormValid = isFormSignUpInfoValid && isFormPersonalInfoValid && isFormShippingOptionsValid && isFormOpeningHoursValid && isFormOtherInfoValid;

    const[page, setPage] = useState(0);
    /* const FormTitles = ["Sign Up", "Personal Info", "Other", "FormProducts","FormShippingDetails"]; */
    const FormTitles = ["Farmers2U", "Farmers2U", "Farmers2U", "Farmers2U","Farmers2U","Farmers2U", "Farmers2U"]; 

    const PageDisplay = () => {
        if (page === 0) {
            return <FormSignUpInfo setIsFormSignUpInfoValid={setIsFormSignUpInfoValid}
             values={multiFormValues} handleChange={handleChange} setFormValue={setFormValue}/>
        }
        else if (page === 1) {
            return <FormPersonalInfo setIsFormPersonalInfoValid={setIsFormPersonalInfoValid} 
             values={multiFormValues} handleChange={handleChange} setFormValue={setFormValue}/>
        }
        else if (page === 2){
            return <FormShippingOptions setIsFormShippingOptionsValid={setIsFormShippingOptionsValid}
             values={multiFormValues} handleChange={handleChange} setFormValue={setFormValue}/>
        }
        else if (page === 3){
            return <FormProductsUpload values={multiFormValues} handleChange={handleChange} setFormValue={setFormValue}/>
        }
        else if (page === 4){
            return <FormOpeningHours setIsFormOpeningHoursValid={setIsFormOpeningHoursValid}
             values={multiFormValues} handleChange={handleChange} setFormValue={setFormValue}/>
        }
        else if (page === 5){
            return <FormOtherInfo setIsFormOtherInfoValid={setIsFormOtherInfoValid}
             values={multiFormValues} handleChange={handleChange} setFormValue={setFormValue} props={props}/>
        }
        else if (page === 6){
            return <FormSummary isFormSignUpInfoValid={isFormSignUpInfoValid} isFormShippingOptionsValid={isFormShippingOptionsValid} isFormOpeningHoursValid={isFormOpeningHoursValid}
            isFormValid={isFormValid} handleChange={handleChange} setFormValue={setFormValue} values={multiFormValues} props={props}/>       
        }
        else if (page === 7){
            return <FormSubmitted />
        }
    }

    return (
    <div className='form' style={{paddingBottom: '25px', paddingTop: '25px'}}>
              <div style={{ direction: "rtl" }}>
                <Lines></Lines>
              <Stepper alternativeLabel activeStep={page} connector={null} sx={{ '& .MuiStepIcon-root.MuiStepIcon-active': { color: 'secondary' } }}>
                          {steps.map((label) => (
            <Step key={label} >
              <StepLabel>
              <Typography style={{ fontFamily: 'aleph', fontSize: '13px' }}>
                    {label}
            </Typography>
            </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
        <div className='form-container'>
            <div className='header' style={{ textAlign: 'center' }}> 
            </div>
            <div className='body' style={{ display: "flex", justifyContent: "center" }}> 
                {PageDisplay()}   
            </div>
            <div className='footer' style={{ marginTop: page === 6 ? "0%" : page === 1 ? "-1.47%" : "-1.5%", display: "flex", justifyContent: "center" }}> 
                <Button style= {{
                maxHeight: page === 0 || page === 1 ||page === 2 ||page === 3 ||page === 4 || page === 5 ? "100px":'0px',
                minWidth:"80px",
                backgroundColor:  page === 0 || page === 1 ||page === 2 ||page === 3 ||page === 4 || page === 5 ? '#ffb74d' : "#f7f1e5" , 
                marginRight: page === 0 ? "-30px" : "20px",
                marginTop: page === 6 ? '100px' : '20px',
                fontFamily:"aleph",
                fontSize: 16,
                display: page === 6 ? 'none' : 'block',
                color:  page === 0 || page === 1 ||page === 2 ||page === 3 ||page === 4 || page === 5 ? '#212121' : "#f7f1e5" }}
                variant="outlined"
                 sx={{borderColor:page === 0 || page === 1 ||page === 2 ||page === 3 ||page === 4 || page === 5 ? 'black': '"#f7f1e5"', '&.Mui-disabled': {
                    borderColor: 'transparent'
                }}}
                onClick={() => { 
                    if (page === FormTitles.length) 
                    {alert("הטופס נשלח")} 
                    else {
                        setPage((currPage) => currPage + 1);}
                    }
                        }> הבא
                </Button> 
                <Button style= {{borderWidth:'1px', minWidth:page === 6 ? '132px' : "30px", backgroundColor: "#ffb74d", 
                marginTop: page === 6 ? '-40px' : '20px',
                marginLeft: page === 6 ? '160px' : "20px", fontFamily:"aleph", fontSize: 16, display: page === 0 ? 'none' : 'block',
                color: "#212121"}} variant="outlined" sx={{borderColor: 'black'}} 
                disabled={page === 0} onClick={
                    () => {setPage((currPage) => currPage - 1);
                    }}> {page === 6 ? 'שינוי פרטים' : 'הקודם'}
                    </Button>
            </div>
        </div>        
    </div>
    );
    }

export default Form
