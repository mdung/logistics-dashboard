import React from 'react';
import VehicleForm from '../components/VehicleForm'; // Make sure you have a VehicleForm component
import '../styles/VehicleForm.css'; // Ensure the CSS file exists

const VehicleFormPage = () => (
  <div className="vehicle-form-container">
    <h1>Add New Vehicle</h1>
    <VehicleForm />
  </div>
);

export default VehicleFormPage;
