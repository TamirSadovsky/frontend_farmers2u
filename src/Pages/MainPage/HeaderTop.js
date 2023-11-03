import { Box, IconButton, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import CustomButton from "./CustomButton";
import profilevid from '../../assets/ForProfile2.mp4'
import farmer2u_logo from '../../assets/farmers2u_logo.png'
import './Main.css';
import { ExpandMore } from "@mui/icons-material";
import {Link} from 'react-scroll'

const HeaderTop = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    marginTop: "70px",
    justifyContent: "center",
    gap: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#f7f1e5",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));
/*         <Player
        playsInline
        poster="/assets/poster.png"
        src={videobg}
        fluid={false}
        width={480}
        height={272}
      />  */
  return (
    <Box dir="rtl" sx={{ backgroundColor: "", minHeight: "80vh", paddingBottom: '0px' }}>
      {/* <CustomBox> */}
        <div className='overlay'>
          {/* <div className='farmers2u' style={{ fontFamily: "Secular One", color: "#52d7de", fontSize: '58px'  }}> היכנסו לחוויית חקלאות ישירה </div> */}
        {/* <div className='headline' style={{ fontFamily: "Secular One", color: "#52d7de", fontSize: '58px'  }}> Farmers2U </div> */}
        <Typography
              variant="body2"
              sx={{
                fontSize: "22px",
                color: "#687690",
                fontWeight: "500",
                mt: 5,
                mb: 4,
                mr: 11,
              }}
            >
            <h1 style={{ fontFamily: "Secular One", color: '#1b9c85', WebkitTextStroke: '0.1px #1d3c45', textStroke: '0.1px #000' }}> ברוכים הבאים ל-Farmers2U</h1> 

            </Typography>
            <Title variant="h1" sx={{mr: 11, whiteSpace: 'pre-wrap'}}>
                הכירו את פלטפורמת החקלאות הישירה. {'\n'}התחילו לקבל יותר.
                {/* הכירו את הפלטפורמה לתקשורת ישירה בין צרכנים לחקלאים. */}
            </Title>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{  fontSize: "26px",
               color: "#f7f1e5", my: 4 ,mr:22}}
            >
כאן תוכלו למצוא חקלאים מכל רחבי הארץ, לצפות באירועים קרובים ולרכוש את הסחורה הטובה ביותר!
            </Typography>
              <Box href="bullboard" marginRight={82}>
                <CustomButton
                backgroundColor="#e8aa42"
                color="#212121"
                buttonText="לוח המודעות"
                heroBtn={true}
                href='bullboard'
                />
              </Box>
              <Box display= 'flex' justifyContent='center' sx={{mt: '40px'}}>
                <Link to='place_to_visit' smooth={true}>
                  <IconButton sx={{fontSize: '80px', color: 'white', display: 'flex', justifyContent: 'center', justifyItems: 'center', zIndex:'3'}}>
                    <ExpandMore sx={{width: '100%', fontSize: '70px', alignItems: 'center', alignSelf: 'center'}}/>
                  </IconButton>
                </Link>
              </Box>

        </div>
        <video src={profilevid} autoPlay loop muted id='bg-video' playbackRate={2}/>
        <div id="place_to_visit">
      {/* </CustomBox> */}
      <Container>
        <CustomBox>
          <Box height= '5vh' sx={{ flex: "1" }}>
            {/* <Typography
              variant="body2"
              sx={{
                fontSize: "18px",
                color: "#687690",
                fontWeight: "500",
                mt: 10,
                mb: 4,
              }}
            >
            <h1 style={{ fontFamily: "Secular One", color: "blue" }}> ברוכים הבאים ל Farmers2U</h1> 

            </Typography>
            <Title variant="h1">
                הכירו את הפלטפורמה לתקשורת ישירה בין צרכנים לחקלאים.
            </Title>
            <Typography
              variant="body2"
              sx={{ fontSize: "21.8px", color: "#5A6473", my: 4 }}
            >
כאן תוכלו למצוא לוח מודעות ופרופילים של חקלאים מכל רחבי הארץ, לפרסום וקניית הסחורות הטובות ביותר!
            </Typography>
            <a href="bullboard">
            <CustomButton
              backgroundColor="#0F1B4C"
              color="#fff"
              buttonText="לוח המודעות"
              heroBtn={true}
            /> </a> */}
              <Typography variant="h4"   sx={{ fontSize: "35px", fontWeight: "bold", color: "#000339"}}>
                מהי מודעה?
              </Typography>
              <Typography variant="body2"
              sx={{
              fontSize: "20px",
              fontWeight: "500",
              color: "#5A6473",
              // textAlign: "center",
            }}>
                במודעה, בעל העסק מפרסם על מכירה המתקיימת בתאריך מסוים וקורא לקהל הרחב להגיע. 
              </Typography>
              <Typography variant="body2"
              sx={{
              fontSize: "20px",
              fontWeight: "500",
              color: "#5A6473",
              // textAlign: "center",
            }}>
             המודעה מכילה פרטים על מיקום המכירה ושעות המכירה .
            </Typography>
          </Box>
            <img
            src={farmer2u_logo}
              alt="farmers2u"
              height={100}
              marginTop={0}
              marginRight={100}
              style={{ maxWidth: "100%"}}
            />
        </CustomBox>
      </Container>
      </div>
    </Box>
  );

};

export default HeaderTop;