import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination } from '@mui/material';
import { getAllVehicles, deleteVehicle, updateVehicle } from '../services/VehicleService';
import VehicleUpdateModal from '../components/VehicleUpdateModal';
import '../styles/VehicleList.css';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [openModal, setOpenModal] = useState(false);

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

  const handleDeleteVehicle = async (id) => {
    try {
      await deleteVehicle(id);
      setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const handleUpdateVehicle = async (updatedVehicle) => {
    try {
      await updateVehicle(updatedVehicle.id, updatedVehicle);
      const updatedVehicles = await getAllVehicles();
      setVehicles(updatedVehicles);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedVehicle(null); // Reset selected vehicle on close
  };

  return (
    <div className="vehicle-list-container">
      <h1>Vehicle List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
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
                {vehicles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(vehicle => (
                  <TableRow key={vehicle.id}>
                    <TableCell>{vehicle.model}</TableCell>
                    <TableCell>{vehicle.color}</TableCell>
                    <TableCell>{vehicle.year}</TableCell>
                    <TableCell>{vehicle.registrationNumber}</TableCell>
                    <TableCell>{vehicle.capacity}</TableCell>
                    <TableCell>{vehicle.location}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" onClick={() => handleOpenModal(vehicle)}>Update</Button>
                      <Button variant="contained" color="error" onClick={() => handleDeleteVehicle(vehicle.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={vehicles.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
      {selectedVehicle && (
        <VehicleUpdateModal
          open={openModal}
          handleClose={handleCloseModal}
          vehicle={selectedVehicle}
          handleUpdate={handleUpdateVehicle}
        />
      )}
    </div>
  );
};

export default VehicleList;
