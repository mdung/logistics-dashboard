import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, CircularProgress } from '@mui/material';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import DeliveryOrderService from '../services/DeliveryOrderService';

// Fix for the default icon not being found in leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const TrackingInfoModal = ({ open, onClose, deliveryOrderId }) => {
  const [trackingInfo, setTrackingInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open && deliveryOrderId) {
      const fetchTrackingInfo = async () => {
        try {
          const data = await DeliveryOrderService.fetchTrackingInfo(deliveryOrderId);
          setTrackingInfo(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching tracking info:', error);
          setLoading(false);
        }
      };

      fetchTrackingInfo();
    }
  }, [open, deliveryOrderId]);

  const formatTimestamp = (timestampArray) => {
    const [year, month, day, hour, minute] = timestampArray;
    return new Date(year, month - 1, day, hour, minute); // month is 0-indexed in JavaScript Date
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
        <Typography variant="h6">Tracking Information</Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box sx={{ height: 400 }}>
            <MapContainer center={[trackingInfo[0].latitude, trackingInfo[0].longitude]} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {trackingInfo.map((info, index) => (
                <Marker key={index} position={[info.latitude, info.longitude]}>
                </Marker>
              ))}
              <Polyline positions={trackingInfo.map(info => [info.latitude, info.longitude])} />
            </MapContainer>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default TrackingInfoModal;
