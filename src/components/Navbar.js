import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/vehicles">Vehicle List</Link></li>
      <li><Link to="/add-vehicle">Add Vehicle</Link></li>
      <li><Link to="/create-delivery-order">Create Delivery Order</Link></li>
      <li><Link to="/delivery-orders">Delivery Order List</Link></li>
    </ul>
  </nav>
);

export default Navbar;
