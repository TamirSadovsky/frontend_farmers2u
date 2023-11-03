import React, { useEffect, useState, useCallback } from 'react';
import Searchbar from './search';
import Catalogue from './Catalogue';
import './styles.css';
import { Box, Typography } from '@mui/material';
import FarmerFilter from '../../components/newFilterPanel/farmerFilter';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';


function OurFarmers( { token }) {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]); // State to hold the filtered cards
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCards, setCurrentCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = useCallback((searchTerm) => {
    const searched = filteredCards.filter((item) =>
      item.farm_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if(searchTerm === '' || !searchTerm){
      setCurrentCards(filteredCards);
    }
    else{
    setCurrentCards(searched);
    }
  }, [filteredCards, setCurrentCards]);

  useEffect(() => {
    axios
      .get('https://farmers2u-backend.onrender.com/businessCard')
      .then((response) => {
        console.log(response.data);
        setCards(response.data);
        setCurrentCards(response.data);
        setFilteredCards(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [filteredCards, handleSearch, searchTerm])

  return (
    <Box display='flex' flexDirection='column' overflowX= 'none'>
      <div className='wrapper' style={{direction: 'ltr'}}>
      <div className='left' style={{ direction: 'rtl', flex: '4', justifyContent: 'flex-start' }}>
        <Box>
          <Searchbar onSearch={handleSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Box>
        <Box flex='2.5' marginLeft='none' sx={{ '&::-webkit-scrollbar': { display: 'none' }, direction: 'rtl', overflowY: 'scroll', height: '70vh', scrollBehavior: 'smooth' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CircularProgress style={{ color: '#E8AA42', width: '70px', height: '70px' }} />
                <span className="loadingText" style={{ color: '#1d3c45', fontSize: '18px', marginTop: '1rem' }}>
                  טוען פרופילים...
                </span>
              </Box>
            </div>
          ) : (
            <Catalogue List={currentCards} token={token} />
          )}
        </Box>
      </div>
        <div className='right' dir='rtl' style={{flex: '1.5'}}>
        <div className='filterHeader' style={{padding: '1rem 0rem'}}>
          <Typography variant='h4' sx={{textAlign: 'center', paddingBottom: '5px', color: '#030443'}}>סינון מתקדם</Typography>
          <Typography width='300spx' sx={{textAlign: 'center', color: 'rgb(141, 141, 138)', direction: 'rtl'}}>לחצו על כפתור 'הפעלת סינון'.</Typography>
        </div>
        <Box className='filter' flex='1' sx={{'&::-webkit-scrollbar': { display: 'none' }, direction: 'rtl',borderLeft: 'solid 0.5px #1d3c45',overflowY:'scroll', height: '70vh'}}>
            <FarmerFilter setFilteredCards={setFilteredCards} cards={cards} setCurrentCards={setCurrentCards} setSearchTerm={setSearchTerm}/>
        </Box>
        </div>
      </div>
    </Box>
  );
}

export default OurFarmers;