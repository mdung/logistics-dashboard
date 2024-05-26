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

export const updateVehicle = async (id, updatedVehicleData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedVehicleData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(`Error updating vehicle with ID ${id}:`, error);
    throw error;
  }
};

export const deleteVehicle = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(`Error deleting vehicle with ID ${id}:`, error);
    throw error;
  }
};

const VehicleService = {
  getAllVehicles,
  getVehicleById,
  addVehicle,
  updateVehicle,
  deleteVehicle
};

export default VehicleService;
