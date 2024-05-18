import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import DeliveryOrderService from '../services/DeliveryOrderService';

const DeliveryOrderForm = ({ onAdd }) => {
  const [deliveryOrderData, setDeliveryOrderData] = useState({
    customerName: '',
    deliveryAddress: '',
    deliveryTime: '',
    volume: 0,
    vehicleId: null // Include vehicleId if needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryOrderData({ ...deliveryOrderData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await DeliveryOrderService.createDeliveryOrder(deliveryOrderData); // Use createDeliveryOrder directly
      onAdd(); // Trigger parent component action after adding delivery order
      setDeliveryOrderData({
        customerName: '',
        deliveryAddress: '',
        deliveryTime: '',
        volume: 0,
        vehicleId: null // Reset vehicleId
      });
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
      <TextField
        label="Vehicle ID"
        name="vehicleId"
        value={deliveryOrderData.vehicleId || ''}
        onChange={handleInputChange}
      />
      <Button variant="contained" color="primary" type="submit">
        Add Delivery Order
      </Button>
    </Box>
  );
};

export default DeliveryOrderForm;
