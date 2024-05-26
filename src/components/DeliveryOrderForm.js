import { useState, useEffect } from 'react';
import { TextField, Button, Box, MenuItem } from '@mui/material';
import DeliveryOrderService from '../services/DeliveryOrderService';
import VehicleService from '../services/VehicleService';

const DeliveryOrderForm = ({ onAdd }) => {
  const [deliveryOrderData, setDeliveryOrderData] = useState({
    customerName: '',
    deliveryAddress: '',
    deliveryTime: '',
    volume: 0,
    vehicleId: ''
  });

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const vehiclesData = await VehicleService.getAllVehicles();
        setVehicles(vehiclesData);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
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
      await DeliveryOrderService.createDeliveryOrder(deliveryOrderData);
      onAdd();
      setDeliveryOrderData({
        customerName: '',
        deliveryAddress: '',
        deliveryTime: '',
        volume: 0,
        vehicleId: ''
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
        select
        label="Vehicle"
        name="vehicleId"
        value={deliveryOrderData.vehicleId}
        onChange={handleInputChange}
        required
      >
        {vehicles.map((vehicle) => (
          <MenuItem key={vehicle.id} value={vehicle.id}>
            {`${vehicle.model} - ${vehicle.registrationNumber} (ID: ${vehicle.id})`}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" color="primary" type="submit">
        Add Delivery Order
      </Button>
    </Box>
  );
};

export default DeliveryOrderForm;
