import axios from 'axios';

const API_BASE_URL = 'http://localhost:8082'; // Replace this with your actual backend URL

const TrackingInfoService = {
  fetchTrackingInfo: async (deliveryOrderId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tracking/${deliveryOrderId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching tracking info: ${error.message}`);
    }
  },

  saveTrackingInfo: async (trackingInfo) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/tracking`, trackingInfo);
      return response.data;
    } catch (error) {
      throw new Error(`Error saving tracking info: ${error.message}`);
    }
  }
};

export default TrackingInfoService;
