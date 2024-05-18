import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import { getAllVehicles, addVehicle, updateVehicle, deleteVehicle } from '../services/VehicleService';
import '../styles/VehicleList.css'; // Make sure the CSS file is imported correctly

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newVehicleData, setNewVehicleData] = useState({
    model: '',
    color: '',
    year: '',
    registrationNumber: '',
    capacity: '',
    location: ''
  });

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getAllVehicles();
        setVehicles(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicleData({ ...newVehicleData, [name]: value });
  };

  const handleAddVehicle = async () => {
    try {
      await addVehicle(newVehicleData);
      const updatedVehicles = await getAllVehicles();
      setVehicles(updatedVehicles);
      setNewVehicleData({
        model: '',
        color: '',
        year: '',
        registrationNumber: '',
        capacity: '',
        location: ''
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateVehicle = async (id, updatedData) => {
    try {
      await updateVehicle(id, updatedData);
      const updatedVehicles = await getAllVehicles();
      setVehicles(updatedVehicles);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteVehicle = async (id) => {
    try {
      await deleteVehicle(id);
      const updatedVehicles = await getAllVehicles();
      setVehicles(updatedVehicles);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="vehicle-list-container">
      <h1>Vehicle List</h1>
      <div className="add-vehicle-form">
        <TextField label="Model" name="model" value={newVehicleData.model} onChange={handleInputChange} />
        <TextField label="Color" name="color" value={newVehicleData.color} onChange={handleInputChange} />
        <TextField label="Year" name="year" value={newVehicleData.year} onChange={handleInputChange} />
        <TextField label="Registration Number" name="registrationNumber" value={newVehicleData.registrationNumber} onChange={handleInputChange} />
        <TextField label="Capacity" name="capacity" value={newVehicleData.capacity} onChange={handleInputChange} />
        <TextField label="Location" name="location" value={newVehicleData.location} onChange={handleInputChange} />
        <Button variant="contained" color="primary" onClick={handleAddVehicle}>Add Vehicle</Button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Model</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Registration Number</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicles.map(vehicle => (
                <TableRow key={vehicle.id}>
                  <TableCell>{vehicle.model}</TableCell>
                  <TableCell>{vehicle.color}</TableCell>
                  <TableCell>{vehicle.year}</TableCell>
                  <TableCell>{vehicle.registrationNumber}</TableCell>
                  <TableCell>{vehicle.capacity}</TableCell>
                  <TableCell>{vehicle.location}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleUpdateVehicle(vehicle.id, { model: 'Updated Model', color: 'Updated Color', year: 'Updated Year', registrationNumber: 'Updated Reg Number', capacity: 'Updated Capacity', location: 'Updated Location' })}>Update</Button>
                    <Button variant="contained" color="error" onClick={() => handleDeleteVehicle(vehicle.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default VehicleList;
