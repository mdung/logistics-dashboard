import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeliveryOrderService from '../services/DeliveryOrderService';
import { getAllVehicles } from '../services/VehicleService';

const DeliveryOrderForm = ({ onAdd }) => {
  const [deliveryOrderData, setDeliveryOrderData] = useState({
    customerName: '',
    deliveryAddress: '',
    deliveryTime: '',
    volume: 0,
    vehicleId: ''
  });

  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const fetchVehicles = async () => {
      const data = await getAllVehicles();
      setVehicles(data);
    };

    fetchVehicles();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryOrderData({ ...deliveryOrderData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure the datetime format is correct
      const formattedDeliveryTime = `${deliveryOrderData.deliveryTime}:00`;
      const deliveryOrderPayload = { ...deliveryOrderData, deliveryTime: formattedDeliveryTime };
      await DeliveryOrderService.createDeliveryOrder(deliveryOrderPayload);
      onAdd();
      setDeliveryOrderData({
        customerName: '',
        deliveryAddress: '',
        deliveryTime: '',
        volume: 0,
        vehicleId: ''
      });
      navigate('/delivery-orders'); // Redirect to the Delivery Order List page after successful submission
    } catch (error) {
      console.error('Error adding delivery order:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Customer Name"
        name="customerName"
        value={deliveryOrderData.customerName}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Delivery Address"
        name="deliveryAddress"
        value={deliveryOrderData.deliveryAddress}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Delivery Time"
        name="deliveryTime"
        type="datetime-local"
        value={deliveryOrderData.deliveryTime}
        onChange={handleInputChange}
        required
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Volume"
        name="volume"
        type="number"
        value={deliveryOrderData.volume}
        onChange={handleInputChange}
        required
      />
      <FormControl required>
        <InputLabel>Vehicle</InputLabel>
        <Select
          name="vehicleId"
          value={deliveryOrderData.vehicleId}
          onChange={handleInputChange}
          displayEmpty
        >
          {vehicles.map((vehicle) => (
            <MenuItem key={vehicle.id} value={vehicle.id}>
              {`${vehicle.model} - ${vehicle.registrationNumber} (ID: ${vehicle.id})`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" type="submit">
        Add Delivery Order
      </Button>
    </Box>
  );
};

export default DeliveryOrderForm;
