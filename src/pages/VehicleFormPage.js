import React from 'react';
import VehicleForm from '../components/VehicleForm'; // Correct import path
import '../styles/VehicleForm.css'; // Ensure the CSS file exists

const VehicleFormPage = () => (
  <div className="vehicle-form-container">
    <h1>Add New Vehicle</h1>
    <VehicleForm />
  </div>
);

export default VehicleFormPage;
