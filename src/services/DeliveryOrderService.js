import axios from 'axios';

const API_BASE_URL = 'http://localhost:8082'; // Replace this with your actual backend URL

const DeliveryOrderService = {
  fetchDeliveryOrders: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/delivery-orders`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching delivery orders: ${error.message}`);
    }
  },

  createDeliveryOrder: async (deliveryOrderData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/delivery-orders`, deliveryOrderData);
      return response.data;
    } catch (error) {
      throw new Error(`Error creating delivery order: ${error.message}`);
    }
  },

  updateDeliveryOrder: async (id, updatedDeliveryOrderData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/delivery-orders/${id}`, updatedDeliveryOrderData);
      return response.data;
    } catch (error) {
      throw new Error(`Error updating delivery order: ${error.message}`);
    }
  },

  deleteDeliveryOrder: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/delivery-orders/${id}`);
    } catch (error) {
      throw new Error(`Error deleting delivery order: ${error.message}`);
    }
  },

  fetchVehicleIds: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/vehicles`); // Adjust the URL based on your API endpoint
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching vehicle IDs: ${error.message}`);
    }
  },

  fetchTrackingInfo: async (deliveryOrderId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tracking/${deliveryOrderId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching tracking info: ${error.message}`);
    }
  }
};

export default DeliveryOrderService;
