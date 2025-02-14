import React from 'react';
import { AppBar, Toolbar, Box, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

// Header component definition
const Header = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <AppBar 
      position="static" 
      color="transparent" 
      elevation={0}
      sx={{
        background: 'rgba(255, 255, 255, 0.16)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0)',
      }}
    >
      <Toolbar>
        <Box
          onClick={() => navigate('/')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          <IconButton
            size="small"
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              mr: 1,
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            <HomeIcon />
          </IconButton>
        
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;