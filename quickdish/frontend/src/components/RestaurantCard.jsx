import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaClock, FaBolt, FaLeaf, FaShippingFast } from 'react-icons/fa';

const RestaurantCard = ({ restaurant, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurant/${restaurant.id}`);
  };

  return (
    <div className="restaurant-card" onClick={handleClick}>
      <div className="restaurant-image-container">
        <img src={restaurant.imageUrl} alt={restaurant.name} className="restaurant-image" />
        {restaurant.popular && (
          <div className="popular-badge">
            <FaBolt /> Popular
          </div>
        )}
        {restaurant.vegetarianFriendly && (
          <div className="veg-badge">
            <FaLeaf /> Veg
          </div>
        )}
      </div>
      <div className="restaurant-info">
        <div className="restaurant-header">
          <h3>{restaurant.name}</h3>
          <div className="rating">
            <FaStar /> {restaurant.rating}
          </div>
        </div>
        <p className="cuisine">{restaurant.cuisine}</p>
        <p className="description">{restaurant.description}</p>
        <div className="restaurant-details">
          <div className="detail-item">
            <FaClock />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="detail-item">
            <FaShippingFast />
            <span>
              {restaurant.freeDelivery ? 'Free' : `$${restaurant.deliveryFee}`}
            </span>
          </div>
          <div className="detail-item">
            <span>Min: ${restaurant.minOrder}</span>
          </div>
        </div>
        <div className="restaurant-tags">
          {restaurant.popular && <span className="tag popular">🔥 Popular</span>}
          {restaurant.vegetarianFriendly && <span className="tag veg">🌱 Vegetarian</span>}
          {restaurant.freeDelivery && <span className="tag delivery">🚚 Free Delivery</span>}
        </div>
        <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
          View Menu
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;