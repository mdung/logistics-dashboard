import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { addVehicle } from '../services/VehicleService';

const VehicleForm = ({ onAdd }) => {
  const [vehicleData, setVehicleData] = useState({
    model: '',
    color: '',
    year: '',
    registrationNumber: '',
    capacity: '',
    location: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleData({ ...vehicleData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addVehicle(vehicleData);
      onAdd && onAdd(); // Trigger parent component action after adding vehicle, if provided
      setVehicleData({
        model: '',
        color: '',
        year: '',
        registrationNumber: '',
        capacity: '',
        location: ''
      });
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Model"
        name="model"
        value={vehicleData.model}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Color"
        name="color"
        value={vehicleData.color}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Year"
        name="year"
        value={vehicleData.year}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Registration Number"
        name="registrationNumber"
        value={vehicleData.registrationNumber}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Capacity"
        name="capacity"
        value={vehicleData.capacity}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Location"
        name="location"
        value={vehicleData.location}
        onChange={handleInputChange}
        required
      />
      <Button variant="contained" color="primary" type="submit">
        Add Vehicle
      </Button>
    </Box>
  );
};

export default VehicleForm;
