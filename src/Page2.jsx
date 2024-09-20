import React, { useState } from 'react';
import { TextField, Button, Box, Stack, Typography, InputAdornment } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Import the tick mark icon
import { useNavigate } from 'react-router-dom';
import mainPageImage from './otherpages.webp';

const Page2 = () => {
  const [sellerName, setSellerName] = useState('');
  const [shopName, setShopName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [adharNumber, setAdharNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [location, setLocation] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [isVerified, setIsVerified] = useState(false); // State for verification
  const [adharError, setAdharError] = useState(false);
  const [panError, setPanError] = useState(false);
  const navigate = useNavigate();

  const registrationNumberVerify = () => {
    setIsVerified(true); // Set verification state to true
  };

  const handleVerify = () => {
    if (isVerified) {
      navigate('/page3');
    }
  };

  const validateAdhar = (value) => {
    if (value.length <= 12 && /^\d*$/.test(value)) {
      setAdharNumber(value);
      setAdharError(value.length !== 12); // Set error based on length
    }
  };

  const validatePan = (value) => {
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/; // PAN pattern validation
    if (value.length <= 10 && /^[A-Z0-9]*$/.test(value)) {
      setPanNumber(value);
      setPanError(!panPattern.test(value)); // Set error based on pattern
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
      <Stack container style={{ background: 'white', padding: '78px' }} spacing={2}>
        <Typography variant="h4" gutterBottom>
          Seller Registration
        </Typography>
        <Stack container spacing={2}>
          <Stack item xs={12}>
            <TextField
              label="Seller Name"
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Stack>
          <Stack item xs={12}>
            <TextField
              label="Shop Name"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Stack>
          <Stack item xs={12}>
            <TextField
              label="Registration Number"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              fullWidth
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {!isVerified && (
                      <Button variant="outlined" onClick={registrationNumberVerify}>
                        Verify
                      </Button>
                    )}
                    {isVerified && (
                      <CheckCircleIcon style={{ color: 'green', marginLeft: '10px' }} />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack item xs={12}>
            <TextField
              label="Aadhar Number"
              value={adharNumber}
              onChange={(e) => validateAdhar(e.target.value)}
              fullWidth
              variant="outlined"
              error={adharError}
              helperText={adharError && adharNumber.length > 0 ? "Aadhar must be 12 digits" : ""}
            />
          </Stack>
          <Stack item xs={12}>
            <TextField
              label="PAN Number"
              value={panNumber}
              onChange={(e) => validatePan(e.target.value)}
              fullWidth
              variant="outlined"
              error={panError}
              helperText={panError && panNumber.length > 0 ? "PAN must be in the format ABCDE1234F" : ""}
            />
          </Stack>
          <Stack item xs={12}>
            <TextField
              label="GST"
              value={gstNumber}
              onChange={(e) => setGstNumber(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Stack>
          <Stack item xs={12}>
            <TextField
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Stack>
          <Stack item xs={12}>
            <TextField
              label="Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Stack>
          <Button variant="contained" onClick={handleVerify} fullWidth>
            Verify
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Page2;
