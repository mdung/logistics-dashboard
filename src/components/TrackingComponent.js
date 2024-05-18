import React, { useState, useEffect } from 'react';
import stompClient from '../websocket';

const TrackingComponent = ({ deliveryOrderId }) => {
  const [trackingInfo, setTrackingInfo] = useState([]);

  useEffect(() => {
    stompClient.onConnect = () => {
      console.log('Connected to WebSocket');
      stompClient.subscribe('/topic/tracking', (message) => {
        const trackingData = JSON.parse(message.body);
        if (trackingData.deliveryOrder.id === deliveryOrderId) {
          setTrackingInfo((prevInfo) => [...prevInfo, trackingData]);
        }
      });
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [deliveryOrderId]);

  return (
    <div>
      <h2>Tracking Information</h2>
      <ul>
        {trackingInfo.map((info, index) => (
          <li key={index}>
            Latitude: {info.latitude}, Longitude: {info.longitude}, Time: {new Date(info.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackingComponent;
