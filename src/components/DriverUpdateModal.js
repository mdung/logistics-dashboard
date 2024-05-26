import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { updateDriver } from '../services/DriverService';

const DriverUpdateModal = ({ open, onClose, driver, onDriverUpdated }) => {
  const [name, setName] = useState(driver.name);
  const [licenseNumber, setLicenseNumber] = useState(driver.licenseNumber);
  const [available, setAvailable] = useState(driver.available);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (driver) {
      setName(driver.name);
      setLicenseNumber(driver.licenseNumber);
      setAvailable(driver.available);
    }
  }, [driver]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedDriver = { ...driver, name, licenseNumber, available };
      const result = await updateDriver(driver.id, updatedDriver);
      onDriverUpdated(result);
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: '400px', margin: 'auto', marginTop: '10%', padding: '16px', backgroundColor: 'white' }}>
        <Typography variant="h6">Update Driver</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="License Number"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Available"
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
            margin="normal"
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Button type="submit" variant="contained" color="primary">
            Update Driver
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default DriverUpdateModal;
