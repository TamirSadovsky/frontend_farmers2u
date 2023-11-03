


/*
farmName = the name of the farm
Image = the logo of the farm
location = the address
fullProfile = the data relevant for the profile page.
however that may be (a profile page url, a full profile card...) Image={imageurl}
Use like this:
1) Create something of the sort:
  const farm: {
    farmName: 'The Farm Name',
    Image: 'https://example.com/farm-image.jpg',
    location: 'Somewhere',
    fullProfile: {a lot of stuff},
    style: {{marginRight: ?, marginTop: ?, marginLeft: ?, whatever else}},
  };

2) Call it like this:
      <profileCard
        farmName={farm.farmName}
        Image={farm.Image}
        location={farm.location}
        fullProfile={farm.fullProfile}
        style={{some style stuff}}
      />
*/


import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button';
import NewBusinessCard from '../../components/Post/newBusinessCard';




const FarmCard = ({Image, business, style, token }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [isBusinessCardOpen, setBusinessCardOpen] = useState(false);

  const cardStyle = {
    maxWidth: 280,
    borderTopLeftRadius: '37px', 
    borderTopRightRadius: '37px', 
    borderBottomLeftRadius: '10px', 
    borderBottomRightRadius: '10px', 
    outline: isHovered ? '3px solid #E8AA42' : 'none',
    transition: 'outline 0.3s',
  };

  return (
    <div style={{ direction: 'rtl', ...style }}>
      <Card
        sx={cardStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '210px',
            width: '80%',
            padding: '22px',
            paddingTop: '16px',
            margin: '0 auto',
          }}
        >
          <img
            src={Image}
            alt={business.name}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        </div>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography gutterBottom variant="h5" component="div" sx={{fontFamily: "aleph", fontSize: '1.35rem' }} style={{ marginTop: '-30px' }}>
            {business.farm_name.length > 20 ? business.farm_name.slice(0,21) + "..." : business.farm_name}
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '-14px' }}>
            <Typography variant="body2" color="text.secondary" sx={{fontFamily: "aleph", fontSize: '1rem' }} style={{ marginTop: '10px' }}>
              <LocationOnIcon sx={{ fontSize: 18, marginLeft: '8px' }} />
              {business.location.length > 25 ? business.location.slice(0,26) + "..." : business.location}
            </Typography>
          </div>
          <Button
            sx={{
              width: '95%',
              bgcolor: '#E8AA42',
              fontFamily: "aleph",
              borderRadius: '30px',
              color: "#000000",
              '&:hover': { borderColor: '#E8AA42', fontWeight:'bold' }
            }}
            style={{ marginTop: '0px' }}
            variant="outlined"
            size="large"
            target="_blank"
            rel="noopener noreferrer"
            onClick={e=>setBusinessCardOpen(true)}
          >
            לפרטים נוספים
          </Button>
        <NewBusinessCard
          business={business}
          image={Image}
          open={isBusinessCardOpen}
          token={token}
          close={()=>setBusinessCardOpen(false)} />

        </CardContent>
      </Card>
    </div>
  );
};

export default FarmCard;