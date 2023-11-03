import { Box, Container, IconButton, styled, Typography } from "@mui/material";
import React from "react";
import './Main.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link } from "react-scroll";
import { ArrowDropDown } from "@mui/icons-material";

import farmer2u_logo from '../../assets/farmers2u_logo.png'

const Guide = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    width: "40%",
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
  }));

  const GuidesBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    width: "70%",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0",
      flexDirection: "column",
    },
  }));

  const GuideBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2, 0, 2, 0),
    },
  }));

  return (
    <Box dir="rtl"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mt: '15vh'
      }}
    >
      <Container sx={{ display: 'flex', justifyContent: 'space-between'}}>
        <Box>
          <Box sx={{ flex: "1", paddingBottom: '3em'}}>
              <Typography variant="h4"   sx={{fontFamily:"aleph", fontSize: "35px", fontWeight: "bold", color: "#000339"}}>
              מהי מודעה באתר?
              </Typography>
              <Typography variant="body2"
              sx={{
              fontSize: "20px",
              fontWeight: "500",
              color: "#5A6473",
              // textAlign: "center",
              fontFamily:"aleph",
            }}>
                במודעה, בעל העסק מפרסם על מכירה המתקיימת בתאריך מסוים וקורא לקהל הרחב להגיע. 
              </Typography>
              <Typography variant="body2"
              sx={{
              fontSize: "20px",
              fontWeight: "500",
              color: "#5A6473",
              // textAlign: "center",
              fontFamily:"aleph",
            }}>
             המודעה מכילה פרטים על מיקום המכירה ושעות המכירה .
            </Typography>
          </Box>
        </Box>
        <img
            src={farmer2u_logo}
              alt="farmers2u"
              height={100}
              marginTop={0}
              marginRight={100}
              style={{ maxWidth: "100%"}}
            />
      </Container>

      <div
        style={{
          width: "8%",
          height: "5px",
          backgroundColor: "#000339",
          margin: "0 auto",
        }}
      ></div>
      <Typography
        variant="h3"
        sx={{fontFamily:"aleph", fontSize: "35px", fontWeight: "bold", color: "#000339", mb: 1, mt: 1, mr: 2 }}
      >
        צרכנים?
      </Typography>

      <CustomBox  display= 'flex' flexDirection= 'column' justifyContent= 'space-between' textAlign= 'flex-start' gap={2} mr={3}>
        <Typography
          variant="body2"
          sx={{
            fontSize: "24px",
            fontWeight: "500",
            color: "#5A6473",
            // textAlign: "center",
            fontFamily:"aleph",
          }}
        >
          1. היכנסו ללוח המודעות וחפשו מודעות רלוונטיות באמצעות סרגל הסינון.
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "24px",
            fontWeight: "500",
            color: "#5A6473",
            // textAlign: "center",
            fontFamily:"aleph",
          }}
        >
          2. מצאתם עסק שאהבתם? כנסו לדף העסק לקבלת פרטים נוספים ודרכי יצירת קשר.
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "24px",
            fontWeight: "500",
            color: "#5A6473",
            mb: '0px',
            // textAlign: "center",
            fontFamily:"aleph",
          }}
        >
          3. מעוניינים לקרוא על עוד עסקים המשתמשים באתר? היכנסו לעמוד 'החקלאים שלנו'.
        </Typography>
        <Box display= 'flex' justifyContent='center' sx={{mt: '30px'}}>
          <Link to='farmers' smooth={true}>
            <IconButton disableRipple sx={{fontSize: '40px', color: 'black', display: 'flex', justifyContent: 'center', justifyItems: 'center', zIndex:'3'}}>
              <ArrowDropDown sx={{width: '100%', fontSize: '70px', alignItems: 'center', alignSelf: 'center'}}/>
            </IconButton>
        </Link>
      </Box>
      </CustomBox>


      <div id='farmers'
        style={{
          width: "8%",
          height: "5px",
          backgroundColor: "#000339",
          marginTop: '10vh'
        }}
      ></div>
      <Typography
        variant="h3"
        sx={{fontFamily:"aleph", fontSize: "35px", fontWeight: "bold", color: "#000339", mb: 3 ,mt: 1,mr: 2 }}
      >
        חקלאים?
      </Typography>

      <CustomBox  display= 'flex' flexDirection= 'column' justifyContent= 'space-between' textAlign= 'flex-start' gap={2} mr={3}>
        <Typography
          variant="body2"
          sx={{
            fontSize: "24px",
            fontWeight: "500",
            color: "#5A6473",
            // textAlign: "center",
            fontFamily:"aleph",
          }}
        >
          1. הירשמו לאתר ע"י מילוי פרטים בנוגע לעסק בטופס ההרשמה.
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "24px",
            fontWeight: "500",
            color: "#5A6473",
            // textAlign: "center",
            fontFamily:"aleph",
          }}
        >
          2. היכנסו ללוח המודעות או לאזור האישי ולחצו על אייקון ה-'+' ליצירת מודעה חדשה.
          ניתן לערוך את המודעה בכל עת.
        </Typography>
        {/* <Typography
          variant="body2"
          sx={{
            fontSize: "24px",
            fontWeight: "500",
            color: "#5A6473",
            // textAlign: "center"
            fontFamily:"aleph",
          }}
        >
          3. הוסיפו מלל חופשי בנוגע למודעה אותה תרצו לפרסם.
        </Typography> */}
        <Typography
          variant="body2"
          sx={{
            fontSize: "24px",
            fontWeight: "500",
            color: "#5A6473",
            // textAlign: "center",
            fontFamily:"aleph",
          }}
        >
          3. באזור האישי תוכלו לעדכן את פרטי העסק.
        </Typography>
        {/* <Typography
          variant="body2"
          sx={{
            fontSize: "24px",
            fontWeight: "500",
            color: "#5A6473",
            // textAlign: "center",
            fontFamily:"aleph",
          }}
        >
          4. כל מודעה ניתנת לעריכה/מחיקה במידת הצורך.
        </Typography> */}
        <Box display= 'flex' justifyContent='center' sx={{mt: '1px'}}>
          <Link to='bottom' smooth={true}>
            <IconButton disableRipple sx={{fontSize: '40px', color: 'black', display: 'flex', justifyContent: 'center', justifyItems: 'center', zIndex:'3'}}>
              <ArrowDropDown sx={{width: '100%', fontSize: '70px', alignItems: 'center', alignSelf: 'center'}}/>
            </IconButton>
        </Link>
      </Box>
      </CustomBox>

      

      <GuidesBox>
        <GuideBox>
          <div className="bottom">
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#3B3c45",
              my: 1,
              fontFamily:"aleph",
            }}
          >
            החקלאים שלנו
          </Typography>
          </div>
          <a href="ourfarmers">
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{fontFamily:"aleph", fontWeight: "bold", fontSize: "14px", color: "#0689FF" }}
            >
              לקטלוג
            </Typography>
            <KeyboardBackspaceIcon style={{ color: "#0689FF" }} />
          </Box> </a>
        </GuideBox>

        <GuideBox>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#3B3c45",
              my: 1,
              fontFamily:"aleph",
            }}
          >
            חקלאים? 
          </Typography>
          <a href="signup">
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{fontFamily:"aleph", fontWeight: "bold", fontSize: "14px", color: "#0689FF" }}
            >
              הירשמו עוד היום
            </Typography>
            <KeyboardBackspaceIcon style={{ color: "#0689FF" }} />
          </Box> </a>
        </GuideBox>

        <GuideBox>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#3B3c45",
              my: 1,
              fontFamily:"aleph",
            }}
          >
            רוצים לדעת עוד? 
          </Typography>
          <a href="faq">
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            
            <Typography
              variant="body2"
              sx={{fontFamily:"aleph", fontWeight: "bold", fontSize: "14px", color: "#0689FF" }}
            >
              שאלות נפוצות
            </Typography>
            <KeyboardBackspaceIcon style={{ color: "#0689FF" }} />
          </Box> </a>
        </GuideBox>
      </GuidesBox>

    </Box>
  );
};

export default Guide;