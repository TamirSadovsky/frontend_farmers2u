import React, { useState } from 'react';
import { AppBar, Toolbar, Tabs, Tab, Button, useMediaQuery, Typography,
  ThemeProvider, createTheme, useTheme, Box } from '@mui/material';
import Farmers2ULogo from '../../assets/farmers2u_logo.svg'
import DrawerComp from './DrawerComp';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import LogoutIcon from '@mui/icons-material/Logout';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const themeForButton = createTheme({
  palette: {
    button: createColor('#E8AA42'),
    logout: createColor('#BA000D'),
  },
});

  const NavbarElements = ({ token, removeToken }) => {

  const navigate = useNavigate();
  const [farmNameActive, setFarmNameActive] = useState(false);
  const logo = localStorage.getItem('profilePicture');


  const handleSettingsClick = () => {
    navigate('/settings');
    setValue(-1);
    setFarmNameActive(true);
  };


  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('lg'));
  const { pathname } = useLocation();

  const logMeOut = () => {
    axios({
      method: "POST",
      url: "https://farmers2u-backend.onrender.com/logout",
    })
      .then((response) => {
        removeToken();
        localStorage.removeItem('email');
        localStorage.removeItem('profilePicture');
        localStorage.removeItem('farmName');
        navigate("/home");
        window.location.reload()
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };


  const pages = [
    { label: 'שאלות נפוצות', href: 'faq' },
    { label: 'החקלאים שלנו', href: 'ourfarmers' },
    { label: 'לוח המודעות', href: 'bullboard' },
    { label: 'דף הבית', href: 'home' }
  ];

  const [value, setValue] = useState(() => {
    // Find the index of the page whose href matches the current pathname
    const pageIndex = pages.findIndex((page) => page.href === pathname.slice(1));
    return pageIndex === -1 ? -1 : pageIndex;
  });

  return (
    <ThemeProvider theme={themeForButton}>
      <React.Fragment>
        <AppBar position="static" sx={{ background: '#1d3c45' }}> 
          <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {isMatch ? (
              <>
                <Button href='home'>
                <img src={Farmers2ULogo} alt="Farmers2ULogo" style={{ width: '65px', height: '65px' }} />
                </Button>
                <DrawerComp token={token} removeToken={removeToken} />
              </>
            ) : (
              <>
                {!token && (
                  <>
                    <Button href="login" color='button' sx={{width: '140px', height:'36px', fontFamily: "aleph", marginRight: 'auto', marginLeft: 3, '&:hover': { color: 'white', fontWeight:'bold' } }} variant="contained">
                      כניסת משתמש{' '}
                    </Button>
                    <Button href="signup" color="button" sx={{width: '140px', height:'36px', fontFamily: "aleph", marginRight: 'auto', marginLeft: '4rem', '&:hover': { color: 'white' , fontWeight:'bold'} }} variant="contained">
                      יצירת משתמש{' '}
                    </Button>
                  </>
                )}
                {token && (
                  <>
                    <LogoutIcon  type="submit" onClick={logMeOut}
                    sx={{width: '30px', height:'40px', fontSize: 'large', cursor: 'pointer'}}/>
                    <Button onClick={handleSettingsClick}
                    sx={{ marginRight: 'auto', marginLeft: '1.8rem',}}>
                      <img className = 'Img' src = {logo} alt=""
                      style={{ width: '60px', height: '60px', borderRadius: '50%', 
                      objectFit: 'cover', cursor: 'pointer' }} />
                    </Button>
                    <Button onClick={handleSettingsClick}
                        sx={{marginLeft: "1%",
                          '&:hover': {
                              backgroundColor: 'transparent',  
                              boxShadow: 'none' 
                          }
                      }}
                      >
                        <Typography
                          variant='h5'
                          sx={{
                            color: farmNameActive ? '#ffffff' : '#a5b1b5',
                            fontWeight: 'bold',
                            fontFamily: 'aleph',
                            fontSize: "18.5px",
                            '&:hover': {
                              color: '#ffffff',
                              transition: 'color 0.3s',
                            },
                          }}
                        >
                          אזור אישי
                        </Typography>
                    </Button>
                    {/* <Button color= "button" type="submit" onClick={handleSettingsClick} 
                    sx={{ width: '140px', height:'36px', fontSize: "medium", 
                    fontFamily: "aleph", marginRight: 'auto', marginLeft: '1.8rem', 
                    cursor: 'pointer', '&:hover': { color: 'white' , fontWeight:'bold'} 
                    }}  variant="contained">אזור אישי</Button>  */}
                    {/*
                        <Button onClick={e=>setOpen(true)}>
                            <img className= 'Img' src = {'/Form_images/Logo_image/'.concat(logo)}  alt="" />
                        </Button>
                        <Button onClick={e=>setOpen(true)}>
                            <Typography variant='h5'color={'black'}>{post.farmName}</Typography>
                        </Button> 
                  */}
                  </>
                )}
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                  <Tabs
                    sx={{ color: '#0062E2' }}
                    textColor="inherit"
                    value={value}
                    indicatorColor="none"
                  >
                    {pages.map((page, index) => (
                      <Tab
                        key={index}
                        onClick={()=>{setFarmNameActive(false);}}
                        label={page.label}
                        href={page.href}
                        sx={{ marginRight: 'auto', marginLeft: "45px", 
                        fontFamily: "aleph", fontSize: '18.5px', 
                        '&:hover': { textDecoration: 'none' } }}
                        value={index}
                        style={{color: '#FFFFFF', fontWeight:'bold'}}
                      />
                    ))}
                  </Tabs>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button href='home'>
                  <img
                    src={Farmers2ULogo}
                    alt="Farmers2ULogo"
                    style={{ width: '60px', height: '60px', marginRight: 'auto' }}
                  />
                  </Button>
                </Box>
              </>
            )}
          </Toolbar>
        </AppBar>
      </React.Fragment>
    </ThemeProvider>
  );
};

export default NavbarElements;