import React, { useState, useEffect } from 'react'
import './adsPage.css'
import Post from '../../components/Post/post'
import AddPost from '../../components/Post/AddPost'
import axios from 'axios'
import AdsFilter from '../../components/newFilterPanel/adsFilter'
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';




  function AdsPage({ token }) {
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      axios
        .get('https://farmers2u-backend.onrender.com/api/getposts')
        .then((response) => {
          setFilteredPosts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

  const boardClassName = filteredPosts.length === 0 ? 'board flex-center' : 'board';

  return (
      <div className='adsLayer'>
          <div className={boardClassName}>
              <div className="boardWrapper">
                { loading ? (
                  <div className='loadingSpinner'>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <CircularProgress style={{ color: '#E8AA42', width: '70px', height: '70px' }} />
                      <span className="loadingText" style={{ color: '#1d3c45', fontSize: '18px', marginTop: '1rem' }}>
                        ...טוען מודעות
                      </span>
                    </Box>
                  </div>
                ) : 
                filteredPosts.length === 0 ? (
                  <>
                  <div className='noResults'>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      <img alt='no results' className='noResultsImage' src={"https://storage.googleapis.com/db_storage_farmers2u/noResults.png"} style={{ width: '100%'}}/>
                    </Box>
                    <Typography sx={{ 
                      textAlign: 'center', fontSize: '36px', color: '#1d3c45', display: 'flex', 
                      justifyContent: 'center'}}>...לא נמצאו תוצאות</Typography>
                    <Typography sx={{textAlign: 'center', fontSize: '15px', 
                    color: 'rgb(141, 141, 138)',display: 'flex', justifyContent: 'center'}}>
                      {'כדאי לנסות להסיר מסנני חיפוש'}
                    </Typography>
                    
                  </div>
                  </>  
                ) : (
                  filteredPosts.map(p=> (
                    <Post key={p.id} post={p} token={token}/>
                  ))
                )
                }
              </div>
          </div>
          <div className="rightbar">
          <div className='header' style={{padding: '1rem 0rem'}}>
            <Typography variant='h4' sx={{textAlign: 'center', paddingBottom: '5px', color: '#030443'}}>סינון מתקדם</Typography>
            <Typography width='300spx' sx={{textAlign: 'center', color: 'rgb(141, 141, 138)', direction: 'rtl'}}>לחצו על כפתור 'הפעלת סינון'.</Typography>
          </div>
          <Box className='adsFilter' flex='1' sx={{'&::-webkit-scrollbar': { display: 'none' }, direction: 'rtl',borderLeft: 'solid 0.5px #1d3c45',overflowY:'scroll', height: '70vh'}}>
              <AdsFilter filteredPosts={filteredPosts} setFilteredPosts={setFilteredPosts}/>  
            </Box>
          </div>
      <div className="addPostWrapper" dir='rtl'>
      {token && (
                  <>
        <AddPost vert={{ bottom: 30, left: 40}}/>
        </>
      )}
      </div>
      </div>
  )
}
export default AdsPage