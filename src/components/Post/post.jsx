import React, { useState } from 'react';
import './post.css';
import {
  AccessTime,
  EventNote,
  LocationOn,
  MoreVert,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import NewBusinessCard from './newBusinessCard';
import axios from 'axios';
import EditPostWrapper from '../edit_post/wrapper';

export default function Post({ post, token, disabled }) {
  const storedEmail = localStorage.getItem('email');
  const profileEmail = token?.profile_email || storedEmail || '';
  const showMenu = profileEmail === post.email && token;
  console.log("hey")
  console.log(token)
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [ShowDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [openEditPost, setOpenEditPost] = useState(false);

  const logo = post.profilePicture;
  const business = {
    farm_name: post.farmName,
    location: post.farm_address,
    phone: post.phone,
    mail: post.email,
    about: post.about,
    products: post.prices,
    delivery_details: post.delivery_details,
    farm_images_list: post.farm_images_list,
    products_images_list: post.products_images_list,
    whatsapp: post.whatsapp,
    instagram: post.instagram,
    facebook: post.facebook,
    farm_site: post.farm_site,
    opening_hours: post.opening_hours,
    closing_hours: post.closing_hours,
    farmer_name: post.farmer_name
  };

  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(post.desc);
  };

  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
    setAnchorEl(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  const handleOpenEditMode = () => {
    setAnchorEl(null);
    setOpenEditPost(true);
  };

  const handleDeleteConfirm = () => {
    const id = new FormData();
    id.append('postId', post.id);
    axios
      .post('https://farmers2u-backend.onrender.com/api/delete_post', id)
      .then((response) => {
        console.log('Post deleted successfully');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
        window.location.reload();
      });
  };

  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
              <img
                className='Img'
                src={logo}
                alt=''
                onClick={(e) => setOpen(true)}
              />
            
            <IconButton
              disabled={disabled ? true : false}
              onClick={(e) => setOpen(true)}
              disableRipple = {true}
              sx={{cursor: 'pointer'}}
            >
              <Typography
                className='farmName'
                variant='h5'
                color={'black'}
                sx={{overflow: 'hidden',textDecoration: 'none', '&:hover': { textDecoration: 'underline'}}}
              >
                {post.farmName.length > 20 ? post.farmName.slice(0,21) + "..." : post.farmName}
              </Typography>
            </IconButton>
            <NewBusinessCard
              image={logo}
              business={business}
              open={open}
              token={token}
              close={() => setOpen(false)}
            />
            <span className='postDate'>{post.posted}</span>
          </div>
          <div className='postTopRight'>
            {showMenu ?
              <div className='menuContainer'>
                <MoreVert
                  onClick={handleMoreClick}
                  className='moreVertButton'
                  sx={{cursor: 'pointer'}}
                />
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMoreClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  PaperProps={{
                    style: {
                      position: 'absolute',
                      top: '0',
                      right: '100%',
                      borderRadius: '8px',
                      background: 'linear-gradient(to bottom, #E8AA42, #f0b148)',
                      color: 'white',
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                      width: '150px',
                    },
                  }}
                >
                  <MenuItem onClick={handleDeleteConfirmation}>
                    {' '}
                    מחיקת הפוסט{' '}
                  </MenuItem>
                  <MenuItem onClick={handleOpenEditMode}>
                    {' '}
                    עריכת הפוסט
                  </MenuItem>
                </Menu>
              </div>
            : null}
          </div>
        </div>
        <div className='postCenter'>
          <div className='details'>
            <Box className='location'>
              <Typography >
                <LocationOn className='details_symbols_font'/>
              </Typography>
              <Typography className='details_font'>{post.location}</Typography>
            </Box>
            <Box className='date'>
              <Typography>
                <EventNote className='details_symbols_font'/>
              </Typography>
              <Typography className='details_font'>{post.date}</Typography>
            </Box>
            <Box className='time'>
              <Typography>
                <AccessTime className='details_symbols_font'/>
              </Typography>
              <Typography className='details_font'>{post.time}</Typography>
            </Box>
          </div>
          <Box
            sx={{
              mt: '20px',
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            <Typography
              sx={{
                align: 'right',
                whiteSpace: 'pre-wrap', wordBreak: 'break-word', 
              }}
            >
              {post.desc}
            </Typography>
          </Box>
          <div className='imgWrapper'>
            <img
              className='postImg'
              src={post.photo}
              alt=''
            />
          </div>
        </div>
        <div className='postBottom'>
          <div className='postBottomRight'></div>
        </div>
      </div>
      <Dialog open={ShowDeleteConfirmation} onClose={handleDeleteCancel}>
  <DialogTitle sx={{ textAlign: 'center' }} dir="rtl">
    האם אתה בטוח?
  </DialogTitle>
  <DialogContent>
    <Typography>
      {' '}
      בעת לחיצה על "כן" המודעה תימחק לצמיתות
    </Typography>
  </DialogContent>
  <DialogActions
    sx={{
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '1rem', // Add margin at the bottom
    }}
  >
    <Button
      sx={{
        fontFamily: 'aleph',
        backgroundColor: '#E8AA42',
        color: 'black',
        ':hover': {
          bgcolor: '#E8AA42',
          color: 'white',
        },
      }}
      onClick={handleDeleteCancel}
    >
      לא
    </Button>
    <Button
      sx={{
        fontFamily: 'aleph',
        backgroundColor: '#E8AA42',
        color: 'black',
        ':hover': {
          bgcolor: '#E8AA42',
          color: 'white',
        },
      }}
      onClick={handleDeleteConfirm}
    >
      כן
    </Button>
  </DialogActions>
</Dialog>
      <EditPostWrapper
        open={openEditPost}
        onClose={() => setOpenEditPost(false)}
        original_post={post}
      />
    </div>
  );
}