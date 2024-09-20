import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import mainPageImage from './mainpage.webp';

const Page1 = () => {
  const navigate = useNavigate();

  return (
    <Box
      style={{
        backgroundImage: `url(${mainPageImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h1"
        style={{
          color: 'black',
          marginBottom:'1057px',
          fontFamily: 'fantasy',
          fontWeight: 'bold',
          fontSize: '250px',
          textShadow: '2px 2px 0 white, -2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white' // Creates a border effect
        }}
        gutterBottom
      >
        Welcome to Secura
      </Typography>

      <Button
        variant="contained"
        onClick={() => navigate('/page2')}
        size="large"
        style={{ padding: '10px 20px', fontSize: '30px', fontFamily: 'monospace',background:'black' }}
      >
        Register
      </Button>
    </Box>
  );
};

export default Page1;
