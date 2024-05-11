import axios from 'axios';

const BASE_URL = 'http://localhost:8082/vehicles';

export const getAllVehicles = async () => {
  try {
    const response = await axios.get(BASE_URL, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }
};

export const getVehicleById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(`Error fetching vehicle with ID ${id}:`, error);
    return null;
  }
};

export const addVehicle = async (vehicleData) => {
  try {
    const response = await axios.post(BASE_URL, vehicleData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error adding vehicle:', error);
    throw error;
  }
};

// Define other functions for remaining endpoints (update, delete, etc.) if needed
