import React, { useState } from 'react';
import FarmCard from './profilecard';
import './styles.css';
import { Box, Container, Typography } from '@mui/material';

const Catalogue = ({ List, token }) => {


  
  

  const rowsPerPage = 3;
  const cardsPerPage = 3*rowsPerPage; // Number of cards to display per page (4 cards per row x 3 rows per page)
  const totalPages = Math.ceil(List.length / cardsPerPage); // Calculate the total number of pages
  const [currentPage, setCurrentPage] = useState(1); // Current page state

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  // Get the cards to display on the current page
  const currentCards = List.slice(startIndex, endIndex);

  // Handle page navigation
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="catalogue-container" dir='rtl'>
      <Container display= 'flex'>
        {List.length === 0 ?
        <>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <img className='noResultsImage' src={"https://storage.googleapis.com/image_storage_farmers2u/noResults.png"} alt='no results' /> 
        </Box>
        <Typography sx={{ 
                      fontSize: '30px', color: '#1d3c45', display: 'flex', 
                      justifyContent: 'center', textAlign:'center', justifySelf:'center'}}>לא נמצאו חקלאים מתאימים</Typography>
        <Typography sx={{ 
                      fontSize: '20px', color: '#1d3c45', display: 'flex', 
                      justifyContent: 'center', textAlign:'center', justifySelf:'center'}}>כדאי לנסות להסיר מסנני חיפוש</Typography>
        </>
        : 
        <div className="card-grid">
          {currentCards.map((business, index) => 
            <FarmCard key={index} Image={business.logo_picture} business={business} token={token}/>
          )}
          <Container sx={{flex: '5'}}>
          </Container>
        </div>
        }
      </Container>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Catalogue;

