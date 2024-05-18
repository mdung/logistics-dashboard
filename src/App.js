import React from 'react';
import VehicleList from './components/VehicleList'; // Import VehicleList component
import DeliveryOrderForm from './components/DeliveryOrderForm';
import DeliveryOrderList from './components/DeliveryOrderList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Vehicle Management</h1> {/* Update the header to reflect vehicle management */}
      </header>
      <main>
        <VehicleList /> {/* Use VehicleList component here */}
        <DeliveryOrderForm />
        <DeliveryOrderList />
      </main>
    </div>
  );
}

export default App;
