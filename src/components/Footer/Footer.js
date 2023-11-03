import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import '../../App.css';
import Logo from '../../assets/farmers2u_logo.png';
import { Button } from '@mui/material';

const footerTextStyle = {
  fontWeight: "bold",
  fontFamily: 'Alef',
  variant: 'body2',
  textDecoration: "none",
  color: "white"
};

const color = {
  color: 'white',
  backgroundColor: 'transparent',  
  boxShadow: 'none',
};

const columnStyle = {
  listStyleType: 'none',
  textAlign: 'center',
};

const buttonSX = {
  ...footerTextStyle,
  fontFamily: 'Aleph',
  fontSize: 18,
  transition: 'background-color 0.4s',
  '&:hover': {
    backgroundColor: '#2d5f67',
    borderRadius: '20px',
    
  }
};

const Footer = ({ token }) => {
  return (
    <div dir='rtl' style={{ backgroundColor: "#1d3c45", color: '#eeeeee', overflow: 'auto' }}>
      <Toolbar style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '100%' }}>
          <ul style={{ ...columnStyle }}>
            <li style={{ paddingBlock: '10px' }}>
              <Button href="home" style={color} sx={buttonSX}>
                דף הבית
              </Button>
            </li>
            <li>
              <Button href="ourfarmers" style={color} sx={buttonSX}>
                החקלאים שלנו
              </Button>
            </li>
          </ul>
          <ul style={{ ...columnStyle }}>
            <li style={{ paddingBlock: '10px' }}>
              <Button href='bullboard' style={color} sx={buttonSX}>
                לוח המודעות
              </Button>
            </li>
            <li>
              <Button href='faq' style={color} sx={buttonSX}>
                שאלות נפוצות
              </Button>
            </li>
          </ul>
          {/* Conditionally render the buttons based on the token */}
          {!token ? (
            <ul style={{ ...columnStyle }}>
              <li style={{ paddingBlock: '10px' }}>
                <Button href='login' style={color} sx={buttonSX}>
                  התחברות חקלאי
                </Button>
              </li>
              <li>
                <Button href='signup' style={color} sx={buttonSX}>
                  פתיחת פרופיל חקלאי
                </Button>
              </li>
            </ul>
          ) : (
            /* Render other content when token is true */
            // For example, you can show a message or nothing at all
            null
          )}
          <a href="home">
            <img src={Logo} alt='Logo' style={{ width: "150px" }} />
          </a>
        </div>
        <div
          style={{
            fontFamily: 'Aleph', variant: 'body2', marginBottom: '15px',
            fontSize: 18, color: "white", textAlign: "center"
          }}>
          © כל הזכויות שמורות
          {" | "}
          Farmers2U
          {" | "}
          {new Date().getFullYear()}
        </div>
      </Toolbar>
    </div>
  );
};

export default Footer;
