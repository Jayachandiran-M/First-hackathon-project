import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import io from 'socket.io-client';
import OrderTracker from '../components/OrderTracker';
import MapComponent from '../components/MapComponent';

const TrackOrder = () => {
  const [orderStatus, setOrderStatus] = useState('confirmed');
  const [socket, setSocket] = useState(null);
  const [eta, setEta] = useState('25 minutes');
  const [driverLocation, setDriverLocation] = useState({ lat: 40.7128, lng: -74.0060 });

  useEffect(() => {
    // Connect to WebSocket server
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    // Listen for order updates
    newSocket.on('order-status', (data) => {
      setOrderStatus(data.status);
      toast.success(`Order status updated: ${data.status}`);
    });

    // Listen for driver location updates
    newSocket.on('location-update', (data) => {
      setDriverLocation(data.location);
      setEta(data.eta);
    });

    return () => newSocket.close();
  }, []);

  const updateStatus = () => {
    const statuses = ['confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered'];
    const currentIndex = statuses.indexOf(orderStatus);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    
    setOrderStatus(nextStatus);
    
    // Emit status update to server
    if (socket) {
      socket.emit('order-update', { 
        orderId: 'ORD123456', 
        status: nextStatus 
      });
    }

    // Update ETA
    const etas = ['25 minutes', '20 minutes', '15 minutes', '10 minutes', 'Delivered'];
    setEta(etas[(currentIndex + 1) % etas.length]);
    
    toast.success(`Status updated to: ${nextStatus}`);
  };

  return (
    <div className="tracking-container">
      <h1>📍 Track Your Order</h1>
      
      <div className="status-card">
        <div className="order-header">
          <div>
            <h3>Order #ORD123456</h3>
            <p>Spicy Delight • 3 items • $42.95</p>
          </div>
          <div className={`status-badge ${orderStatus}`}>
            {orderStatus.replace('_', ' ').toUpperCase()}
          </div>
        </div>

        <OrderTracker 
          orderId="123456" 
          currentStatus={orderStatus}
        />

        <div className="eta-card">
          <h3>Estimated Delivery Time</h3>
          <div className="eta-time">{eta}</div>
          <p>Our AI predicts this delivery time based on traffic and preparation time</p>
        </div>

        {/* Map Component */}
        <MapComponent 
          driverLocation={driverLocation}
          restaurantLocation={{ lat: 40.7580, lng: -73.9855 }}
          userLocation={{ lat: 40.7128, lng: -74.0060 }}
        />

        {/* Driver Info */}
        <div className="driver-info">
          <div className="driver-avatar">JD</div>
          <div className="driver-details">
            <h4>John Driver</h4>
            <p>⭐ 4.9 • 2500+ deliveries</p>
            <p>🚗 White Honda Civic • Plate: ABC123</p>
          </div>
          <button className="btn btn-primary">📞 Call Driver</button>
        </div>

        {/* Update Button for Demo */}
        <button className="btn btn-primary update-btn" onClick={updateStatus}>
          Update Order Status (Demo)
        </button>
        
        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#666' }}>
          Real-time updates powered by WebSocket
        </p>
      </div>
    </div>
  );
};

export default TrackOrder;