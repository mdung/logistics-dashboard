import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

const VehicleUpdateModal = ({ open, handleClose, vehicle, handleUpdate }) => {
  const [updatedVehicle, setUpdatedVehicle] = useState(vehicle);

  useEffect(() => {
    setUpdatedVehicle(vehicle);
  }, [vehicle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedVehicle((prevVehicle) => ({
      ...prevVehicle,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    handleUpdate(updatedVehicle);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...modalStyle }}>
        <h2>Update Vehicle</h2>
        <TextField
          name="model"
          label="Model"
          value={updatedVehicle?.model || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="color"
          label="Color"
          value={updatedVehicle?.color || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="year"
          label="Year"
          value={updatedVehicle?.year || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="registrationNumber"
          label="Registration Number"
          value={updatedVehicle?.registrationNumber || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="capacity"
          label="Capacity"
          value={updatedVehicle?.capacity || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="location"
          label="Location"
          value={updatedVehicle?.location || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default VehicleUpdateModal;
