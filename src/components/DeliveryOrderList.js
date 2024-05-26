import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Box, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import DeliveryOrderService from '../services/DeliveryOrderService';
import '../styles/DeliveryOrderList.css';
import TrackingInfoModal from './TrackingInfoModal';

const StyledTableCell = styled(TableCell)({
  backgroundColor: '#f5f5f5',
  fontWeight: 'bold',
});

const DeliveryOrderList = () => {
  const [deliveryOrders, setDeliveryOrders] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [vehicleId, setVehicleId] = useState('');
  const [vehicleIds, setVehicleIds] = useState([]);
  const [openTrackingModal, setOpenTrackingModal] = useState(false);

  useEffect(() => {
    const fetchDeliveryOrders = async () => {
      try {
        const data = await DeliveryOrderService.fetchDeliveryOrders();
        setDeliveryOrders(data);
      } catch (error) {
        console.error('Error fetching delivery orders:', error);
      }
    };

    const fetchVehicleIds = async () => {
      try {
        const data = await DeliveryOrderService.fetchVehicleIds();
        setVehicleIds(data);
      } catch (error) {
        console.error('Error fetching vehicle IDs:', error);
      }
    };

    fetchDeliveryOrders();
    fetchVehicleIds();
  }, []);

  const handleDelete = async (id) => {
    try {
      await DeliveryOrderService.deleteDeliveryOrder(id);
      setDeliveryOrders(deliveryOrders.filter(order => order.id !== id));
    } catch (error) {
      console.error('Error deleting delivery order:', error);
    }
  };

  const handleOpenModal = (orderId) => {
    setSelectedOrderId(orderId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedOrderId(null);
    setVehicleId('');
    setOpenModal(false);
  };

  const handleAddVehicle = async () => {
    if (!vehicleId) {
      console.error('No vehicle ID selected');
      return;
    }

    try {
      const orderToUpdate = deliveryOrders.find(order => order.id === selectedOrderId);
      const updatedOrderData = { ...orderToUpdate, vehicle: { id: vehicleId } };

      const updatedOrder = await DeliveryOrderService.updateDeliveryOrder(selectedOrderId, updatedOrderData);

      setDeliveryOrders(deliveryOrders.map(order => order.id === selectedOrderId ? updatedOrder : order));
      handleCloseModal();
    } catch (error) {
      console.error('Error updating delivery order:', error);
    }
  };

  const handleOpenTrackingModal = (orderId) => {
    setSelectedOrderId(orderId);
    setOpenTrackingModal(true);
  };

  const handleCloseTrackingModal = () => {
    setSelectedOrderId(null);
    setOpenTrackingModal(false);
  };

  return (
    <div className="delivery-order-list-container">
      <h1>Delivery Order List</h1>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Customer Name</StyledTableCell>
              <StyledTableCell>Delivery Address</StyledTableCell>
              <StyledTableCell>Delivery Time</StyledTableCell>
              <StyledTableCell>Volume</StyledTableCell>
              <StyledTableCell>Vehicle ID</StyledTableCell>
              <StyledTableCell>Driver</StyledTableCell> {/* Added Driver Column */}
              <StyledTableCell>Action</StyledTableCell>
              <StyledTableCell>Tracking</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deliveryOrders.map(order => (
              <TableRow key={order.id}>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.deliveryAddress}</TableCell>
                <TableCell>{new Date(order.deliveryTime).toLocaleString()}</TableCell>
                <TableCell>{order.volume}</TableCell>
                <TableCell>{order.vehicle ? order.vehicle.id : 'N/A'}</TableCell>
                <TableCell>{order.driver ? order.driver.name : 'N/A'}</TableCell> {/* Display Driver Name */}
                <TableCell>
                  <Button variant="contained" color="error" onClick={() => handleDelete(order.id)}>Delete</Button>
                  <Button variant="contained" color="primary" onClick={() => handleOpenModal(order.id)}>Add Vehicle</Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => handleOpenTrackingModal(order.id)}>View Tracking</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          <h2>Add Vehicle Information</h2>
          <Select
            label="Vehicle ID"
            fullWidth
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            margin="normal"
          >
            {vehicleIds.map(vehicle => (
              <MenuItem key={vehicle.id} value={vehicle.id}>
                {vehicle.registrationNumber} - {vehicle.model}
              </MenuItem>
            ))}
          </Select>
          <Button variant="contained" color="primary" onClick={handleAddVehicle}>Submit</Button>
        </Box>
      </Modal>

      {selectedOrderId && (
        <TrackingInfoModal
          open={openTrackingModal}
          onClose={handleCloseTrackingModal}
          deliveryOrderId={selectedOrderId}
        />
      )}
    </div>
  );
};

export default DeliveryOrderList;
