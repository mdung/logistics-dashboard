import React, { useState } from 'react';
import { Button, TextField, Paper } from '@mui/material';
import { addDriver } from '../services/DriverService';

const DriverForm = ({ onDriverAdded }) => {
  const [name, setName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [available, setAvailable] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newDriver = { name, licenseNumber, available };
      const addedDriver = await addDriver(newDriver);
      onDriverAdded(addedDriver);
      setName('');
      setLicenseNumber('');
      setAvailable(true);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Paper style={{ padding: '16px', marginBottom: '16px' }}>
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
          Add Driver
        </Button>
      </form>
    </Paper>
  );
};

export default DriverForm;
