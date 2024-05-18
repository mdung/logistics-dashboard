import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import VehicleListPage from './pages/VehicleListPage';
import VehicleFormPage from './pages/VehicleFormPage';
import DeliveryOrderFormPage from './pages/DeliveryOrderFormPage';
import DeliveryOrderListPage from './pages/DeliveryOrderListPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vehicles" element={<VehicleListPage />} />
            <Route path="/add-vehicle" element={<VehicleFormPage />} />
            <Route path="/create-delivery-order" element={<DeliveryOrderFormPage />} />
            <Route path="/delivery-orders" element={<DeliveryOrderListPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <h1>Welcome to the Management System</h1>
    <p>Select a menu item to get started.</p>
  </div>
);

export default App;
