import React, { useState, useEffect } from 'react';
import './intro.css';
import picture from '../../assets/Board_images/farm1.jpeg';
import { AccessTime, Email, Facebook, Home, Instagram, Phone, WhatsApp } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import Price from '../../components/prices/prices';
import Shipping from '../../components/shipping/shipping';
import ImageSlider from './ImageSlider';
import image1 from '../../DummyData/ProfilePageImages/image1.jpg';
import image2 from '../../DummyData/ProfilePageImages/image2.jpg';
import image3 from '../../DummyData/ProfilePageImages/image3.jpg';
import image4 from '../../DummyData/ProfilePageImages/image4.jpg';
import image5 from '../../DummyData/ProfilePageImages/image5.jpg';
import axios from 'axios';

const Intro = (props) => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    getUsers();
  }, [props.token, props.profileEmail]);

  const storedEmail = localStorage.getItem('email');
  const profileEmail = props.token?.profile_email || storedEmail || '';

  function getUsers() {
    axios({
      method: 'GET',
      url: `https://farmers2u-backend.onrender.com/${profileEmail}`,
      headers: {
        Authorization: 'Bearer ' + props.token,
      },
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        res.access_token && props.setToken(res.access_token);
        setProfileData({
          profile_farmName: res.farmName,
          profile_email: res.email,
          profile_about: res.about,
          profile_phoneNumber1: res.phoneNumber1,
          profile_phoneNumber2: res.phoneNumber2,
          profile_address: res.address,
          profile_city: res.city,
          profile_farmerName: res.farmerName,
          profile_prices: res.prices,
          profile_products: res.products,
          profile_facebook: res.facebook,
          profile_instagram: res.instagram,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  const slides = [
    { url: image1 },
    { url: image2 },
    { url: image3 },
    { url: image4 },
    { url: image5 },
  ];

  return (
    <div className="i" style={{ marginTop: '30px', marginBottom: '270px' }}>
      <div className="i-right">
        <div className="i-right-wrapper">
          <div className="topContainer">
            <div className="headers" style={{ marginTop: '40px' }}>
              <h2 className="i-intro">היי, אנחנו</h2>
              <h1 className="i-name"> {profileData?.profile_farmName}</h1>
            </div>
            <img src={picture} alt="" className="i-img" />
          </div>
          <Box sx={{ top: '30px' }}>
            <div className="i-products">
              <div className="i-products-wrapper">
                <div className="i-product-item">מלפפונים</div>
                <div className="i-product-item">עגבניות</div>
                <div className="i-product-item">גזרים</div>
                <div className="i-product-item">בצלים</div>
                <div className="i-product-item">חצילים</div>
              </div>
            </div>
          </Box>
          <Box
            sx={{
              fontSize: '20px',
              position: 'relative',
              width: '700px',
              top: '30px',
            }}
          >
            {profileData?.profile_about}
          </Box>
          <div className="detailsWrapper">
            <div className="main_details">
              <Stack direction="row" alignItems="center" gap={1}>
                <Home />
                <Typography variants="body1">{profileData?.profile_city}, {profileData?.profile_address}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={1}>
                <AccessTime />
                <Typography variants="body1">ראשון עד חמישי, 08:00 - 17:00</Typography>
              </Stack>
              {profileData && (
                <Stack direction="row" alignItems="center" gap={1}>
                  <Email />
                  <Typography variants="body1">{profileEmail}</Typography>
                </Stack>
              )}
              {profileData && (
                <Stack direction="row" alignItems="center" gap={1}>
                  <Phone />
                  <Typography variants="body1">0725437433 {profileData?.profile_name}</Typography>
                </Stack>
              )}
            </div>
          </div>
          <div className="pricesContainer">
            <Price />
          </div>
          <div className="shippingContainer">
            <Shipping />
          </div>
          <div className="social">
            <Stack direction="row" alignItems="center" ml={4} gap={1}>
              <WhatsApp />
              <Typography variants="body1">0547984551 דודי</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" ml={4} gap={1}>
              <Instagram />
              <Typography variants="body1">golan_farm20</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap={1}>
              <Facebook />
              <Typography variants="body1">משק גולן</Typography>
            </Stack>
          </div>
        </div>
      </div>
      <div className="i-left"></div>
      <div
        style={{
          width: '650px',
          height: '370px',
          marginTop: '400px',
          marginLeft: '200px',
        }}
      >
        <ImageSlider slides={slides} />
      </div>
    </div>
  );
};

export default Intro;