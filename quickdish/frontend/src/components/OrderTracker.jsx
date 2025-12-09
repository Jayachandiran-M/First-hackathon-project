import React, { useState, useEffect } from 'react';
import { FaCheck, FaUtensils, FaShippingFast, FaMotorcycle, FaHome } from 'react-icons/fa';

const OrderTracker = ({ orderId, currentStatus }) => {
  const [status, setStatus] = useState(currentStatus || 'confirmed');
  
  const steps = [
    { id: 'confirmed', label: 'Order Confirmed', icon: <FaCheck /> },
    { id: 'preparing', label: 'Preparing Food', icon: <FaUtensils /> },
    { id: 'ready', label: 'Ready for Pickup', icon: <FaShippingFast /> },
    { id: 'out_for_delivery', label: 'Out for Delivery', icon: <FaMotorcycle /> },
    { id: 'delivered', label: 'Delivered', icon: <FaHome /> },
  ];

  const currentStepIndex = steps.findIndex(step => step.id === status);

  return (
    <div className="order-tracker">
      <h4>Order #{orderId}</h4>
      <div className="tracking-steps">
        {steps.map((step, index) => (
          <div key={step.id} className="step-container">
            <div className={`step-icon ${index <= currentStepIndex ? 'active' : ''}`}>
              {step.icon}
            </div>
            <p className={`step-label ${index <= currentStepIndex ? 'active' : ''}`}>
              {step.label}
            </p>
          </div>
        ))}
      </div>
      <div className="status-info">
        <p>Current Status: <strong>{status.replace('_', ' ')}</strong></p>
        <p>Estimated Delivery: 25 minutes</p>
      </div>
    </div>
  );
};

export default OrderTracker;