import axios from 'axios';

const BASE_URL = 'http://localhost:8082/drivers';

export const getAllDrivers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching drivers:', error);
    throw error;
  }
};

export const getDriverById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching driver with ID ${id}:`, error);
    throw error;
  }
};

export const addDriver = async (driverData) => {
  try {
    const response = await axios.post(BASE_URL, driverData);
    return response.data;
  } catch (error) {
    console.error('Error adding driver:', error);
    throw error;
  }
};

export const updateDriver = async (id, updatedDriverData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedDriverData);
    return response.data;
  } catch (error) {
    console.error(`Error updating driver with ID ${id}:`, error);
    throw error;
  }
};

export const deleteDriver = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting driver with ID ${id}:`, error);
    throw error;
  }
};
