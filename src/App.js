import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import VehicleListPage from './pages/VehicleListPage';
import VehicleFormPage from './pages/VehicleFormPage';
import DeliveryOrderListPage from './pages/DeliveryOrderListPage';
import DeliveryOrderFormPage from './pages/DeliveryOrderFormPage';
import ReportPage from './pages/ReportPage';
import DriverList from './components/DriverList';
import DriverForm from './components/DriverForm';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vehicles" element={<VehicleListPage />} />
        <Route path="/add-vehicle" element={<VehicleFormPage />} />
        <Route path="/delivery-orders" element={<DeliveryOrderListPage />} />
        <Route path="/create-delivery-order" element={<DeliveryOrderFormPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/drivers" element={<DriverList />} />
        <Route path="/add-driver" element={<DriverForm />} />
      </Routes>
    </Router>
  );
};

export default App;
