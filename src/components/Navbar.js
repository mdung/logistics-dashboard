import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [vehicleMenuAnchorEl, setVehicleMenuAnchorEl] = useState(null);
  const [deliveryOrderMenuAnchorEl, setDeliveryOrderMenuAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleVehicleMenuOpen = (event) => {
    setVehicleMenuAnchorEl(event.currentTarget);
  };

  const handleVehicleMenuClose = () => {
    setVehicleMenuAnchorEl(null);
  };

  const handleDeliveryOrderMenuOpen = (event) => {
    setDeliveryOrderMenuAnchorEl(event.currentTarget);
  };

  const handleDeliveryOrderMenuClose = () => {
    setDeliveryOrderMenuAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Management System
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" onClick={handleVehicleMenuOpen}>Vehicle</Button>
          <Menu
            anchorEl={vehicleMenuAnchorEl}
            open={Boolean(vehicleMenuAnchorEl)}
            onClose={handleVehicleMenuClose}
          >
            <MenuItem onClick={handleVehicleMenuClose} component={Link} to="/vehicles">Vehicle List</MenuItem>
            <MenuItem onClick={handleVehicleMenuClose} component={Link} to="/add-vehicle">Vehicle Form</MenuItem>
          </Menu>
          <Button color="inherit" onClick={handleDeliveryOrderMenuOpen}>Delivery Order</Button>
          <Menu
            anchorEl={deliveryOrderMenuAnchorEl}
            open={Boolean(deliveryOrderMenuAnchorEl)}
            onClose={handleDeliveryOrderMenuClose}
          >
            <MenuItem onClick={handleDeliveryOrderMenuClose} component={Link} to="/delivery-orders">Delivery Order List</MenuItem>
            <MenuItem onClick={handleDeliveryOrderMenuClose} component={Link} to="/create-delivery-order">Delivery Order Form</MenuItem>
          </Menu>
          <Button color="inherit" component={Link} to="/report">Report</Button>
        </Box>
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose} component={Link} to="/">Home</MenuItem>
            <MenuItem onClick={handleVehicleMenuOpen}>Vehicle</MenuItem>
            <Menu
              anchorEl={vehicleMenuAnchorEl}
              open={Boolean(vehicleMenuAnchorEl)}
              onClose={handleVehicleMenuClose}
            >
              <MenuItem onClick={handleVehicleMenuClose} component={Link} to="/vehicles">Vehicle List</MenuItem>
              <MenuItem onClick={handleVehicleMenuClose} component={Link} to="/add-vehicle">Vehicle Form</MenuItem>
            </Menu>
            <MenuItem onClick={handleDeliveryOrderMenuOpen}>Delivery Order</MenuItem>
            <Menu
              anchorEl={deliveryOrderMenuAnchorEl}
              open={Boolean(deliveryOrderMenuAnchorEl)}
              onClose={handleDeliveryOrderMenuClose}
            >
              <MenuItem onClick={handleDeliveryOrderMenuClose} component={Link} to="/delivery-orders">Delivery Order List</MenuItem>
              <MenuItem onClick={handleDeliveryOrderMenuClose} component={Link} to="/create-delivery-order">Delivery Order Form</MenuItem>
            </Menu>
            <MenuItem onClick={handleMenuClose} component={Link} to="/report">Report</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
