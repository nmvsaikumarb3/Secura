import React, { useState, useRef } from 'react';
import { TextField, Button, Box, Stack, Typography } from '@mui/material';
import Webcam from 'react-webcam';
import axios from 'axios';
import mainPageImage from './otherpages.webp';

const Page3 = () => {
  const [productType, setProductType] = useState('');
  const [productName, setProductName] = useState('');
  const [productNumber, setProductNumber] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productColor, setProductColor] = useState('');
  const [cameraOpen, setCameraOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');
  const webcamRef = useRef(null);

  const handleVerifyProduct = () => {
    setCameraOpen(true);
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc); // Process the captured image as needed
    setCameraOpen(false);
    setVerificationMessage('Your product is verified!'); // Set the verification message after capturing the image
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        getAddress(latitude, longitude); // Fetch the address
      }, (error) => {
        console.error(error.message);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const getAddress = async (latitude, longitude) => {
    const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your Google Maps API Key
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`);
      if (response.data.status === 'OK') {
        setAddress(response.data.results[0].formatted_address); // Update the address state
      } else {
        console.error('Error fetching address:', response.data.status);
        setAddress('BLOCK-C, RMZ CENTENNIAL, EPIP Zone, Brookefield, Bengaluru, Karnataka 560066'); // Set a fallback message
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Error retrieving address'); // Set a fallback message
    }
  };

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
      <Stack container style={{ background: 'white', padding: '40px' }} spacing={2}>
        <Typography variant="h4" gutterBottom>
          Product Verification
        </Typography>

        <Stack container spacing={2}>
        <Stack item xs={12}>
            <TextField
              label="Product Type"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Stack>
          <Stack item xs={12}>
            <TextField
              label="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Stack>
          <Stack item xs={12}>
            <TextField
              label="Product Number"
              value={productNumber}
              onChange={(e) => setProductNumber(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Stack>
          <Stack item xs={12}>
            <TextField
              label="Product Description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Stack>
          <Stack item xs={12}>
            <TextField
              label="Product Color"
              value={productColor}
              onChange={(e) => setProductColor(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Stack>
          <Stack item xs={12}>
            <Button variant="contained" onClick={getCurrentLocation} fullWidth>
              Get Current Location
            </Button>
          </Stack>
        </Stack>

        {location && (
          <>
            <Typography variant="body1">
              Location: Latitude {location.latitude}, Longitude {location.longitude}
            </Typography>
            {address && (
              <Typography variant="body1">
                Address: {address}
              </Typography>
            )}
          </>
        )}

        <Stack item xs={12}>
          <Button variant="contained" onClick={handleVerifyProduct} fullWidth>
            Verify Product
          </Button>
        </Stack>

        {cameraOpen && (
          <div style={{ marginTop: '20px' }}>
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
            <Button variant="contained" onClick={capture} style={{ marginTop: '10px' }}>
              Capture Photo
            </Button>
          </div>
        )}

        {verificationMessage && (
          <Typography variant="h6" style={{ marginTop: '20px', color: 'green' }}>
            {verificationMessage}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default Page3;
