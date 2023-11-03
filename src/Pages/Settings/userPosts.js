import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../../components/Post/post';
import { Box, Typography } from '@mui/material';
import noResults from '../../assets/noResults.png';

const UserPosts = ({ width, height, position, email, token }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const mail = new FormData();
    mail.append('email', email);
    axios
      .post('https://farmers2u-backend.onrender.com/api/getuserposts', mail)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [email]);

  const containerStyle = {
    width: `${width}px`,
    height: `${height}px`,
    position: 'sticky',
    ...position,
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '10px',
      border: 'none',
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#1d3c45',
      border: '10px #1d3c45',
      borderRadius: '0px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(244, 168, 92, 0.7)',
      borderRadius: '30px',
      border: '4px solid transparent',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: 'rgb(244, 168, 92)',
    },
    zIndex: 1, // Ensures the component stays above other content
  };

  const contentContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: '10px', // Adjust the padding value as needed
    boxSizing: 'border-box',
  };

  return (
    <Box sx={containerStyle}>
      {posts.length === 0 ? (
        <div style={contentContainerStyle}>
          <img src={noResults} alt="No Results" style={{ width: '100%' }} />
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <Typography sx={{ fontSize: '36px', color: '#1d3c45' }}>...לא נמצאו תוצאות</Typography>
            <Typography sx={{ fontSize: '15px', color: 'rgb(141, 141, 138)' }}>
              {'משתמש זה עדיין לא פרסם מודעות'}
            </Typography>
          </div>
        </div>
      ) : (
        <div className="posts">
          {posts.map((p) => (
            <Post key={p.id} post={p} disabled={true} token={token}/>
          ))}
        </div>
      )}
    </Box>
  );
};

export default UserPosts;