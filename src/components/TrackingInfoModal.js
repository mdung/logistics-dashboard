import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { Modal, Box, Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const TrackingInfoModal = ({ open, onClose, deliveryOrderId }) => {
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        if (open) {
            const socket = new SockJS('http://localhost:8082/ws');
            const stompClient = new Client({
                webSocketFactory: () => socket,
                debug: (str) => {
                    console.log(str);
                },
                onConnect: () => {
                    stompClient.subscribe('/topic/tracking', (message) => {
                        const trackingInfo = JSON.parse(message.body);
                        if (trackingInfo.deliveryOrderId === deliveryOrderId) {
                            setPositions((prevPositions) => [...prevPositions, trackingInfo]);
                        }
                    });
                },
            });

            stompClient.activate();

            return () => {
                if (stompClient) {
                    stompClient.deactivate();
                }
            };
        }
    }, [open, deliveryOrderId]);

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ width: '80%', height: '80%', margin: 'auto', marginTop: '5%' }}>
                <Typography variant="h6">Tracking Information</Typography>
                <MapContainer style={{ height: '100%', width: '100%' }} center={[40.712776, -74.005974]} zoom={13}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {positions.map((position, index) => (
                        <Marker key={index} position={[position.latitude, position.longitude]} />
                    ))}
                    <Polyline positions={positions.map((pos) => [pos.latitude, pos.longitude])} />
                </MapContainer>
                <Typography variant="body2">
                    {positions.length > 0 && `Last update: ${new Date(positions[positions.length - 1].timestamp).toLocaleString()}`}
                </Typography>
            </Box>
        </Modal>
    );
};

export default TrackingInfoModal;
