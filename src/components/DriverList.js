import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { getAllDrivers, deleteDriver } from '../services/DriverService';
import DriverUpdateModal from './DriverUpdateModal';

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const data = await getAllDrivers();
        setDrivers(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  const handleDeleteDriver = async (id) => {
    try {
      await deleteDriver(id);
      setDrivers(drivers.filter(driver => driver.id !== id));
    } catch (error) {
      console.error('Error deleting driver:', error);
    }
  };

  const handleOpenUpdateModal = (driver) => {
    setSelectedDriver(driver);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedDriver(null);
    setIsUpdateModalOpen(false);
  };

  const handleDriverUpdated = (updatedDriver) => {
    setDrivers(drivers.map(driver => (driver.id === updatedDriver.id ? updatedDriver : driver)));
  };

  return (
    <div className="driver-list-container">
      <h1>Driver List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>License Number</TableCell>
                <TableCell>Available</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drivers.map(driver => (
                <TableRow key={driver.id}>
                  <TableCell>{driver.name}</TableCell>
                  <TableCell>{driver.licenseNumber}</TableCell>
                  <TableCell>{driver.available ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleOpenUpdateModal(driver)}>
                      Update
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleDeleteDriver(driver.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {selectedDriver && (
        <DriverUpdateModal
          open={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
          driver={selectedDriver}
          onDriverUpdated={handleDriverUpdated}
        />
      )}
    </div>
  );
};

export default DriverList;
