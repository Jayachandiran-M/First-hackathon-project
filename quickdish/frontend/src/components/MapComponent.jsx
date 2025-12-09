import React from 'react';

const MapComponent = ({ driverLocation, restaurantLocation, userLocation }) => {
  return (
    <div className="map-container">
      <div className="map-placeholder">
        <div className="map-point restaurant" style={{ top: '30%', left: '20%' }}>
          <span>🍽️ Restaurant</span>
        </div>
        <div className="map-point driver" style={{ top: '60%', left: '70%' }}>
          <span>🚗 Driver</span>
        </div>
        <div className="map-point user" style={{ top: '80%', left: '40%' }}>
          <span>🏠 You</span>
        </div>
        <div className="route-line"></div>
      </div>
      <div className="map-info">
        <h4>Live Tracking</h4>
        <p>Driver is on the way to your location</p>
        <p>Estimated arrival: 15 minutes</p>
      </div>
    </div>
  );
};

export default MapComponent;